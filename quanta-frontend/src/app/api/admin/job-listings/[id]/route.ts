// app/api/admin/job-listings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const headers = await authHeaders();
    const body = await request.json();
    const res = await fetch(`${getApiUrl()}/api/admin/job-listings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("PUT /api/admin/job-listings/[id] error:", error);
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
  try {
    const { id } = await params;
    const headers = await authHeaders();
    const res = await fetch(`${getApiUrl()}/api/admin/job-listings/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json", ...headers },
    });
    const data = await res.json().catch(() => ({ success: res.ok }));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("DELETE /api/admin/job-listings/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
