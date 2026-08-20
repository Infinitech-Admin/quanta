import { authHeaders } from "@/lib/auth-headers"; // adjust path to wherever authHeaders() actually lives

export const runtime = "nodejs"; // FormData/File forwarding needs the Node runtime, not Edge

export async function POST(request: Request) {
  const headers = await authHeaders(); // { Authorization: `Bearer ${token}` } or {}

  const incomingFormData = await request.formData();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/group-companies/upload-image`,
    {
      method: "POST",
      headers, // do NOT set Content-Type manually — fetch sets the multipart boundary itself
      body: incomingFormData,
    },
  );

  const raw = await res.text();

  return new Response(raw, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
