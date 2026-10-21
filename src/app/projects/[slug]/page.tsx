import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getRelatedProjects,
  getVisibleProjects,
} from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);

  return (
    <>
      <Section>
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">
            {project.category} · {project.status}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            {project.overview}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">Discuss a similar project</Button>
            {project.liveUrl ? (
              <Button href={project.liveUrl} external variant="outline">
                View Live Project
              </Button>
            ) : null}
            {project.figmaUrl ? (
              <Button href={project.figmaUrl} external variant="outline">
                View Figma Design
              </Button>
            ) : null}
            {project.playStoreUrl ? (
              <Button href={project.playStoreUrl} external variant="ghost">
                View on Google Play
              </Button>
            ) : null}
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-[#0B1220]/40 pt-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-500/15 bg-[#101A2B]">
          <Image
            src={project.screenshots[0]?.src || project.thumbnail}
            alt={project.screenshots[0]?.alt || project.name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 1100px"
            priority
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <CaseBlock title="Project Overview" body={project.overview} />
          <CaseBlock title="Project Type" body={project.category} />
          {project.businessContext ? (
            <CaseBlock title="Business Context" body={project.businessContext} />
          ) : null}
          {project.problemStatement ? (
            <CaseBlock title="Problem Statement" body={project.problemStatement} />
          ) : null}
          {project.role ? <CaseBlock title="My Role" body={project.role} /> : null}
          {project.designApproach ? (
            <CaseBlock title="Design Approach" body={project.designApproach} />
          ) : null}
          {project.architecture ? (
            <CaseBlock
              title="Technical Architecture"
              body={project.architecture}
            />
          ) : null}
          {project.testingApproach ? (
            <CaseBlock title="Testing Approach" body={project.testingApproach} />
          ) : null}
          {project.performanceNotes ? (
            <CaseBlock
              title="Performance Considerations"
              body={project.performanceNotes}
            />
          ) : null}
        </div>

        {project.objectives?.length ? (
          <ListBlock title="Project Objectives" items={project.objectives} />
        ) : null}
        {project.keyFeatures?.length ? (
          <ListBlock title="Key Features" items={project.keyFeatures} />
        ) : null}
        {project.challenges?.length ? (
          <ListBlock title="Development Challenges" items={project.challenges} />
        ) : null}
        {project.solutions?.length ? (
          <ListBlock title="Solutions Implemented" items={project.solutions} />
        ) : null}
        {project.lessonsLearned?.length ? (
          <ListBlock title="Lessons Learned" items={project.lessonsLearned} />
        ) : null}

        {project.verifiedInformation?.length ? (
          <ListBlock
            title="Verified Information"
            items={project.verifiedInformation}
          />
        ) : null}
        {project.sourceNotes ? (
          <CaseBlock title="Source Notes" body={project.sourceNotes} />
        ) : null}

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-slate-50">Technology Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-500/15 bg-[#142238] px-3 py-1.5 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {project.screenshots.length > 1 ? (
        <Section className="bg-[#0B1220]/40">
          <SectionHeading title="Screenshots" />
          <div className="grid gap-4 md:grid-cols-2">
            {project.screenshots.map((shot) => (
              <div
                key={shot.src}
                className="relative aspect-video overflow-hidden rounded-xl border border-slate-500/15"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section>
          <SectionHeading title="Related Projects" />
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="rounded-3xl border border-blue-400/20 bg-[#142238] p-8">
          <h2 className="text-2xl font-semibold text-slate-50">
            Want something similar?
          </h2>
          <p className="mt-3 text-slate-400">
            Share your goals and constraints — I&apos;ll help shape a practical
            delivery plan.
          </p>
          <Button href="/contact" className="mt-6">
            Contact Faheem
          </Button>
        </div>
      </Section>
    </>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/60 p-6">
      <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{body}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-300">
            <span className="mr-2 text-emerald-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
