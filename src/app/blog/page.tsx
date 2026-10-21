import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/data/blog";
import { Section, SectionHeading } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles on architecture, API security, and AI assistants.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Section>
      <SectionHeading
        eyebrow="Blog"
        title="Technical writing"
        description="Practical notes grounded in portfolio engineering decisions."
      />
      <Stagger className="grid gap-4">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-slate-500/15 bg-[#101A2B]/70 p-6 transition hover:border-blue-400/30"
            >
              <p className="text-xs text-slate-500">
                {formatDate(post.publishedAt)} · {post.readingMinutes} min read
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-slate-400">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-500/15 px-2 py-1 text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
