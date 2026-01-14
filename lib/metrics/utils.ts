import type { MetricScope } from "./types";

export const buildRankingMetricSlug = ({
  slug,
  region,
  year
}: {
  slug: string;
  region?: string;
  year?: string;
}) => {
  const parts = [slug];
  if (region) parts.push(`region:${region}`);
  if (year) parts.push(`anio:${year}`);
  return parts.join("|");
};

export const buildMetricKey = (scope: MetricScope, slug: string) => `${scope}:${slug}` as const;
