import type { RankingCategory } from "../data/rankings";

const categoryStyles: Record<RankingCategory, string> = {
  paises: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  ciudades: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  dinero: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  clima: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200",
  vida: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
};

const categoryLabels: Record<RankingCategory, string> = {
  paises: "Países",
  ciudades: "Ciudades",
  dinero: "Dinero",
  clima: "Clima",
  vida: "Vida"
};

export const CategoryChip = ({ category }: { category: RankingCategory }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[category]}`}
  >
    {categoryLabels[category]}
  </span>
);

export const CategoryLabel = ({ category }: { category: RankingCategory }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${categoryStyles[category]}`}>
    {categoryLabels[category]}
  </span>
);
