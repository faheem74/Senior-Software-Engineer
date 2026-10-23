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
  clientEmailDelivered: z.boolean().optional(),
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

  if (parsed.data.website) {
    return created({
      id: "ignored",
      message: "Thanks, your message was received.",
      emailDelivered: true,
    });
  }

  const {
    website: _honeypot,
    clientEmailDelivered = false,
    ...payload
  } = parsed.data;
  void _honeypot;

  let emailDelivered = clientEmailDelivered;
  let emailError: string | undefined;
  let provider: string | undefined = clientEmailDelivered
    ? "formsubmit-client"
    : undefined;

  if (!clientEmailDelivered) {
    const emailResult = await sendContactNotification(payload);
    emailDelivered = emailResult.delivered;
    emailError = emailResult.error;
    provider = emailResult.provider;
  }

  const record = await saveContact({
    ...payload,
    emailDelivered,
    emailError,
  });

  // Always acknowledge receipt — client opens mailto if emailDelivered is false.
  return created({
    id: record.id,
    message: emailDelivered
      ? "Thank you. Your message was sent successfully. Faheem will get back to you soon."
      : "Message received. If email delivery is still activating, your mail app will open as backup.",
    emailDelivered,
    provider,
  });
}
