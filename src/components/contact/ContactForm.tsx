"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { sendContactViaFormSubmitClient } from "@/lib/formsubmit-client";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const body = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "");

    if (name.length < 2 || !email.includes("@") || subject.length < 2 || body.length < 10) {
      setStatus("error");
      setMessage(
        "Please fill all fields properly (message should be at least 10 characters).",
      );
      return;
    }

    if (website) {
      setStatus("success");
      setMessage("Thank you. Your message was sent successfully.");
      form.reset();
      return;
    }

    const payload = {
      name,
      email,
      projectType: subject,
      message: body,
    };

    try {
      const clientMail = await sendContactViaFormSubmitClient(payload);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          website,
          clientEmailDelivered: clientMail.delivered,
        }),
      });
      const json = await res.json().catch(() => null);
      const apiDelivered = Boolean(res.ok && json?.success && json?.data?.emailDelivered);

      if (clientMail.delivered || apiDelivered) {
        setStatus("success");
        setMessage(
          json?.data?.message ||
            "Thank you. Your message was sent successfully. Faheem will get back to you soon.",
        );
        form.reset();
        return;
      }

      // Guaranteed fallback: visitor's own mail app → portfolio inbox
      const mailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        body,
      ].join("\n");
      const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailto;

      setStatus("success");
      setMessage(
        "Opening your email app to send the message. Please press Send there — it goes directly to Faheem.",
      );
      form.reset();
    } catch {
      const mailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        body,
      ].join("\n");
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(mailBody)}`;
      setStatus("success");
      setMessage(
        "Opening your email app to send the message. Please press Send there — it goes directly to Faheem.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            className={inputClass}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="subject">
        <input
          id="subject"
          name="subject"
          required
          maxLength={120}
          className={inputClass}
          placeholder="Project inquiry, consulting, collaboration"
        />
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          className={inputClass}
          placeholder="Tell me about the problem, goals, and constraints."
        />
      </Field>

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>

      {message ? (
        <p
          role="status"
          className={
            status === "success"
              ? "rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
              : "rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-500/20 bg-[#0B1220] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20";
