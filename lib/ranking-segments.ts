import { getRegionForCountry, regions, type RegionKey } from "../data/geo";
import { rankingYears, type Ranking, type RankingItem, type RankingYear } from "../data/rankings";

export const regionOptions = regions;

export const yearOptions = rankingYears;

export const getAvailableRegionsForRanking = (ranking: Ranking): RegionKey[] => {
  const regionSet = new Set<RegionKey>();
  ranking.items.forEach((item) => {
    const region = getRegionForCountry(item.name);
    if (region !== "unknown") {
      regionSet.add(region);
    }
  });

  return Array.from(regionSet).filter((region) => region !== "unknown");
};

export const getItemsForRegion = (ranking: Ranking, region: RegionKey): RankingItem[] =>
  ranking.items.filter((item) => getRegionForCountry(item.name) === region);

export const canSegmentByRegion = (ranking: Ranking): boolean =>
  getAvailableRegionsForRanking(ranking).length > 0;

export const isRankingYear = (value: string): value is RankingYear =>
  rankingYears.map(String).includes(value);

export const isRankingRegion = (value: string): value is RegionKey =>
  regions.map((region) => region.key).includes(value as Exclude<RegionKey, "unknown">) ||
  value === "global";
