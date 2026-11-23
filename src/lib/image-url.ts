// Laravel returns relative paths for uploaded images, e.g. "/customers/xxx.jpg".
// Those only resolve on the Laravel origin, so prefix them with where Laravel
// is served.
//
// .env.local:
//   NEXT_PUBLIC_IMAGES_URL=https://infinitech-api14.site
//
// (NEXT_PUBLIC_IMAGE_URL without the S is also accepted, since both spellings
// were used before. NEXT_PUBLIC_* values are baked in at build/start time, so
// restart `npm run dev` after changing .env.local.)
const IMAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGES_URL ??
  process.env.NEXT_PUBLIC_IMAGE_URL ??
  ""
).replace(/\/$/, "");

const ABSOLUTE_URL = /^(https?:|blob:|data:)/;

/**
 * Resolves a possibly-relative image path to a fully-qualified URL.
 * - Absolute http(s), blob: and data: URLs pass through unchanged.
 * - Paths under /brands/ or /images/ are treated as static Next.js assets.
 * - null/empty returns null.
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (ABSOLUTE_URL.test(path)) return path;
  // Static Next.js assets belong to the frontend, not the Laravel origin.
  if (/^\/(brands|images)\//.test(path)) return path;
  return `${IMAGE_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Always resolves against the Laravel origin, even for paths that start with
 * /brands/ or /images/. Use this for images that come from the API (e.g. a
 * brand logo stored as "/brands/kami.png" on the Laravel server), where
 * getImageUrl() would wrongly treat them as frontend static files.
 */
export function getRemoteImageUrl(
  path: string | null | undefined,
): string | null {
  if (!path) return null;
  if (ABSOLUTE_URL.test(path)) return path;
  return `${IMAGE_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
