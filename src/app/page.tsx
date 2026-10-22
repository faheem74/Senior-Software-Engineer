import { ArrowDown, ArrowRight, Mail, FileDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getFeaturedProjects, getVisibleProjects } from "@/data/projects";
import { services } from "@/data/services";
import { experienceRoles } from "@/data/experience";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RoleRotator } from "@/components/motion/RoleRotator";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { TechMarquee } from "@/components/motion/TechMarquee";
import { Magnetic } from "@/components/motion/MagneticButton";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { CountUp } from "@/components/motion/CountUp";
import { BigTextReveal } from "@/components/motion/BigTextReveal";
import { OrbitBackdrop } from "@/components/motion/OrbitBackdrop";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);
  const projectCount = getVisibleProjects().length;

  return (
    <>
      {/* ——— HERO (Polpharma cinematic + GPG atmosphere) ——— */}
      <section className="relative min-h-[min(100svh,960px)] overflow-hidden border-b border-white/5">
        <OrbitBackdrop />
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-20">
          <FadeIn direction="left">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#35D6FF]">
              Hello, I&apos;m Faheem Bilal
            </p>
            <SplitHeadline
              className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-[#F5F7FA] sm:text-4xl lg:text-[3.25rem]"
              lines={[
                "Senior Software Engineer",
                "Building Scalable Digital",
                "Experiences.",
              ]}
            />
            <div className="mt-5">
              <RoleRotator />
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#A6AFBF] sm:text-base">
              Senior Software Engineer and AI &amp; Cloud Architect with 8+ years
              of experience building scalable web applications, intelligent
              AI-powered solutions, and reliable cloud systems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="/projects">
                  Explore My Work
                  <ArrowRight size={16} />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" variant="outline">
                  Let&apos;s Work Together
                </Button>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A6AFBF] transition hover:text-[#35D6FF]"
              >
                <GitHubIcon size={15} /> GitHub Profile
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-[#A6AFBF] transition hover:text-[#35D6FF]"
              >
                <Mail size={15} /> Email Me
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A6AFBF] transition hover:text-[#35D6FF]"
              >
                <FileDown size={15} /> Download Resume
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.12}>
            <HeroPortrait />
          </FadeIn>
        </div>

        <div className="pb-6 text-center">
          <Link
            href="#impact"
            className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#7A8499] hover:text-[#35D6FF]"
          >
            Scroll
            <ArrowDown size={14} className="motion-safe:animate-bounce" />
          </Link>
        </div>
      </section>

      <TechMarquee />

      {/* ——— IMPACT STATS (Polpharma counters) ——— */}
      <Section id="impact">
        <SectionHeading
          eyebrow="Impact"
          title="Engineering built for production"
          description="Verified focus areas from 8+ years shipping full-stack systems."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 8, suffix: "+", label: "Years experience" },
            { n: projectCount, suffix: "", label: "Verified projects" },
            { n: 9, suffix: "", label: "Service areas" },
            { n: 14, suffix: "+", label: "Core technologies" },
          ].map((item) => (
            <StaggerItem
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#111722]/80 p-5"
            >
              <p className="text-4xl font-semibold tracking-tight text-[#F5F7FA]">
                <CountUp value={item.n} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm text-[#A6AFBF]">{item.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ——— PHILOSOPHY (Polpharma big text) ——— */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#0D111A]/70 py-16 md:py-20">
        <OrbitBackdrop />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#35D6FF]">
            Philosophy
          </p>
          <BigTextReveal className="justify-center text-2xl font-semibold leading-snug text-[#F5F7FA] sm:text-3xl md:text-4xl">
            {siteConfig.philosophy}
          </BigTextReveal>
          <div className="mt-8">
            <Button href="/about" variant="outline">
              More about me
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* ——— SERVICES PREVIEW (GPG card carousel feel) ——— */}
      <Section>
        <SectionHeading
          eyebrow="Services"
          title="What I deliver"
          description="Full-stack, backend, AI, and cloud engagements — explore the full list on Services."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <StaggerItem
              key={service.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/70 p-5 transition hover:border-[#7C5CFF]/45"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#7C5CFF]/10 blur-2xl transition group-hover:bg-[#7C5CFF]/25" />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-[#35D6FF]">
                Service
              </p>
              <h3 className="relative mt-2 text-lg font-semibold text-[#F5F7FA]">
                {service.title}
              </h3>
              <p className="relative mt-2 text-sm text-[#A6AFBF]">
                {service.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <Magnetic className="mt-6 inline-flex">
          <Button href="/services">
            View all services
            <ArrowRight size={16} />
          </Button>
        </Magnetic>
      </Section>

      {/* ——— EXPERIENCE STRIP ——— */}
      <Section className="bg-[#0D111A]/50">
        <SectionHeading
          eyebrow="Experience"
          title="Recent roles"
          description="Verified timeline from the senior resume."
        />
        <Stagger className="space-y-3">
          {experienceRoles.slice(0, 2).map((role) => (
            <StaggerItem
              key={role.id}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#111722]/70 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[11px] text-[#35D6FF]">{role.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-[#F5F7FA]">
                  {role.title}
                </h3>
                <p className="text-sm text-[#A6AFBF]">{role.company}</p>
              </div>
              <Button href="/experience" variant="ghost" className="shrink-0">
                Full timeline
                <ArrowRight size={14} />
              </Button>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ——— PROJECTS ——— */}
      <Section>
        <SectionHeading
          eyebrow="Projects"
          title={`${projectCount} verified projects`}
          description="Live products, published apps, Figma designs, and public GitHub work."
        />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Magnetic>
            <Button href="/projects">View all projects</Button>
          </Magnetic>
          <Magnetic>
            <Button href="/assistant" variant="secondary">
              Open AI Assistant
            </Button>
          </Magnetic>
        </div>
      </Section>

      {/* ——— CTA BAND ——— */}
      <Section>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-[#7C5CFF]/30 bg-gradient-to-br from-[#142238] via-[#111722] to-[#0D111A] p-8 sm:p-12">
            <OrbitBackdrop />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-[#F5F7FA] sm:text-4xl">
                Ready to build something reliable?
              </h2>
              <p className="mt-3 max-w-2xl text-[#A6AFBF]">
                Tell me about your product, API, or AI idea — or ask Faheem AI
                about verified skills and projects first.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Magnetic>
                  <Button href="/contact">
                    Contact Me
                    <ArrowRight size={16} />
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/assistant" variant="outline">
                    AI Assistant
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
