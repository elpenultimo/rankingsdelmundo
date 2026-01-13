import { rankings, type Ranking } from "../data/rankings";
import { slugify } from "./slug";

export type EntityKind = "pais" | "ciudad";

export type EntitySummary = {
  name: string;
  slug: string;
  rankings: Ranking[];
};

type EntityIndex = {
  list: EntitySummary[];
  bySlug: Map<string, EntitySummary>;
  byName: Map<string, EntitySummary>;
};

const buildEntityIndex = (kind: EntityKind): EntityIndex => {
  const mapByName = new Map<string, EntitySummary>();

  rankings.forEach((ranking) => {
    const shouldInclude =
      (kind === "pais" && ranking.category === "paises") ||
      (kind === "ciudad" && ranking.category === "ciudades");
    if (!shouldInclude) return;

    ranking.items.forEach((item) => {
      const name = item.name.trim();
      if (!name) return;
      const existing = mapByName.get(name);
      if (existing) {
        existing.rankings.push(ranking);
      } else {
        mapByName.set(name, {
          name,
          slug: slugify(name),
          rankings: [ranking]
        });
      }
    });
  });

  const list = Array.from(mapByName.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const bySlug = new Map<string, EntitySummary>();
  list.forEach((entity) => bySlug.set(entity.slug, entity));

  return {
    list,
    bySlug,
    byName: mapByName
  };
};

const entityCache: Record<EntityKind, EntityIndex> = {
  pais: buildEntityIndex("pais"),
  ciudad: buildEntityIndex("ciudad")
};

export const getEntities = (kind: EntityKind): EntitySummary[] => entityCache[kind].list;

export const getEntityBySlug = (kind: EntityKind, slug: string): EntitySummary | undefined =>
  entityCache[kind].bySlug.get(slug);

export const getEntitySlug = (kind: EntityKind, name: string): string | null =>
  entityCache[kind].byName.get(name)?.slug ?? null;
