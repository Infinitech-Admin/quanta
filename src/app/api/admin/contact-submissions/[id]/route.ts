import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headers = await authHeaders();
    const body = await request.json();
    const res = await fetch(
      `${getApiUrl()}/api/admin/contact-submissions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("PATCH /api/admin/contact-submissions/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const headers = await authHeaders();
    const res = await fetch(
      `${getApiUrl()}/api/admin/contact-submissions/${id}`,
      {
        method: "DELETE",
        headers: { Accept: "application/json", ...headers },
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("DELETE /api/admin/contact-submissions/[id] error:", error);
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
