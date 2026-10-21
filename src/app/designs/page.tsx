import type { Metadata } from "next";
import { getDesignProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "UI/UX Designs",
  description:
    "Figma mobile app designs by Faheem Bilal — Fast Ride, STMCZ, Yes Time, Health & Fitness, and multi-module concepts.",
};

export default function DesignsPage() {
  const designs = getDesignProjects();

  return (
    <Section>
      <SectionHeading
        eyebrow="UI/UX Designs"
        title="Mobile app designs in Figma"
        description="Authentic design files linked from the verified resume. These are design prototypes — not published App Store products unless a live URL is also listed."
      />
      <Stagger className="grid gap-6 md:grid-cols-2">
        {designs.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
