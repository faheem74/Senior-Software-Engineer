import {
  assistantFaqReply,
  buildAssistantSystemPrompt,
} from "@/data/portfolioKnowledge";
import {
  buildKnowledgeBase,
  defaultFaqFallback,
} from "@/data/chat-knowledge";

export type ChatHistoryItem = { role: "user" | "assistant"; content: string };

export function isAiConfigured() {
  return Boolean(process.env.AI_API_KEY && process.env.AI_PROVIDER);
}

async function callGemini(
  message: string,
  history: ChatHistoryItem[] = [],
  systemPrompt: string,
): Promise<string> {
  const model = process.env.AI_MODEL || "gemini-2.0-flash";
  const key = process.env.AI_API_KEY!;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const contents = [
    {
      role: "user",
      parts: [{ text: `${systemPrompt}\n\n---\nConversation context follows.` }],
    },
    ...history.slice(-8).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    {
      role: "user",
      parts: [
        {
          text: `User question: ${message}\n\nReply helpfully using only approved portfolio facts.`,
        },
      ],
    },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.3,
      },
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`Gemini error ${res.status}`);

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text)
      .join("") || "";
  if (!text.trim()) throw new Error("Empty Gemini response");
  return text.trim();
}

async function callGroq(
  message: string,
  history: ChatHistoryItem[] = [],
  systemPrompt: string,
): Promise<string> {
  const model = process.env.AI_MODEL || "llama-3.1-8b-instant";
  const key = process.env.AI_API_KEY!;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.slice(-8),
        { role: "user", content: message },
      ],
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`Groq error ${res.status}`);

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text?.trim()) throw new Error("Empty Groq response");
  return text.trim();
}

export async function generateAssistantReply(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<{ reply: string; source: "ai" | "faq" }> {
  if (!isAiConfigured()) {
    return { reply: assistantFaqReply(message), source: "faq" };
  }

  const provider = (process.env.AI_PROVIDER || "").toLowerCase();
  const systemPrompt = buildAssistantSystemPrompt();

  try {
    if (provider === "gemini") {
      return {
        reply: await callGemini(message, history, systemPrompt),
        source: "ai",
      };
    }
    if (provider === "groq") {
      return {
        reply: await callGroq(message, history, systemPrompt),
        source: "ai",
      };
    }
    return { reply: assistantFaqReply(message), source: "faq" };
  } catch {
    return {
      reply: `${assistantFaqReply(message)} (AI provider temporarily unavailable — using portfolio knowledge fallback.)`,
      source: "faq",
    };
  }
}

/** Legacy chat endpoint compatibility */
export async function generateChatReply(message: string): Promise<{
  reply: string;
  source: "ai" | "faq";
}> {
  if (!isAiConfigured()) {
    return { reply: defaultFaqFallback(message), source: "faq" };
  }

  const provider = (process.env.AI_PROVIDER || "").toLowerCase();
  const systemPrompt = buildKnowledgeBase();

  try {
    if (provider === "gemini") {
      return {
        reply: await callGemini(message, [], systemPrompt),
        source: "ai",
      };
    }
    if (provider === "groq") {
      return {
        reply: await callGroq(message, [], systemPrompt),
        source: "ai",
      };
    }
    return { reply: defaultFaqFallback(message), source: "faq" };
  } catch {
    return {
      reply: `${defaultFaqFallback(message)} (AI provider temporarily unavailable — using portfolio FAQ.)`,
      source: "faq",
    };
  }
}
