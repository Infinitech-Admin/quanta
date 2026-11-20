import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headers = await authHeaders();
    const body = await request.json();
    const res = await fetch(`${getApiUrl()}/api/admin/brands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return await forwardJson(res);
  } catch (error) {
    console.error(`PUT /api/admin/brands/${id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headers = await authHeaders();
    const res = await fetch(`${getApiUrl()}/api/admin/brands/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json", ...headers },
    });
    return await forwardJson(res);
  } catch (error) {
    console.error(`DELETE /api/admin/brands/${id} error:`, error);
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
        // remove this in production once diagnosed — exposes raw backend output
        debug: raw.slice(0, 2000),
      },
      { status: 502 },
    );
  }
}
