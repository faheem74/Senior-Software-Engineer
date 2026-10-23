"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { assistantSuggestedQuestions } from "@/data/portfolioKnowledge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type Msg = { role: "user" | "assistant"; content: string; mode?: string };

const WELCOME =
  "Hi, I’m Faheem AI, the portfolio assistant (not Faheem personally). Ask about verified experience, skills, projects, demos, or how to get in touch.";

export function ChatWidget({
  initiallyOpen = false,
  embedded = false,
}: {
  initiallyOpen?: boolean;
  embedded?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen || embedded);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"ai" | "fallback" | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, open, loading, reduce]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const prior = messages.filter((m) => m.content !== WELCOME);
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: prior.slice(-12).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message || "Assistant request failed");
      }
      setMode(json.data.mode === "ai" ? "ai" : "fallback");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: json.data.reply,
          mode: json.data.mode,
        },
      ]);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Network error. Please try again or use the contact page.";
      setError(msg);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `${msg} You can also email ${siteConfig.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function clearChat() {
    setMessages([{ role: "assistant", content: WELCOME }]);
    setMode(null);
    setError(null);
  }

  async function copyMessage(content: string, idx: number) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      /* ignore */
    }
  }

  const panel = (
    <motion.div
      key="panel"
      initial={reduce || embedded ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce || embedded ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex flex-col overflow-hidden border border-slate-500/20 bg-[#0B1220] shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
        embedded
          ? "h-[min(75vh,640px)] w-full rounded-2xl"
          : "h-[min(70vh,580px)] w-[min(100vw-2rem,400px)] rounded-2xl",
      )}
      role="dialog"
      aria-label="Faheem AI Portfolio Assistant"
    >
      <div className="flex items-center justify-between border-b border-slate-500/15 bg-[#101A2B] px-4 py-3">
        <div className="flex items-center gap-3">
          {siteConfig.profileImage ? (
            <Image
              src={siteConfig.profileImage}
              alt=""
              width={36}
              height={36}
              className="rounded-full object-cover ring-1 ring-slate-500/30"
            />
          ) : null}
          <div>
            <p className="text-sm font-semibold text-slate-50">
              Faheem AI Portfolio Assistant
            </p>
            <p className="text-xs text-slate-400">
              {mode === "ai"
                ? "Live AI mode"
                : mode === "fallback"
                  ? "Knowledge fallback mode"
                  : "Ask about verified portfolio info"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearChat}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-100"
            aria-label="New conversation"
          >
            <RotateCcw size={16} />
          </button>
          {!embedded ? (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-100"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} className="group relative">
            <div
              className={cn(
                "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-[#142238] text-slate-200",
              )}
            >
              {m.content}
            </div>
            {m.role === "assistant" ? (
              <button
                type="button"
                onClick={() => void copyMessage(m.content, i)}
                className="mt-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-slate-500 opacity-70 hover:bg-white/5 hover:text-slate-300"
                aria-label="Copy response"
              >
                {copiedIdx === i ? <Check size={12} /> : <Copy size={12} />}
                {copiedIdx === i ? "Copied" : "Copy"}
              </button>
            ) : null}
          </div>
        ))}
        {loading ? (
          <div
            className="flex w-fit items-center gap-1.5 rounded-2xl bg-[#142238] px-3 py-2.5"
            aria-live="polite"
            aria-label="Assistant is thinking"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 [animation-delay:300ms]" />
          </div>
        ) : null}
        {error && !loading ? (
          <button
            type="button"
            className="text-xs text-amber-300 underline"
            onClick={() => {
              const lastUser = [...messages].reverse().find((m) => m.role === "user");
              if (lastUser) void send(lastUser.content);
            }}
          >
            Retry last question
          </button>
        ) : null}
        <div ref={endRef} />
      </div>

      {!loading ? (
        <div className="flex flex-wrap gap-2 border-t border-slate-500/10 px-3 py-2">
          {assistantSuggestedQuestions.slice(0, 5).map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => void send(q)}
              className="rounded-full border border-slate-500/20 px-2.5 py-1 text-[11px] text-slate-300 hover:border-blue-400/40 hover:text-sky-300"
            >
              {q}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-500/15 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          placeholder="Ask Faheem AI…"
          className="flex-1 rounded-xl border border-slate-500/20 bg-[#070B14] px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-400/40"
          aria-label="Assistant message"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-blue-500 p-2.5 text-white disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>

      <div className="border-t border-slate-500/10 px-3 py-2">
        <Button href="/contact" variant="ghost" className="w-full py-2 text-xs">
          Prefer a human? Contact Faheem
        </Button>
      </div>
    </motion.div>
  );

  if (embedded) {
    return <div className="w-full">{panel}</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>{open ? panel : null}</AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.45)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-label={open ? "Close Faheem AI" : "Open Faheem AI"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
