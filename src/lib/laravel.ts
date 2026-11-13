import { cookies } from "next/headers";

// Server-side only. Base URL of your Laravel API, including /api.
// e.g. LARAVEL_API_URL=http://localhost:8000/api
const API_URL = (
  process.env.LARAVEL_API_URL ?? "http://localhost:8000/api"
).replace(/\/$/, "");

// Name of the cookie that holds the Sanctum token after admin login.
// CHANGE THIS to whatever your login flow / existing admin proxy uses.
const AUTH_COOKIE = process.env.AUTH_COOKIE_NAME ?? "token";

export async function getAuthToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value ?? null;
}

type ProxyOptions = {
  /** Laravel path after /api, e.g. "/admin/job-applications/5" */
  path: string;
  /** Require the admin token (default true). */
  auth?: boolean;
};

/**
 * Forwards the incoming request to Laravel and streams the response back
 * (JSON, validation errors and file downloads all pass through unchanged).
 */
export async function proxyToLaravel(
  req: Request,
  { path, auth = true }: ProxyOptions,
) {
  const headers: Record<string, string> = { Accept: "application/json" };

  if (auth) {
    const token = await getAuthToken();
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthenticated." },
        { status: 401 },
      );
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const incoming = new URL(req.url);
  const url = `${API_URL}${path}${incoming.search}`;

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  let body: BodyInit | undefined;
  if (hasBody) {
    const type = req.headers.get("content-type") ?? "";
    if (type.includes("multipart/form-data")) {
      // Let fetch set the multipart boundary itself.
      body = await req.formData();
    } else {
      headers["Content-Type"] = type || "application/json";
      body = await req.text();
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(url, { method, headers, body, cache: "no-store" });
  } catch {
    return Response.json(
      { success: false, message: "Could not reach the API. Please try again." },
      { status: 502 },
    );
  }

  const out = new Headers();
  for (const name of [
    "content-type",
    "content-disposition",
    "content-length",
  ]) {
    const value = upstream.headers.get(name);
    if (value) out.set(name, value);
  }

  return new Response(upstream.body, { status: upstream.status, headers: out });
}
