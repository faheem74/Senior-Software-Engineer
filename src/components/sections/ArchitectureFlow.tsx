"use client";

import { FadeIn } from "@/components/motion/FadeIn";

const steps = [
  { title: "Frontend", detail: "React / Next.js interfaces" },
  { title: "Backend API", detail: "Node, NestJS, REST services" },
  { title: "AI Provider", detail: "LLM & generative integrations" },
  { title: "Database", detail: "MongoDB & structured storage" },
  { title: "Cloud Deploy", detail: "AWS, Vercel, CI/CD" },
];

export function ArchitectureFlow() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/80 p-5 sm:p-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#35D6FF]">
          Delivery architecture
        </p>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-xl border border-white/10 bg-[#0D111A] px-3 py-3 text-center"
            >
              <p className="font-mono text-[10px] text-[#7C5CFF]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#F5F7FA]">
                {step.title}
              </p>
              <p className="mt-1 text-xs text-[#A6AFBF]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </FadeIn>
  );
}
