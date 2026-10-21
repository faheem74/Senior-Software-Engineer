import type { Metadata } from "next";
import { skillCategories } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "Frontend, backend, databases, AI, cloud, mobile, and engineering skills.",
};

export default function SkillsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Skills"
        title="Technical skills"
        description="Technologies that represent real day-to-day capability — without fabricated proficiency percentages."
      />
      <Stagger className="grid gap-5 md:grid-cols-2">
        {skillCategories.map((category) => (
          <StaggerItem
            key={category.id}
            className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/70 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-50">
              {category.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-slate-500/15 bg-[#142238] px-3 py-1.5 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
