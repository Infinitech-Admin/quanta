// app/api/admin/news/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";
import { forwardJson } from "@/lib/forward-json";

export async function GET() {
  try {
    const headers = await authHeaders();
    const res = await fetch(`${getApiUrl()}/api/admin/news`, {
      headers: { Accept: "application/json", ...headers },
      cache: "no-store",
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// Multipart upload (cover_image + images[]) — forward the form data as-is.
// Don't set Content-Type manually; fetch adds the multipart boundary.
export async function POST(request: NextRequest) {
  try {
    const headers = await authHeaders();
    const formData = await request.formData();

    const res = await fetch(`${getApiUrl()}/api/admin/news`, {
      method: "POST",
      headers: { Accept: "application/json", ...headers },
      body: formData,
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("POST /api/admin/news error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
