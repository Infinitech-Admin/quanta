// app/api/inquiries/route.ts
import { proxyToLaravel } from "@/lib/laravel";

// POST /api/inquiries  (JSON from the contact form)
// → Laravel POST /api/v1/inquiries
export function POST(req: Request) {
  return proxyToLaravel(req, { path: "/v1/inquiries", auth: false });
}
