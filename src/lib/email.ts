import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      (process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email),
  );
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}): Promise<{ delivered: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    return {
      delivered: false,
      error: "Email transport is not configured",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;
    const from = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from,
      to,
      replyTo: input.email,
      subject: `Portfolio inquiry: ${input.projectType} — ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Project type: ${input.projectType}`,
        `Budget: ${input.budget || "—"}`,
        `Timeline: ${input.timeline || "—"}`,
        "",
        input.message,
      ].join("\n"),
    });

    return { delivered: true };
  } catch (error) {
    return {
      delivered: false,
      error: error instanceof Error ? error.message : "Email delivery failed",
    };
  }
}
