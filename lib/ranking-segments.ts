export const rankingYears = ["2024", "2025", "2026"] as const;

export type RankingYear = (typeof rankingYears)[number];

export const isRankingYear = (value: string): value is RankingYear =>
  (rankingYears as readonly string[]).includes(value);
