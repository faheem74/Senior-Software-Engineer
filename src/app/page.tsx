import { ArrowDown, ArrowRight, Mail, FileDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getFeaturedProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RoleRotator } from "@/components/motion/RoleRotator";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#7C5CFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#35D6FF]/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-16">
          <FadeIn direction="left">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#35D6FF]">
              Hello, I&apos;m Faheem Bilal
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.12] tracking-tight text-[#F5F7FA] sm:text-4xl lg:text-5xl">
              Senior Software Engineer
              <br />
              Building Scalable Digital
              <br />
              Experiences.
            </h1>
            <div className="mt-4">
              <RoleRotator />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A6AFBF] sm:text-base">
              Senior Software Engineer and AI &amp; Cloud Architect with 8+ years
              of experience building scalable web applications, intelligent
              AI-powered solutions, and reliable cloud systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button href="/projects">
                Explore My Work
                <ArrowRight size={16} />
              </Button>
              <Button href="/contact" variant="outline">
                Let&apos;s Work Together
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
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

        <div className="pb-5 text-center">
          <Link
            href="/about"
            className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#7A8499] hover:text-[#35D6FF]"
          >
            About Me
            <ArrowDown size={14} className="motion-safe:animate-bounce" />
          </Link>
        </div>
      </section>

      <Section>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.highlights.map((item) => (
            <StaggerItem
              key={item.label}
              className="rounded-xl border border-white/10 bg-[#111722]/70 p-3.5"
            >
              <p className="text-xl font-semibold text-[#F5F7FA]">{item.value}</p>
              <p className="mt-0.5 text-xs text-[#A6AFBF]">{item.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-[#0D111A]/50">
        <SectionHeading
          eyebrow="Featured"
          title="Selected projects"
          description="Open the Projects page for filters, case studies, demos, and source links."
        />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button href="/projects">View all projects</Button>
          <Button href="/assistant" variant="secondary">
            Open AI Assistant
          </Button>
          <Button href="/services" variant="outline">
            Services
          </Button>
        </div>
      </Section>
    </>
  );
}
