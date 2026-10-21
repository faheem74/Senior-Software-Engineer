import { getPostBySlug } from "@/data/blog";
import { fail, ok } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return fail("Post not found", 404, { code: "NOT_FOUND" });
  return ok(post);
}
