import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { experienceRoles, engineeringLifecycle } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "About & Experience",
  description: `About ${siteConfig.name} — experience, education, and skills.`,
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
          <FadeIn>
            <ProfileAvatar size={200} className="mx-auto lg:mx-0" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionHeading
              eyebrow="About"
              title={siteConfig.name}
              description={siteConfig.positioning}
            />
            <p className="text-sm text-slate-400">{siteConfig.roleNote}</p>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                I design and deliver production web applications built on REST
                and GraphQL APIs, microservices, and MongoDB, PostgreSQL and
                MySQL — deployed on AWS with Docker.
              </p>
              <p>
                Strengths include full-stack and frontend engineering, backend
                APIs, web and mobile apps, AI integrations, cloud architecture,
                software design, debugging, and maintainable code.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button href="/projects">Explore Projects</Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
              {siteConfig.resumeUrl ? (
                <Button href={siteConfig.resumeUrl} external variant="ghost">
                  Download Resume
                </Button>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section id="experience" className="bg-[#0B1220]/40">
        <SectionHeading
          eyebrow="Experience"
          title="Professional timeline"
          description="Verified roles from the senior resume."
        />
        <div className="relative space-y-0 border-l border-slate-500/20 pl-6">
          {experienceRoles.map((role, index) => (
            <FadeIn key={role.id} delay={index * 0.06}>
              <article className="relative pb-6 last:pb-0">
                <span className="absolute -left-[1.9rem] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">
                  {role.period}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-50 sm:text-2xl">
                  {role.title}
                </h2>
                <p className="mt-0.5 text-sm text-slate-300">{role.company}</p>
                <ul className="mt-2.5 space-y-1.5">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-slate-400"
                    >
                      <span className="mr-2 text-emerald-400">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="education">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <FadeIn>
          <div className="rounded-xl border border-slate-500/15 bg-[#101A2B]/70 p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-slate-50">
              {siteConfig.education.degree}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {siteConfig.education.institution}
            </p>
            <p className="mt-1 font-mono text-sm text-sky-400">
              {siteConfig.education.years}
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section id="skills" className="bg-[#0B1220]/40">
        <SectionHeading
          eyebrow="Skills"
          title="Technical skills"
          description="Verified from the resume — no fabricated proficiency percentages."
        />
        <Stagger className="grid gap-3 md:grid-cols-2">
          {skillCategories.map((category) => (
            <StaggerItem
              key={category.id}
              className="rounded-xl border border-slate-500/15 bg-[#101A2B]/70 p-4"
            >
              <h3 className="text-base font-semibold text-slate-50">
                {category.title}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-slate-500/15 bg-[#142238] px-2.5 py-1 text-xs text-slate-300 sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading eyebrow="Approach" title="Engineering lifecycle" />
        <Stagger className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringLifecycle.map((item, index) => (
            <StaggerItem
              key={item.step}
              className="rounded-xl border border-slate-500/15 bg-[#101A2B]/60 p-3.5"
            >
              <p className="font-mono text-[11px] text-sky-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-semibold text-slate-50">{item.step}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
