import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getFeaturedProjects, getVisibleProjects } from "@/data/projects";
import { experienceRoles } from "@/data/experience";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);
  const projectCount = getVisibleProjects().length;

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-500/10">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
        <div className="pointer-events-none absolute -left-20 top-6 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:py-16">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sky-400">
              {siteConfig.title}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">{siteConfig.roleNote}</p>
            <p className="mt-3 max-w-2xl text-lg font-medium leading-snug text-slate-200 sm:text-xl">
              {siteConfig.headline}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button href="/projects">
                View Projects
                <ArrowRight size={16} />
              </Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
              <Button href={siteConfig.linkedin} external variant="ghost">
                LinkedIn
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {siteConfig.primaryTechnologies.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-500/20 bg-[#101A2B]/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-emerald-400/15 blur-2xl" />
            <div className="relative rounded-2xl border border-slate-500/20 bg-[#101A2B]/75 p-4 shadow-[0_0_50px_rgba(59,130,246,0.12)] backdrop-blur sm:p-5">
              <div className="flex items-center gap-3">
                <ProfileAvatar size={96} />
                <div>
                  <p className="text-base font-semibold text-slate-50">
                    {siteConfig.name}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-400">
                    {experienceRoles[0].title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {experienceRoles[0].company}
                  </p>
                </div>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-500/15 bg-[#070B14] p-3 font-[family-name:var(--font-jetbrains)] text-[11px] leading-relaxed text-sky-300/90">
{`const engineer = {
  stacks: ["MERN", "MEAN"],
  cloud: ["AWS", "Docker"],
  ships: "production systems",
};`}
              </pre>
            </div>
          </FadeIn>
        </div>

        <div className="pb-5 text-center">
          <a
            href="#highlights"
            className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-sky-300"
          >
            Scroll
            <ArrowDown size={14} className="motion-safe:animate-bounce" />
          </a>
        </div>
      </section>

      <Section id="highlights">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.highlights.map((item) => (
            <StaggerItem
              key={item.label}
              className="rounded-xl border border-slate-500/15 bg-[#101A2B]/60 p-3.5 transition hover:border-blue-400/30"
            >
              <p className="text-xl font-semibold text-slate-50">{item.value}</p>
              <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{item.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-[#0B1220]/40">
        <SectionHeading
          eyebrow="Projects"
          title={`${projectCount} verified projects`}
          description="Web, mobile, e-commerce, and Figma designs with authentic links — curated for this portfolio."
        />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
        <Button href="/projects" variant="outline" className="mt-5">
          View all projects
        </Button>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-[#142238] via-[#101A2B] to-[#0B1220] p-6 sm:p-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              Ready to discuss a project?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Ask Faheem AI about verified work, or contact me directly for
              consulting and delivery.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button href="/assistant">Open AI Assistant</Button>
              <Button href="/contact" variant="outline">
                Contact
              </Button>
              <Button href="/about" variant="ghost">
                About & Experience
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
