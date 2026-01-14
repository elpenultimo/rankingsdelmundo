import type { Ranking } from "../data/rankings";
import { getRegionForCountryName } from "../data/entities";
import type { RegionKey, RankingYear } from "../data/taxonomy";
import { regionLabels } from "./regions";

export const filterItemsByRegion = (ranking: Ranking, region: RegionKey) => {
  if (region === "global") {
    return ranking.items;
  }

  return ranking.items.filter((item) => getRegionForCountryName(item.name) === region);
};

export const buildSegmentTitle = ({
  ranking,
  region,
  year
}: {
  ranking: Ranking;
  region?: RegionKey;
  year?: RankingYear;
}) => {
  if (region && year) {
    return `${ranking.title} en ${regionLabels[region]} ${year}`;
  }

  if (region) {
    return `${ranking.title} en ${regionLabels[region]}`;
  }

  if (year) {
    return `${ranking.title} edición ${year}`;
  }

  return ranking.title;
};

export const buildSegmentDescription = ({
  ranking,
  region,
  year
}: {
  ranking: Ranking;
  region?: RegionKey;
  year?: RankingYear;
}) => {
  if (region && year) {
    return `${ranking.description} Mirada regional para ${regionLabels[region]} en la edición ${year}.`;
  }

  if (region) {
    return `${ranking.description} Enfoque editorial para ${regionLabels[region]} con datos comparativos.`;
  }

  if (year) {
    return `${ranking.description} Versión editorial correspondiente a la edición ${year}.`;
  }

  return ranking.description;
};

export const buildSegmentIntro = ({
  region,
  year
}: {
  region?: RegionKey;
  year?: RankingYear;
}) => {
  if (region && year) {
    return [
      `Esta segmentación destaca el desempeño en ${regionLabels[region]} durante la edición ${year}.`,
      "Los resultados se filtran por entidades con región conocida para evitar datos ambiguos."
    ];
  }

  if (region) {
    return [
      `Esta versión regional destaca únicamente países con ubicación confirmada en ${regionLabels[region]}.`,
      "Los elementos sin región conocida se excluyen para mantener consistencia editorial."
    ];
  }

  if (year) {
    return [
      `Esta edición está pensada para contextualizar el ranking en ${year}.`,
      "Los valores siguen siendo referenciales y no sustituyen informes oficiales."
    ];
  }

  return [];
};

export const buildMethodologyNote = ({
  ranking,
  year
}: {
  ranking: Ranking;
  year?: RankingYear;
}) => {
  if (!year) return undefined;

  if (!ranking.year) {
    return `Edición ${year} referencial. Este ranking base no reporta un año oficial.`;
  }

  if (ranking.year !== year) {
    return `Vista ${year} basada en el ranking original ${ranking.year}.`;
  }

  return undefined;
};
