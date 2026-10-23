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
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
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
    return fail("Validation failed", 400, {
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
  }

  // Honeypot
  if (parsed.data.website) {
    return created({
      id: "ignored",
      message: "Thanks, your message was received.",
      emailDelivered: false,
    });
  }

  const { website: _, ...payload } = parsed.data;
  void _;

  const emailResult = await sendContactNotification(payload);
  const record = await saveContact({
    ...payload,
    emailDelivered: emailResult.delivered,
    emailError: emailResult.error,
  });

  const message = emailResult.delivered
    ? "Message received and email notification sent."
    : "Message received and stored. Email notification is not configured or failed. Faheem can still review stored inquiries.";

  return created({
    id: record.id,
    message,
    emailDelivered: emailResult.delivered,
  });
}
