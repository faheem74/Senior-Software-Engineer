import { z } from "zod";
import { fail, getClientIp, ok } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { generateChatReply, isAiConfigured } from "@/lib/ai";

const schema = z.object({
  message: z.string().trim().min(2).max(1000),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`chat:${ip}`, 60, 60_000);
  if (!limited.allowed) {
    return fail("Too many chat requests. Please wait a moment.", 429, {
      code: "RATE_LIMITED",
      details: { retryAfterSec: limited.retryAfterSec },
    });
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

  const result = await generateChatReply(parsed.data.message);

  return ok({
    reply: result.reply,
    source: result.source,
    aiConfigured: isAiConfigured(),
  });
}
