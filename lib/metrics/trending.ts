import { getEntityBySlug } from "../../data/entities";
import { rankings } from "../../data/rankings";
import { regionLabels } from "../../lib/regions";
import { buildCompareDetailPath, parseCompareSlug } from "../../lib/url";
import { metricsStore } from "./store";
import type { MetricKind, MetricScope } from "./types";

type TrendingItem = {
  title: string;
  href: string;
  subtitle?: string;
};

const stripScope = (key: string, scope: MetricScope) =>
  key.startsWith(`${scope}:`) ? key.slice(scope.length + 1) : key;

const buildRankingItem = (key: string): TrendingItem | null => {
  const slug = stripScope(key, "ranking");
  const [baseSlug, ...segments] = slug.split("|");
  const ranking = rankings.find((item) => item.slug === baseSlug);
  if (!ranking) return null;

  let region: string | undefined;
  let year: string | undefined;

  segments.forEach((segment) => {
    if (segment.startsWith("region:")) {
      region = segment.replace("region:", "");
      return;
    }
    if (segment.startsWith("anio:")) {
      year = segment.replace("anio:", "");
    }
  });

  const href =
    region && year
      ? `/ranking/${baseSlug}/region/${region}/anio/${year}`
      : region
        ? `/ranking/${baseSlug}/region/${region}`
        : year
          ? `/ranking/${baseSlug}/anio/${year}`
          : `/ranking/${baseSlug}`;

  const subtitleParts: string[] = [];
  if (region) {
    const regionLabel = regionLabels[region as keyof typeof regionLabels];
    subtitleParts.push(regionLabel ?? region);
  }
  if (year) subtitleParts.push(`Edición ${year}`);

  return {
    title: ranking.title,
    href,
    subtitle: subtitleParts.length ? subtitleParts.join(" · ") : undefined
  };
};

const buildCompareItem = (key: string, scope: MetricScope): TrendingItem | null => {
  const slug = stripScope(key, scope);
  const parsed = parseCompareSlug(slug);
  if (!parsed) return null;
  const entityType = scope === "compare_ciudad" ? "ciudad" : "pais";
  const entityA = getEntityBySlug(entityType, parsed.aSlug);
  const entityB = getEntityBySlug(entityType, parsed.bSlug);
  if (!entityA || !entityB) return null;

  return {
    title: `${entityA.name} vs ${entityB.name}`,
    href: buildCompareDetailPath(entityType, parsed.aSlug, parsed.bSlug),
    subtitle: entityType === "ciudad" ? "Comparación de ciudades" : "Comparación de países"
  };
};

const getCompareTop = async (kind: MetricKind, days: number, limit: number) => {
  const [pais, ciudad] = await Promise.all([
    metricsStore.getTop(kind, "compare_pais", days, limit),
    metricsStore.getTop(kind, "compare_ciudad", days, limit)
  ]);

  return [
    ...pais.map((item) => ({ ...item, scope: "compare_pais" as const })),
    ...ciudad.map((item) => ({ ...item, scope: "compare_ciudad" as const }))
  ]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getTrendingRankings = async (days = 7, limit = 10): Promise<TrendingItem[]> => {
  const top = await metricsStore.getTop("view", "ranking", days, limit);
  return top.map((item) => buildRankingItem(item.key)).filter(Boolean) as TrendingItem[];
};

export const getTrendingCompares = async (days = 7, limit = 10): Promise<TrendingItem[]> => {
  const topCompare = await getCompareTop("compare", days, limit);
  const resolved = topCompare
    .map((item) => buildCompareItem(item.key, item.scope))
    .filter(Boolean) as TrendingItem[];
  if (resolved.length) return resolved;

  const topView = await getCompareTop("view", days, limit);
  return topView
    .map((item) => buildCompareItem(item.key, item.scope))
    .filter(Boolean) as TrendingItem[];
};

export const getMostViewedRankings = async (
  days = 30,
  limit = 10
): Promise<TrendingItem[]> => {
  const top = await metricsStore.getTop("view", "ranking", days, limit);
  return top.map((item) => buildRankingItem(item.key)).filter(Boolean) as TrendingItem[];
};

export const getMostCompared = async (days = 30, limit = 10): Promise<TrendingItem[]> => {
  const topCompare = await getCompareTop("compare", days, limit);
  return topCompare
    .map((item) => buildCompareItem(item.key, item.scope))
    .filter(Boolean) as TrendingItem[];
};
