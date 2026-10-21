import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getPostBySlug } from "@/data/blog";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section>
      <p className="text-xs text-slate-500">
        {formatDate(post.publishedAt)} · {post.readingMinutes} min read
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-50">
        {post.title}
      </h1>
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
      <article className="prose-invert mt-10 max-w-3xl space-y-5">
        {post.content.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-slate-300">
            {paragraph}
          </p>
        ))}
      </article>
      <Button href="/contact" className="mt-12">
        Discuss this topic on a project
      </Button>
    </Section>
  );
}
