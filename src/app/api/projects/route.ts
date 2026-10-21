import { getVisibleProjects } from "@/data/projects";
import { fail, ok } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 12)));

    let items = getVisibleProjects();
    if (category) {
      items = items.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    const total = items.length;
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return ok(data, {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch {
    return fail("Failed to load projects", 500, { code: "PROJECTS_ERROR" });
  }
}
