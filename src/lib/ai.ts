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
    ...history.slice(-12).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    {
      role: "user",
      parts: [
        {
          text: `User question: ${message}\n\nReply helpfully using only approved portfolio facts. Continue the conversation naturally.`,
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
        maxOutputTokens: 700,
        temperature: 0.35,
      },
    }),
    signal: AbortSignal.timeout(20000),
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

async function callOpenAiCompatible(
  endpoint: string,
  message: string,
  history: ChatHistoryItem[] = [],
  systemPrompt: string,
  defaultModel: string,
): Promise<string> {
  const model = process.env.AI_MODEL || defaultModel;
  const key = process.env.AI_API_KEY!;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 700,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.slice(-12),
        { role: "user", content: message },
      ],
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error(`AI provider error ${res.status}`);

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text?.trim()) throw new Error("Empty AI response");
  return text.trim();
}

async function callGroq(
  message: string,
  history: ChatHistoryItem[] = [],
  systemPrompt: string,
): Promise<string> {
  return callOpenAiCompatible(
    "https://api.groq.com/openai/v1/chat/completions",
    message,
    history,
    systemPrompt,
    "llama-3.1-8b-instant",
  );
}

async function callOpenRouter(
  message: string,
  history: ChatHistoryItem[] = [],
  systemPrompt: string,
): Promise<string> {
  return callOpenAiCompatible(
    "https://openrouter.ai/api/v1/chat/completions",
    message,
    history,
    systemPrompt,
    "openrouter/auto",
  );
}

export async function generateAssistantReply(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<{ reply: string; source: "ai" | "faq" }> {
  const faq = () => ({
    reply: assistantFaqReply(message, history),
    source: "faq" as const,
  });

  if (!isAiConfigured()) {
    return faq();
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
    if (provider === "openrouter") {
      return {
        reply: await callOpenRouter(message, history, systemPrompt),
        source: "ai",
      };
    }
    return faq();
  } catch {
    // Never dead-end the chat — fall back to knowledge replies for every turn.
    return faq();
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
    if (provider === "openrouter") {
      return {
        reply: await callOpenRouter(message, [], systemPrompt),
        source: "ai",
      };
    }
    return { reply: defaultFaqFallback(message), source: "faq" };
  } catch {
    return { reply: defaultFaqFallback(message), source: "faq" };
  }
}
