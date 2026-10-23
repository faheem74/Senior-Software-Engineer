import { z } from "zod";
import { created, fail, getClientIp } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { saveContact } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  projectType: z.string().trim().min(2).max(120),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 8, 60_000);
  if (!limited.allowed) {
    return fail("Too many requests. Please try again shortly.", 429, {
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
    return fail("Please check the form fields and try again.", 400, {
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
  }

  // Honeypot: bots fill this; humans never see it.
  if (parsed.data.website) {
    return created({
      id: "ignored",
      message: "Thanks, your message was received.",
      emailDelivered: true,
    });
  }

  const { website: _honeypot, ...payload } = parsed.data;
  void _honeypot;

  const emailResult = await sendContactNotification(payload);
  const record = await saveContact({
    ...payload,
    emailDelivered: emailResult.delivered,
    emailError: emailResult.error,
  });

  if (!emailResult.delivered) {
    return fail(
      "Could not send your message right now. Please email faheembilal7874@gmail.com directly, or try again in a moment.",
      502,
      {
        code: "EMAIL_FAILED",
        details: { provider: emailResult.provider },
      },
    );
  }

  return created({
    id: record.id,
    message:
      "Thank you. Your message was sent successfully. Faheem will get back to you soon.",
    emailDelivered: true,
    provider: emailResult.provider,
  });
}
