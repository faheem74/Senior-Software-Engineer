"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

export function ProjectFilters({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = active === "All" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [projects, active, query]);

  const tabs: Array<"All" | ProjectCategory> = ["All", ...categories];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition",
                active === tab
                  ? "border-[#7C5CFF]/50 bg-[#7C5CFF]/20 text-[#F5F7FA]"
                  : "border-white/10 text-[#A6AFBF] hover:border-white/25 hover:text-[#F5F7FA]",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-2.5 text-sm text-[#F5F7FA] outline-none focus:border-[#7C5CFF]/40 sm:max-w-xs"
          aria-label="Search projects"
        />
      </div>

      <p className="mb-4 text-sm text-[#7A8499]">
        Showing {filtered.length} of {projects.length} projects
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((project, i) => (
          <FadeIn key={project.slug} delay={Math.min(i * 0.04, 0.28)}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-[#111722]/50 p-8 text-center text-[#A6AFBF]">
          No projects match this filter.
        </p>
      ) : null}
    </div>
  );
}
