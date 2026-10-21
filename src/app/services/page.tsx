import type { Metadata } from "next";
import { services } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack, backend, frontend, AI, cloud, mobile, e-commerce, and application improvement services.",
};

export default function ServicesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Services"
        title="Engineering services for real products"
        description="Clear offerings with a direct path to discuss scope, timeline, and constraints."
      />
      <Stagger className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <StaggerItem
            key={service.id}
            className="flex h-full flex-col rounded-2xl border border-slate-500/15 bg-[#101A2B]/70 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-50">
              {service.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {service.description}
            </p>
            <ul className="mt-5 flex-1 space-y-2">
              {service.items.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  <span className="mr-2 text-emerald-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="outline" className="mt-6 w-fit">
              Discuss this service
            </Button>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
