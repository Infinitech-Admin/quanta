// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getApiUrl } from "@/lib/api-url";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    const response = await fetch(`${getApiUrl()}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        remember_me: rememberMe || false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Check the common variants of where the backend nests the token.
    const token: string | undefined =
      data?.data?.token ??
      data?.token ??
      data?.data?.access_token ??
      data?.access_token;

    if (!token) {
      console.error("Login succeeded but no token found in response:", data);
      return NextResponse.json(
        {
          success: false,
          message: "Login succeeded but no token was returned by the server.",
        },
        { status: 500 },
      );
    }

    // Same idea for the role: check every variant we've seen it show up
    // under, since the shape isn't fully consistent.
    const role: string | undefined =
      data?.data?.user?.user_role ??
      data?.user?.user_role ??
      data?.data?.user?.role ??
      data?.user?.role;

    const cookieStore = await cookies();
    const maxAge = rememberMe
      ? 60 * 60 * 24 * 30 // 30 days if remember me
      : 60 * 60 * 24 * 7; // 7 days default

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
    });

    // NOT httpOnly: the admin guard reads this client-side to gate
    // /admin routes. Never put anything sensitive in here — it's just a
    // display/routing hint, the real authorization still happens against
    // auth_token on the backend.
    if (role) {
      cookieStore.set("user_role", role, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: maxAge,
        path: "/",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
