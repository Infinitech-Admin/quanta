// app/api/admin/job-applications/[id]/route.ts
import { proxyToLaravel } from "@/lib/laravel";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

async function forward(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  return proxyToLaravel(req, {
    path: `/admin/job-applications/${encodeURIComponent(id)}`,
  });
}

export const GET = forward; // view one
export const PUT = forward; // update status / notes
export const PATCH = forward;
export const DELETE = forward; // delete application + CV
