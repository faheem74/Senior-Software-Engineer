import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — Senior Software Engineer with 8+ years of experience.`,
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
          <FadeIn direction="left">
            <ProfileAvatar size={220} className="mx-auto lg:mx-0" />
          </FadeIn>
          <FadeIn direction="right" delay={0.08}>
            <SectionHeading
              eyebrow="About"
              title={siteConfig.name}
              description={siteConfig.positioning}
            />
            <p className="text-sm text-[#A6AFBF]">{siteConfig.roleNote}</p>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#A6AFBF] sm:text-base">
              <p>
                I deliver production web applications, frontend architecture,
                backend APIs, cloud deployments, and AI integrations — with
                focus on performance, maintainability, and reliable operations.
              </p>
              <p className="rounded-xl border border-white/10 bg-[#111722] p-4 text-[#F5F7FA]">
                {siteConfig.philosophy}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button href="/projects">Explore Projects</Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
              <Button href={siteConfig.resumeUrl} external variant="ghost">
                Download Resume
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-[#0D111A]/50">
        <SectionHeading eyebrow="Highlights" title="Verified focus areas" />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.highlights.map((item) => (
            <StaggerItem
              key={item.label}
              className="rounded-xl border border-white/10 bg-[#111722]/70 p-3.5"
            >
              <p className="text-lg font-semibold text-[#F5F7FA]">{item.value}</p>
              <p className="text-xs text-[#A6AFBF]">{item.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading eyebrow="Education" title="Academic background" />
        <FadeIn>
          <div className="rounded-xl border border-white/10 bg-[#111722]/70 p-5">
            <h3 className="text-lg font-semibold text-[#F5F7FA]">
              {siteConfig.education.degree}
            </h3>
            <p className="mt-1 text-sm text-[#A6AFBF]">
              {siteConfig.education.institution}
            </p>
            <p className="mt-1 font-mono text-sm text-[#35D6FF]">
              {siteConfig.education.years}
            </p>
          </div>
        </FadeIn>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button href="/experience" variant="outline">
            Experience
          </Button>
          <Button href="/skills" variant="ghost">
            Skills
          </Button>
        </div>
      </Section>
    </>
  );
}
