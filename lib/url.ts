export type CompareMode = "pais" | "ciudad";

export const isCompareMode = (value?: string | null): value is CompareMode =>
  value === "pais" || value === "ciudad";

export const parseCompareSlug = (slug: string) => {
  const [aSlug, bSlug] = slug.split("-vs-");
  if (!aSlug || !bSlug) return null;
  return { aSlug, bSlug };
};

export const buildCompareDetailPath = (mode: CompareMode, aSlug: string, bSlug: string) =>
  `/comparar/${mode}/${aSlug}-vs-${bSlug}`;

export const buildCompareLandingUrl = (options: {
  mode: CompareMode;
  aSlug?: string | null;
  bSlug?: string | null;
}) => {
  const params = new URLSearchParams();
  params.set("mode", options.mode);
  if (options.aSlug) params.set("a", options.aSlug);
  if (options.bSlug) params.set("b", options.bSlug);
  const query = params.toString();
  return query ? `/comparar?${query}` : "/comparar";
};

export const swapCompareSlugInPath = (pathname: string, aSlug: string, bSlug: string) => {
  const slugSegment = `/${aSlug}-vs-${bSlug}`;
  if (pathname.includes(slugSegment)) {
    return pathname.replace(slugSegment, `/${bSlug}-vs-${aSlug}`);
  }
  return pathname;
};
