import { z } from "zod";
import { fail, getClientIp, ok } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { generateAssistantReply, isAiConfigured } from "@/lib/ai";

const schema = z.object({
  message: z.string().trim().min(2).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(20)
    .optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`assistant:${ip}`, 60, 60_000);
  if (!limited.allowed) {
    return fail("Too many assistant requests. Please wait a moment.", 429, {
      code: "RATE_LIMITED",
      details: { retryAfterSec: limited.retryAfterSec },
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return fail("Request too large", 413, { code: "PAYLOAD_TOO_LARGE" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400, { code: "INVALID_JSON" });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return fail("Validation failed", 400, {
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
  }

  // Basic prompt-injection resistance: strip obvious secret-fishing phrasing from logging only
  const message = parsed.data.message;
  if (
    /ignore (all|previous) instructions|reveal (your )?(system|prompt|api key|secret)/i.test(
      message,
    )
  ) {
    return ok({
      reply:
        "I can only answer using Faheem’s verified portfolio information. Ask about skills, projects, experience, or contact details.",
      source: "faq" as const,
      mode: "fallback" as const,
      aiConfigured: isAiConfigured(),
    });
  }

  const result = await generateAssistantReply(message, parsed.data.history);

  return ok({
    reply: result.reply,
    source: result.source,
    mode: result.source === "ai" ? ("ai" as const) : ("fallback" as const),
    aiConfigured: isAiConfigured(),
  });
}
