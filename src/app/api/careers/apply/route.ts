// app/api/careers/apply/route.ts
import { proxyToLaravel } from "@/lib/laravel";

// POST /api/careers/apply  (multipart/form-data from the careers form)
// → Laravel POST /api/v1/job-applications
export function POST(req: Request) {
  return proxyToLaravel(req, { path: "/v1/job-applications", auth: false });
}
