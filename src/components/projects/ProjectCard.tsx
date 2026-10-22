"use client";

import Image from "next/image";
import { ExternalLink, PenTool, ArrowUpRight, Smartphone } from "lucide-react";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "design-prototype": "Figma Design",
  "published-app": "Published App",
  demo: "Live Demo",
  reference: "Reference",
};

export function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout={!reduce}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/90 transition duration-500 hover:-translate-y-2 hover:border-[#7C5CFF]/45 hover:shadow-[0_24px_60px_rgba(124,92,255,0.2)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1220]">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/80 via-transparent to-transparent opacity-80" />
        <div className="absolute left-3 top-3 rounded-full border border-slate-500/20 bg-[#070B14]/85 px-3 py-1 text-xs text-slate-200 backdrop-blur">
          {statusLabel[project.status]}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#35D6FF]">
          {project.category}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-[#F5F7FA]">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A6AFBF]">
          {project.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-[#0D111A] px-2.5 py-1 text-xs text-[#A6AFBF]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            href={`/projects/${project.slug}`}
            variant="outline"
            className="px-3 py-2"
          >
            View Details
            <ArrowUpRight size={16} />
          </Button>
          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              external
              variant="ghost"
              className="px-3 py-2"
            >
              View Live Project
              <ExternalLink size={16} />
            </Button>
          ) : null}
          {project.playStoreUrl ? (
            <Button
              href={project.playStoreUrl}
              external
              variant="ghost"
              className="px-3 py-2"
            >
              Google Play
              <Smartphone size={16} />
            </Button>
          ) : null}
          {project.figmaUrl ? (
            <Button
              href={project.figmaUrl}
              external
              variant="ghost"
              className="px-3 py-2"
            >
              View Figma Design
              <PenTool size={16} />
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
