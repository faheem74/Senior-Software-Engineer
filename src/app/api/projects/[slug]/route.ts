import { getProjectBySlug } from "@/data/projects";
import { fail, ok } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return fail("Project not found", 404, { code: "NOT_FOUND" });
  }
  return ok(project);
}
