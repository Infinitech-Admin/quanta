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

/**
 * Resolves a possibly-relative image path to a fully-qualified URL.
 * - Absolute http(s), blob: and data: URLs pass through unchanged.
 * - null/empty returns null.
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  // Static Next.js assets belong to the frontend, not the Laravel origin.
  if (/^\/(brands|images)\//.test(path)) return path;
  return `${IMAGE_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
