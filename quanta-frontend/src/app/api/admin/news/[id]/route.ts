// app/api/admin/news/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";
import { forwardJson } from "@/lib/forward-json";

type Ctx = { params: Promise<{ id: string }> };

// Update (multipart). Laravel route is POST /admin/news/{news}.
export async function POST(request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const headers = await authHeaders();
    const formData = await request.formData();

    const res = await fetch(
      `${getApiUrl()}/api/admin/news/${encodeURIComponent(id)}`,
      {
        method: "POST",
        headers: { Accept: "application/json", ...headers },
        body: formData,
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("POST /api/admin/news/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const headers = await authHeaders();

    const res = await fetch(
      `${getApiUrl()}/api/admin/news/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: { Accept: "application/json", ...headers },
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("DELETE /api/admin/news/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
