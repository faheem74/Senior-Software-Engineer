import type { Metadata } from "next";
import {
  Code2,
  Server,
  Cloud,
  Database,
  Sparkles,
  Gauge,
  Layers,
  Cpu,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack, backend, API, AI, cloud, database, and consulting services.",
};

const icons = [
  Layers,
  Code2,
  Server,
  Cpu,
  Sparkles,
  Cloud,
  Database,
  Gauge,
  MessagesSquare,
];

export default function ServicesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Services"
        title="How I can help"
        description="Engagements grounded in full-stack, backend, AI, and cloud delivery."
      />
      <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <StaggerItem
              key={service.id}
              className="flex h-full flex-col rounded-xl border border-white/10 bg-[#111722]/70 p-4 transition hover:border-[#7C5CFF]/40 hover:shadow-[0_16px_40px_rgba(124,92,255,0.12)]"
            >
              <Icon className="text-[#7C5CFF]" size={20} />
              <h2 className="mt-3 text-base font-semibold text-[#F5F7FA]">
                {service.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-[#A6AFBF]">
                {service.description}
              </p>
              <ul className="mt-3 space-y-1">
                {service.items.slice(0, 4).map((item) => (
                  <li key={item} className="text-xs text-[#7A8499]">
                    • {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant="ghost"
                className="mt-3 justify-start px-0 text-[#35D6FF]"
              >
                Discuss this service
                <ArrowRight size={14} />
              </Button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
