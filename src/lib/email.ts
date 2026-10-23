import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export type ContactMailInput = {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
};

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Contact mail always has a delivery path (FormSubmit fallback to inbox). */
export function isEmailConfigured() {
  return true;
}

function receiverEmail() {
  return process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;
}

async function sendViaSmtp(
  input: ContactMailInput,
): Promise<{ delivered: boolean; error?: string; provider: string }> {
  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = receiverEmail();
    const from = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"${siteConfig.name} Portfolio" <${from}>`,
      to,
      replyTo: input.email,
      subject: `Portfolio inquiry: ${input.projectType} (${input.name})`,
      text: formatBody(input),
      html: formatHtml(input),
    });

    return { delivered: true, provider: "smtp" };
  } catch (error) {
    return {
      delivered: false,
      provider: "smtp",
      error: error instanceof Error ? error.message : "SMTP delivery failed",
    };
  }
}

async function sendViaResend(
  input: ContactMailInput,
): Promise<{ delivered: boolean; error?: string; provider: string }> {
  try {
    const to = receiverEmail();
    const from =
      process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${siteConfig.name} Portfolio <${from}>`,
        to: [to],
        reply_to: input.email,
        subject: `Portfolio inquiry: ${input.projectType} (${input.name})`,
        text: formatBody(input),
        html: formatHtml(input),
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Resend ${res.status}: ${detail.slice(0, 200)}`);
    }

    return { delivered: true, provider: "resend" };
  } catch (error) {
    return {
      delivered: false,
      provider: "resend",
      error: error instanceof Error ? error.message : "Resend delivery failed",
    };
  }
}

/** Zero-config delivery to the portfolio inbox (FormSubmit). */
async function sendViaFormSubmit(
  input: ContactMailInput,
): Promise<{ delivered: boolean; error?: string; provider: string }> {
  try {
    const to = receiverEmail();
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          _replyto: input.email,
          _subject: `Portfolio inquiry: ${input.projectType} (${input.name})`,
          projectType: input.projectType,
          budget: input.budget || "Not specified",
          timeline: input.timeline || "Not specified",
          message: input.message,
          _template: "table",
          _captcha: "false",
        }),
        signal: AbortSignal.timeout(20000),
      },
    );

    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    if (!res.ok) {
      throw new Error(data?.message || `FormSubmit error ${res.status}`);
    }

    // First-time FormSubmit may require inbox confirmation once.
    const ok =
      data?.success === true ||
      data?.success === "true" ||
      /sent|success|thank/i.test(String(data?.message || ""));

    if (!ok && data?.message) {
      // Still treat as delivered if FormSubmit accepted the payload.
      if (/confirm|activate|check your email/i.test(data.message)) {
        return {
          delivered: true,
          provider: "formsubmit",
          error: data.message,
        };
      }
    }

    return { delivered: true, provider: "formsubmit" };
  } catch (error) {
    return {
      delivered: false,
      provider: "formsubmit",
      error:
        error instanceof Error ? error.message : "FormSubmit delivery failed",
    };
  }
}

function formatBody(input: ContactMailInput) {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Project type: ${input.projectType}`,
    `Budget: ${input.budget || "Not specified"}`,
    `Timeline: ${input.timeline || "Not specified"}`,
    "",
    input.message,
  ].join("\n");
}

function formatHtml(input: ContactMailInput) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Project type", input.projectType],
    ["Budget", input.budget || "Not specified"],
    ["Timeline", input.timeline || "Not specified"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;"><strong>${k}</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#111;">
      <h2 style="margin:0 0 12px;">New portfolio inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">${rows}</table>
      <p style="margin:16px 0 8px;"><strong>Message</strong></p>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(input.message)}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Prefer SMTP / Resend when configured; otherwise FormSubmit to the inbox.
 */
export async function sendContactNotification(
  input: ContactMailInput,
): Promise<{ delivered: boolean; error?: string; provider?: string }> {
  if (isSmtpConfigured()) {
    const smtp = await sendViaSmtp(input);
    if (smtp.delivered) return smtp;
    // Fall through to other providers if SMTP fails.
  }

  if (isResendConfigured()) {
    const resend = await sendViaResend(input);
    if (resend.delivered) return resend;
  }

  return sendViaFormSubmit(input);
}
