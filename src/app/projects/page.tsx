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
    "12 verified web, mobile, e-commerce, and Figma projects from Faheem Bilal’s portfolio.",
};

export default function ProjectsPage() {
  const projects = getVisibleProjects();
  const categories = getProjectCategories();

  return (
    <Section>
      <SectionHeading
        eyebrow="Projects"
        title={`${projects.length} verified projects`}
        description="Curated from resume-verified work and CodesThinker research links. Live demos, Google Play, and Figma actions appear only when real URLs exist. Filters: All, Web, Mobile, Ecommerce, UI/UX, and more when present."
      />
      <ProjectFilters projects={projects} categories={categories} />
    </Section>
  );
}
