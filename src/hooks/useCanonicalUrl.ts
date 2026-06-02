import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.indiaipo.in";

/**
 * Derives the canonical URL for the current page.
 *
 * Rules:
 *  - Uses BASE_URL + pathname (query params are intentionally stripped).
 *  - Trailing slashes are normalised away (except the root "/").
 *  - An optional `overridePath` lets individual pages supply an explicit
 *    canonical path (e.g. `/blog` for any `/blog?page=N` paginated URL).
 */
export function useCanonicalUrl(overridePath?: string): string {
  const { pathname } = useLocation();

  // Normalise: strip trailing slash except for root
  const normalisePath = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

  const resolvedPath = overridePath
    ? normalisePath(overridePath)
    : normalisePath(pathname);

  return `${BASE_URL}${resolvedPath}`;
}

export { BASE_URL };
