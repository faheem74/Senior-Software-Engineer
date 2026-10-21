import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Mail,
  FileDown,
  Code2,
  Server,
  Cloud,
  Database,
  Sparkles,
  Gauge,
  Layers,
  Cpu,
  MessagesSquare,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getFeaturedProjects, getVisibleProjects } from "@/data/projects";
import { experienceRoles } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { services } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import { RoleRotator } from "@/components/motion/RoleRotator";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

const serviceIcons = [
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

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 6);
  const projectCount = getVisibleProjects().length;

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden border-b border-white/5"
      >
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#7C5CFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#35D6FF]/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-16">
          <FadeIn>
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
              <Button href="/#projects">
                Explore My Work
                <ArrowRight size={16} />
              </Button>
              <Button href="/#contact" variant="outline">
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

          <HeroPortrait />
        </div>

        <div className="pb-5 text-center">
          <Link
            href="/#about"
            className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#7A8499] hover:text-[#35D6FF]"
          >
            Scroll
            <ArrowDown size={14} className="motion-safe:animate-bounce" />
          </Link>
        </div>
      </section>

      <Section id="about">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <FadeIn>
            <SectionHeading
              eyebrow="About"
              title="Senior engineer focused on reliable delivery"
              description={siteConfig.positioning}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="space-y-3 text-sm leading-relaxed text-[#A6AFBF] sm:text-base">
              <p>
                Across 8+ years I have delivered full-stack applications,
                frontend architecture, backend APIs, cloud deployments, and AI
                integrations — with attention to performance, maintainability,
                and production stability.
              </p>
              <p className="rounded-xl border border-white/10 bg-[#111722] p-4 text-[#F5F7FA]">
                {siteConfig.philosophy}
              </p>
            </div>
            <Stagger className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {siteConfig.highlights.slice(0, 5).map((item) => (
                <StaggerItem
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-[#111722]/70 p-3"
                >
                  <p className="text-lg font-semibold text-[#F5F7FA]">{item.value}</p>
                  <p className="text-xs text-[#A6AFBF]">{item.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>
        </div>
      </Section>

      <Section id="skills" className="bg-[#0D111A]/60">
        <SectionHeading
          eyebrow="Skills"
          title="Technical skills"
          description="Verified technologies from professional experience — no fabricated proficiency percentages."
        />
        <Stagger className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <StaggerItem
              key={category.id}
              className="rounded-xl border border-white/10 bg-[#111722]/80 p-4 transition hover:border-[#7C5CFF]/35"
            >
              <h3 className="text-sm font-semibold text-[#F5F7FA]">
                {category.title}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-[#0D111A] px-2 py-1 text-[11px] text-[#A6AFBF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Engagements grounded in full-stack, backend, AI, and cloud delivery."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <StaggerItem
                key={service.id}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-[#111722]/70 p-4 transition hover:-translate-y-0.5 hover:border-[#7C5CFF]/40 hover:shadow-[0_16px_40px_rgba(124,92,255,0.12)]"
              >
                <Icon className="text-[#7C5CFF]" size={20} />
                <h3 className="mt-3 text-base font-semibold text-[#F5F7FA]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#A6AFBF]">
                  {service.description}
                </p>
                <Button
                  href="/#contact"
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

      <Section id="experience" className="bg-[#0D111A]/60">
        <SectionHeading
          eyebrow="Experience"
          title="Professional timeline"
          description="Verified roles from the senior resume."
        />
        <div className="relative space-y-0 border-l border-white/10 pl-6">
          {experienceRoles.map((role, index) => (
            <FadeIn key={role.id} delay={index * 0.05}>
              <article className="relative pb-6 last:pb-0">
                <span className="absolute -left-[1.85rem] top-1 h-2.5 w-2.5 rounded-full bg-[#7C5CFF] shadow-[0_0_12px_rgba(124,92,255,0.8)]" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#35D6FF]">
                  {role.period}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#F5F7FA]">
                  {role.title}
                </h3>
                <p className="text-sm text-[#A6AFBF]">{role.company}</p>
                <ul className="mt-2 space-y-1">
                  {role.bullets.slice(0, 3).map((bullet) => (
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

      <Section id="projects">
        <SectionHeading
          eyebrow="Projects"
          title={`${projectCount} verified projects`}
          description="Curated live products, published apps, and authorized Figma designs — plus public GitHub work at github.com/faheem74."
        />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button href="/projects" variant="outline">
            View all projects
          </Button>
          <Button href={siteConfig.github} external variant="ghost">
            <GitHubIcon size={16} />
            GitHub
          </Button>
        </div>
      </Section>

      <Section id="ai-cloud" className="bg-[#0D111A]/60">
        <SectionHeading
          eyebrow="AI & Cloud"
          title="Intelligent systems on reliable infrastructure"
          description="Generative AI integrations, LLM-backed features, and cloud deployment practices used in production portfolios and client systems."
        />
        <Stagger className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Generative AI integrations",
            "LLM-powered applications",
            "AI API integrations",
            "Intelligent workflows",
            "Backend services for AI apps",
            "Cloud deployment",
            "Application scaling",
            "Monitoring and reliability",
          ].map((item) => (
            <StaggerItem
              key={item}
              className="rounded-xl border border-white/10 bg-[#111722]/70 px-3 py-3 text-sm text-[#F5F7FA]"
            >
              {item}
            </StaggerItem>
          ))}
        </Stagger>
        <ArchitectureFlow />
        <div className="mt-5">
          <Button href="/assistant" variant="secondary">
            Open Faheem AI Assistant
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Approach"
          title="Development approach"
          description="Architecture first, then iterative delivery with measurable outcomes."
        />
        <Stagger className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "Discover",
              detail: "Clarify goals, constraints, and success metrics.",
            },
            {
              step: "Architect",
              detail: "Design APIs, data models, and cloud boundaries.",
            },
            {
              step: "Build",
              detail: "Ship maintainable full-stack features in cycles.",
            },
            {
              step: "Operate",
              detail: "Deploy, monitor, and harden production systems.",
            },
          ].map((item, index) => (
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
      </Section>

      <Section id="contact">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's discuss your project"
              description="Share goals, constraints, and timeline for a useful reply."
            />
            <ul className="space-y-2 text-sm text-[#A6AFBF]">
              <li>
                Email:{" "}
                <a
                  className="text-[#35D6FF] hover:underline"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a className="text-[#35D6FF] hover:underline" href={siteConfig.phoneTel}>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a
                  className="text-[#35D6FF] hover:underline"
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/faheem74
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  className="text-[#35D6FF] hover:underline"
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  faheem-bilal-dev
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
