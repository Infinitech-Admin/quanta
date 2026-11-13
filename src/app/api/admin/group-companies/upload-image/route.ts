// app/api/admin/group-companies/upload-image/route.ts
import { authHeaders } from "@/lib/auth-headers";

export const runtime = "nodejs"; // FormData/File forwarding needs Node, not Edge

const API_URL = process.env.LARAVEL_API_URL; // use the same name as your other proxy routes

export async function POST(request: Request) {
  if (!API_URL) {
    return Response.json(
      { success: false, message: "API_URL is not set in .env.local" },
      { status: 500 },
    );
  }

  const headers = {
    ...(await authHeaders()), // { Authorization: `Bearer ${token}` } or {}
    Accept: "application/json", // makes Laravel return JSON errors, not redirects
  };

  const incomingFormData = await request.formData();

  try {
    const res = await fetch(
      `${API_URL}/api/admin/group-companies/upload-image`,
      {
        method: "POST",
        headers, // don't set Content-Type: fetch adds the multipart boundary
        body: incomingFormData,
      },
    );

    const raw = await res.text();

    return new Response(raw, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { success: false, message: "Could not reach the API server" },
      { status: 502 },
    );
  }
}
