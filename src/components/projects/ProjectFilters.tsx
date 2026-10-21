"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
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
                  ? "border-blue-400/50 bg-blue-500/20 text-sky-300"
                  : "border-slate-500/20 text-slate-400 hover:border-slate-400/40 hover:text-slate-200",
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
          className="w-full rounded-xl border border-slate-500/20 bg-[#0B1220] px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-400/40 sm:max-w-xs"
          aria-label="Search projects"
        />
      </div>

      <p className="mb-4 text-sm text-slate-500">
        Showing {filtered.length} of {projects.length} projects
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/50 p-8 text-center text-slate-400">
          No projects match this filter.
        </p>
      ) : null}
    </div>
  );
}
