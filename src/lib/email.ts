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

export type MailResult = {
  delivered: boolean;
  error?: string;
  provider?: string;
  /** Owner must click FormSubmit activate link once */
  needsActivation?: boolean;
};

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function isWeb3FormsConfigured() {
  return Boolean(process.env.WEB3FORMS_ACCESS_KEY);
}

/** Contact always has a delivery path (FormSubmit / Web3Forms / SMTP / Resend). */
export function isEmailConfigured() {
  return true;
}

function receiverEmail() {
  return process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://faheem-software-engineer.vercel.app"
  );
}

async function sendViaSmtp(input: ContactMailInput): Promise<MailResult> {
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

async function sendViaResend(input: ContactMailInput): Promise<MailResult> {
  try {
    const to = receiverEmail();
    const from = process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";

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

async function sendViaWeb3Forms(input: ContactMailInput): Promise<MailResult> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio inquiry: ${input.projectType} (${input.name})`,
        from_name: siteConfig.name,
        name: input.name,
        email: input.email,
        projectType: input.projectType,
        budget: input.budget || "Not specified",
        timeline: input.timeline || "Not specified",
        message: input.message,
      }),
      signal: AbortSignal.timeout(15000),
    });

    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || `Web3Forms error ${res.status}`);
    }

    return { delivered: true, provider: "web3forms" };
  } catch (error) {
    return {
      delivered: false,
      provider: "web3forms",
      error: error instanceof Error ? error.message : "Web3Forms delivery failed",
    };
  }
}

/** FormSubmit needs a real Origin/Referer (Vercel serverless must send them). */
async function sendViaFormSubmit(input: ContactMailInput): Promise<MailResult> {
  try {
    const to = receiverEmail();
    const origin = siteUrl().replace(/\/$/, "");

    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/contact`,
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

    const message = String(data?.message || "");
    const successFlag = data?.success === true || data?.success === "true";
    const needsActivation = /activate|activation|confirm|check your email/i.test(
      message,
    );

    if (needsActivation) {
      return {
        delivered: false,
        provider: "formsubmit",
        needsActivation: true,
        error: message,
      };
    }

    if (!res.ok || !successFlag) {
      throw new Error(message || `FormSubmit error ${res.status}`);
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
 * Prefer SMTP / Resend / Web3Forms when configured; otherwise FormSubmit.
 */
export async function sendContactNotification(
  input: ContactMailInput,
): Promise<MailResult> {
  const errors: string[] = [];

  if (isSmtpConfigured()) {
    const smtp = await sendViaSmtp(input);
    if (smtp.delivered) return smtp;
    if (smtp.error) errors.push(`smtp: ${smtp.error}`);
  }

  if (isResendConfigured()) {
    const resend = await sendViaResend(input);
    if (resend.delivered) return resend;
    if (resend.error) errors.push(`resend: ${resend.error}`);
  }

  if (isWeb3FormsConfigured()) {
    const w3 = await sendViaWeb3Forms(input);
    if (w3.delivered) return w3;
    if (w3.error) errors.push(`web3forms: ${w3.error}`);
  }

  const formSubmit = await sendViaFormSubmit(input);
  if (formSubmit.delivered || formSubmit.needsActivation) return formSubmit;

  return {
    delivered: false,
    provider: formSubmit.provider || "none",
    error: [formSubmit.error, ...errors].filter(Boolean).join(" | "),
  };
}

export { receiverEmail, siteUrl };
