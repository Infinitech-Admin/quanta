// app/api/admin/gallery/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

// Update — same multipart forwarding rule as POST /gallery. Laravel
// expects _method=PUT inside the form data for method spoofing, so
// append it here rather than using a native PUT (PHP won't parse
// multipart bodies on native PUT requests).

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const headers = await authHeaders();
    const formData = await request.formData();
    // No _method spoofing needed — the Laravel route for
    // gallery/{gallery} is registered as plain POST, not PUT.

    const res = await fetch(`${getApiUrl()}/api/admin/gallery/${id}`, {
      method: "POST",
      headers: { Accept: "application/json", ...headers },
      body: formData,
    });
    return await forwardJson(res);
  } catch (error) {
    console.error(`POST /api/admin/gallery/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const headers = await authHeaders();
    const res = await fetch(`${getApiUrl()}/api/admin/gallery/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json", ...headers },
    });
    return await forwardJson(res);
  } catch (error) {
    console.error(`DELETE /api/admin/gallery/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

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
