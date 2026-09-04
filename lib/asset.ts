/**
 * Next's `basePath` only rewrites URLs it owns — router links, next/image and
 * the build's own chunks. A plain `src="/media/x.mp4"` is left alone, so under
 * a project-Pages deploy it resolves to the domain root and 404s. Anything
 * referenced by a raw string has to be prefixed by hand.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path?: string): string | undefined {
  if (!path) return path;
  // Absolute URLs and data URIs are already complete.
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE}${path}`;
}
