import type { Metadata } from "next";
import { experienceRoles, engineeringLifecycle } from "@/data/experience";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional timeline and engineering approach.",
};

export default function ExperiencePage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Experience"
          title="Professional timeline"
          description="Verified roles from the senior resume."
        />
        <div className="relative border-l border-white/10 pl-6">
          {experienceRoles.map((role, index) => (
            <FadeIn key={role.id} delay={index * 0.06}>
              <article className="relative pb-7 last:pb-0">
                <span className="absolute -left-[1.85rem] top-1 h-2.5 w-2.5 rounded-full bg-[#7C5CFF] shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#35D6FF]">
                  {role.period}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#F5F7FA]">
                  {role.title}
                </h2>
                <p className="text-sm text-[#A6AFBF]">{role.company}</p>
                <ul className="mt-2.5 space-y-1.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-[#A6AFBF]">
                      <span className="mr-2 text-[#7C5CFF]">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-[#0D111A]/50">
        <SectionHeading eyebrow="Approach" title="Engineering lifecycle" />
        <Stagger className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringLifecycle.map((item, index) => (
            <StaggerItem
              key={item.step}
              className="rounded-xl border border-white/10 bg-[#111722]/60 p-3.5"
            >
              <p className="font-mono text-[11px] text-[#35D6FF]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-semibold text-[#F5F7FA]">{item.step}</h3>
              <p className="mt-1 text-sm text-[#A6AFBF]">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-6">
          <Button href="/contact">Discuss a role or project</Button>
        </div>
      </Section>
    </>
  );
}
