"use client";

import { useMemo, useState } from "react";
import type { Ranking, RankingCategory } from "../data/rankings";
import { RankingCard } from "./RankingCard";
import { SearchBar } from "./SearchBar";

const categories: { key: RankingCategory | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "paises", label: "Países" },
  { key: "ciudades", label: "Ciudades" },
  { key: "dinero", label: "Dinero" },
  { key: "clima", label: "Clima" },
  { key: "vida", label: "Vida" }
];

export const RankingsExplorer = ({
  rankings,
  initialCategory = "todas"
}: {
  rankings: Ranking[];
  initialCategory?: RankingCategory | "todas";
}) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RankingCategory | "todas">(initialCategory);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return rankings.filter((ranking) => {
      const matchesCategory =
        activeCategory === "todas" || ranking.category === activeCategory;
      const matchesQuery =
        ranking.title.toLowerCase().includes(term) ||
        ranking.description.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, rankings]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Buscar ranking o tema" />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => setActiveCategory(category.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeCategory === category.key
                ? "bg-brand-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
            aria-pressed={activeCategory === category.key}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ranking) => (
          <RankingCard key={ranking.slug} ranking={ranking} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          No encontramos rankings con esos filtros. Prueba otra palabra o categoría.
        </div>
      )}
    </div>
  );
};
