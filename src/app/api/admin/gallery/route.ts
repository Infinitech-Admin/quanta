// app/api/admin/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function GET(request: NextRequest) {
  try {
    const headers = await authHeaders();
    const { search } = new URL(request.url); // forwards ?category=... if present
    const res = await fetch(`${getApiUrl()}/api/admin/gallery${search}`, {
      headers: { Accept: "application/json", ...headers },
      cache: "no-store",
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// Image upload — forward the incoming multipart form data as-is.
// Do NOT call request.json() here: the body is a file upload, not JSON,
// and re-encoding it would strip the file. Let fetch set its own
// multipart boundary — don't set Content-Type manually.
export async function POST(request: NextRequest) {
  try {
    const headers = await authHeaders();
    const formData = await request.formData();

    const res = await fetch(`${getApiUrl()}/api/admin/gallery`, {
      method: "POST",
      headers: { Accept: "application/json", ...headers },
      body: formData,
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// Reads the body as text first so a malformed/non-JSON response from
// Laravel (a stray warning, HTML error page, etc.) can be logged and
// surfaced instead of throwing an opaque JSON.parse error.
async function forwardJson(res: Response) {
  const raw = await res.text();
  try {
    const data = JSON.parse(raw);
    return NextResponse.json(data, { status: res.status });
  } catch {
    console.error("Non-JSON response from Laravel:", res.status, raw);
    return NextResponse.json(
      {
        success: false,
        message: "Backend returned an invalid response.",
        debug: raw.slice(0, 2000),
      },
      { status: 502 },
    );
  }
}
