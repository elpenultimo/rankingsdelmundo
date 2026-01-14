import { toSlug } from "./slug";
import { getEntities, getEntityBySlug } from "../data/entities";
import type { Ranking } from "../data/rankings";

export type Metric = {
  key: string;
  label: string;
  value: number | string;
  sourceRankingSlug: string;
  note?: string;
};

type MetricDefinition = {
  key: string;
  label: string;
  betterWhen?: "lower" | "higher";
  priority?: number;
};

const metricDefinitions: Record<string, MetricDefinition> = {
  "coste-de-vida-ciudades": {
    key: "costo-de-vida",
    label: "Costo de vida (índice)",
    betterWhen: "lower",
    priority: 5
  },
  "ciudades-mas-seguras": {
    key: "seguridad",
    label: "Seguridad (índice)",
    betterWhen: "higher",
    priority: 5
  },
  "calidad-de-vida-global": {
    key: "calidad-de-vida",
    label: "Calidad de vida (índice)",
    betterWhen: "higher",
    priority: 5
  },
  "paises-mas-innovadores": {
    key: "innovacion",
    label: "Innovación (índice)",
    betterWhen: "higher",
    priority: 4
  },
  "paises-mas-competitivos": {
    key: "competitividad",
    label: "Competitividad (índice)",
    betterWhen: "higher",
    priority: 4
  },
  "paises-con-mejor-salud": {
    key: "salud",
    label: "Salud (índice)",
    betterWhen: "higher",
    priority: 4
  },
  "economias-mas-estables": {
    key: "estabilidad-economica",
    label: "Estabilidad económica (índice)",
    betterWhen: "higher",
    priority: 4
  },
  "salarios-promedio-globales": {
    key: "salarios",
    label: "Salarios promedio (índice)",
    betterWhen: "higher",
    priority: 3
  },
  "ciudades-mas-verdes": {
    key: "sostenibilidad",
    label: "Sostenibilidad verde (índice)",
    betterWhen: "higher",
    priority: 3
  },
  "ciudades-con-mejor-movilidad": {
    key: "movilidad",
    label: "Movilidad urbana (índice)",
    betterWhen: "higher",
    priority: 3
  },
  "climas-mas-agradables": {
    key: "clima",
    label: "Clima agradable (índice)",
    betterWhen: "higher",
    priority: 3
  },
  "destinos-con-buena-calidad-aire": {
    key: "calidad-aire",
    label: "Calidad del aire (índice)",
    betterWhen: "higher",
    priority: 3
  }
};

const categoryPriority: Record<string, number> = {
  dinero: 4,
  vida: 3,
  clima: 2,
  paises: 2,
  ciudades: 2
};

const defaultDefinition = (ranking: Ranking): MetricDefinition => ({
  key: ranking.slug,
  label: `${ranking.title} (índice)`,
  betterWhen: "higher",
  priority: categoryPriority[ranking.category] ?? 1
});

const parseNumericValue = (rawValue: string): number | null => {
  const normalized = rawValue.replace(",", ".").replace(/\s+/g, " ");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildMetricForRanking = (ranking: Ranking, entityName: string): Metric | null => {
  const item = ranking.items.find((entry) => toSlug(entry.name) === toSlug(entityName));
  if (!item) return null;
  const numericValue = parseNumericValue(item.value);
  if (numericValue === null) return null;

  const definition = metricDefinitions[ranking.slug] ?? defaultDefinition(ranking);
  return {
    key: definition.key,
    label: definition.label,
    value: numericValue,
    sourceRankingSlug: ranking.slug,
    note: item.note
  };
};

const getComparableMetricsForEntity = (type: "pais" | "ciudad", name: string): Metric[] => {
  const entity = getEntityBySlug(type, toSlug(name));
  if (!entity) return [];

  const metrics: Array<{ metric: Metric; priority: number }> = [];

  entity.rankings.forEach((ranking) => {
    const metric = buildMetricForRanking(ranking, entity.name);
    if (!metric) return;
    const definition = metricDefinitions[ranking.slug] ?? defaultDefinition(ranking);
    const priority = definition.priority ?? categoryPriority[ranking.category] ?? 1;
    metrics.push({ metric, priority });
  });

  const unique = new Map<string, { metric: Metric; priority: number }>();
  metrics
    .sort((a, b) => b.priority - a.priority)
    .forEach((entry) => {
      if (!unique.has(entry.metric.key)) {
        unique.set(entry.metric.key, entry);
      }
    });

  return Array.from(unique.values())
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 12)
    .map((entry) => entry.metric);
};

export const getCountryEntities = () =>
  getEntities("pais").map((entity) => ({ name: entity.name, slug: entity.slug }));

export const getCityEntities = () =>
  getEntities("ciudad").map((entity) => ({ name: entity.name, slug: entity.slug }));

export const getComparableMetricsForCountry = (name: string): Metric[] =>
  getComparableMetricsForEntity("pais", name);

export const getComparableMetricsForCity = (name: string): Metric[] =>
  getComparableMetricsForEntity("ciudad", name);

export const metricPreferences = Object.fromEntries(
  Object.entries(metricDefinitions).map(([slug, definition]) => [
    definition.key ?? slug,
    definition.betterWhen ?? "higher"
  ])
);

const buildPopularityList = (type: "pais" | "ciudad") =>
  getEntities(type)
    .map((entity) => ({ ...entity, appearances: entity.rankings.length }))
    .sort((a, b) => b.appearances - a.appearances || a.name.localeCompare(b.name));

const countryPopularity = buildPopularityList("pais");
const cityPopularity = buildPopularityList("ciudad");

export const getTopCountries = (n: number) => countryPopularity.slice(0, n);
export const getTopCities = (n: number) => cityPopularity.slice(0, n);

export const buildComparePairs = (
  list: Array<{ slug: string }>,
  maxPairs = Number.POSITIVE_INFINITY
) => {
  const pairs: string[] = [];
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      pairs.push(`${list[i].slug}-vs-${list[j].slug}`);
      if (pairs.length >= maxPairs) {
        return pairs;
      }
    }
  }
  return pairs;
};
