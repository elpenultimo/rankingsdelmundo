import { toSlug } from "../lib/slug";
import { countryToRegion } from "./geo";
import { rankings, type Ranking } from "./rankings";
import type { RegionKey } from "./taxonomy";

export type EntityType = "pais" | "ciudad";

export type EntityRecord = {
  name: string;
  slug: string;
  rankings: Ranking[];
};

const countryRegionBySlug = new Map<string, RegionKey>(
  Object.entries(countryToRegion).map(([name, region]) => [toSlug(name), region])
);

export const getRegionForCountryName = (name: string): RegionKey | undefined =>
  countryRegionBySlug.get(toSlug(name));

export const isCountryName = (name: string): boolean => countryRegionBySlug.has(toSlug(name));

const buildEntityIndex = (type: EntityType) => {
  const index = new Map<string, EntityRecord>();

  rankings.forEach((ranking) => {
    if (type === "pais" && ranking.category !== "paises") return;
    if (type === "ciudad" && ranking.category !== "ciudades") return;

    ranking.items.forEach((item) => {
      const slug = toSlug(item.name);
      const existing = index.get(slug);
      if (existing) {
        if (!existing.rankings.find((entry) => entry.slug === ranking.slug)) {
          existing.rankings.push(ranking);
        }
        return;
      }
      index.set(slug, {
        name: item.name,
        slug,
        rankings: [ranking]
      });
    });
  });

  return index;
};

const countryIndex = buildEntityIndex("pais");
const cityIndex = buildEntityIndex("ciudad");

export const getEntityIndex = (type: EntityType) =>
  type === "pais" ? countryIndex : cityIndex;

export const getEntities = (type: EntityType): EntityRecord[] =>
  Array.from(getEntityIndex(type).values()).sort((a, b) => a.name.localeCompare(b.name));

export const getEntityBySlug = (type: EntityType, slug: string): EntityRecord | undefined =>
  getEntityIndex(type).get(slug);

export const getEntityLink = (name: string, category: string): string | null => {
  if (category === "ciudades") {
    return `/ciudad/${toSlug(name)}`;
  }

  if (category === "paises" || isCountryName(name)) {
    return `/pais/${toSlug(name)}`;
  }

  return null;
};
