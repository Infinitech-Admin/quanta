import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_URL = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/group-companies`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const body = await res.text();

    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the API" },
      { status: 502 },
    );
  }
}
