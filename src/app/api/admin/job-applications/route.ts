// app/api/admin/job-applications/route.ts
import { proxyToLaravel } from "@/lib/laravel";

export const dynamic = "force-dynamic";

// GET /api/admin/job-applications?per_page=100&page=1
export function GET(req: Request) {
  return proxyToLaravel(req, { path: "/admin/job-applications" });
}
