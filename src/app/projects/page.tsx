import type { Metadata } from "next";
import {
  getProjectCategories,
  getVisibleProjects,
} from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { FadeIn } from "@/components/motion/FadeIn";

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
      <FadeIn>
        <SectionHeading
          eyebrow="Projects"
          title={`${projects.length} verified projects`}
          description="Curated live products, published apps, and Figma designs. Filters help you browse by category."
        />
      </FadeIn>
      <ProjectFilters projects={projects} categories={categories} />
    </Section>
  );
}
