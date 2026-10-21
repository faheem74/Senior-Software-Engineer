import type { Metadata } from "next";
import { skillCategories } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across frontend, backend, databases, mobile, AI, and cloud.",
};

export default function SkillsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Skills"
        title="Technical skills"
        description="Verified from professional experience — no fabricated proficiency percentages."
      />
      <Stagger className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <StaggerItem
            key={category.id}
            className="rounded-xl border border-white/10 bg-[#111722]/80 p-4 transition hover:border-[#7C5CFF]/35"
          >
            <h2 className="text-base font-semibold text-[#F5F7FA]">
              {category.title}
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/10 bg-[#0D111A] px-2.5 py-1 text-xs text-[#A6AFBF]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Button href="/services">Services</Button>
        <Button href="/projects" variant="outline">
          Projects
        </Button>
      </div>
    </Section>
  );
}
