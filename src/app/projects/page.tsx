import type { Metadata } from "next";
import {
  getProjectCategories,
  getVisibleProjects,
} from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectFilters } from "@/components/projects/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Verified web, mobile, e-commerce, and Figma projects from Faheem Bilal’s portfolio.",
};

export default function ProjectsPage() {
  const projects = getVisibleProjects();
  const categories = getProjectCategories();

  return (
    <Section>
      <SectionHeading
        eyebrow="Projects"
        title={`${projects.length} verified projects`}
        description="Live web apps, Vercel deployments, published apps, and Figma designs — with authentic links."
      />
      {projects.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-[#111722] p-8 text-center text-[#A6AFBF]">
          Projects are loading. Please refresh, or open /api/projects.
        </p>
      ) : (
        <ProjectFilters projects={projects} categories={categories} />
      )}
    </Section>
  );
}
