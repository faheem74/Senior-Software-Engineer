import { getBlogPosts } from "@/data/blog";
import { fail, ok } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 10)));
    const items = getBlogPosts();
    const total = items.length;
    const start = (page - 1) * limit;
    return ok(items.slice(start, start + limit), {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch {
    return fail("Failed to load blog posts", 500, { code: "BLOG_ERROR" });
  }
}
