// app/api/admin/job-applications/[id]/cv/route.ts
import { proxyToLaravel } from "@/lib/laravel";

export const dynamic = "force-dynamic";

// GET /api/admin/job-applications/:id/cv  → streams the CV file
export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  return proxyToLaravel(req, {
    path: `/admin/job-applications/${encodeURIComponent(id)}/cv`,
  });
}
