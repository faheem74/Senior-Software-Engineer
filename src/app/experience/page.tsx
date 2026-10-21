import type { Metadata } from "next";
import {
  experienceRoles,
  experienceSummary,
  engineeringLifecycle,
} from "@/data/experience";
import { siteConfig } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Experience",
  description: experienceSummary.summary,
};

export default function ExperiencePage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Experience"
          title={`${experienceSummary.years} years of software engineering`}
          description={experienceSummary.summary}
        />
        <FadeIn>
          <div className="relative space-y-0 border-l border-slate-500/20 pl-6">
            {experienceRoles.map((role) => (
              <article key={role.id} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-400">
                  {role.period}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                  {role.title}
                </h2>
                <p className="mt-1 text-slate-300">{role.company}</p>
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed text-slate-400">
                      <span className="mr-2 text-emerald-400">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section id="education" className="bg-[#0B1220]/40">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <div className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/70 p-6">
          <h3 className="text-xl font-semibold text-slate-50">
            {siteConfig.education.degree}
          </h3>
          <p className="mt-2 text-slate-300">
            {siteConfig.education.institution}
          </p>
          <p className="mt-1 font-mono text-sm text-sky-400">
            {siteConfig.education.years}
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Process" title="Delivery lifecycle" />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringLifecycle.map((item, index) => (
            <StaggerItem
              key={item.step}
              className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/60 p-5"
            >
              <p className="font-mono text-xs text-sky-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-semibold text-slate-50">{item.step}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/contact">Talk about your roadmap</Button>
          {siteConfig.resumeUrl ? (
            <Button href={siteConfig.resumeUrl} external variant="outline">
              Download Resume
            </Button>
          ) : null}
        </div>
      </Section>
    </>
  );
}
