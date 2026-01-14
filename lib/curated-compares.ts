import {
  curatedCompares,
  type CompareMode,
  type CuratedCompare
} from "../data/curated-compares";
import { getCityEntities, getCountryEntities } from "./compare";
import { buildCompareDetailPath } from "./url";

export type ResolvedCuratedCompare = CuratedCompare & {
  aName: string;
  bName: string;
  slug: string;
  href: string;
};

const getEntityMap = (mode: CompareMode) => {
  const entities = mode === "pais" ? getCountryEntities() : getCityEntities();
  return new Map(entities.map((entity) => [entity.slug, entity.name]));
};

export const getCuratedCompares = (mode?: CompareMode): CuratedCompare[] =>
  mode ? curatedCompares.filter((compare) => compare.mode === mode) : curatedCompares;

export const resolveCuratedCompare = (
  compare: CuratedCompare
): ResolvedCuratedCompare | null => {
  const entityMap = getEntityMap(compare.mode);
  const aName = entityMap.get(compare.a);
  const bName = entityMap.get(compare.b);

  if (!aName || !bName) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[curated-compares] Falta entidad para ${compare.mode}: ${compare.a} vs ${compare.b}`
      );
    }
    return null;
  }

  const slug = `${compare.a}-vs-${compare.b}`;
  return {
    ...compare,
    aName,
    bName,
    slug,
    href: buildCompareDetailPath(compare.mode, compare.a, compare.b)
  };
};
