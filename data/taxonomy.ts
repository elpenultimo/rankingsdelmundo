export type CategoryKey = "paises" | "ciudades" | "dinero" | "clima" | "vida";

export const regionKeys = [
  "global",
  "america",
  "sudamerica",
  "norteamerica",
  "europa",
  "asia",
  "africa",
  "oceania"
] as const;
export type RegionKey = (typeof regionKeys)[number];

export const rankingYears = ["2024", "2025", "2026"] as const;
export type RankingYear = (typeof rankingYears)[number];

export const isRankingYear = (value: string): value is RankingYear =>
  (rankingYears as readonly string[]).includes(value);

export const isRankingRegion = (value: string): value is RegionKey =>
  (regionKeys as readonly string[]).includes(value);
