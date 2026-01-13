"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Ranking, RankingCategory, RankingRegion, RankingYear } from "../data/rankings";
import { RankingCard } from "./RankingCard";
import { SearchBar } from "./SearchBar";
import { regions } from "../data/geo";
import { rankingYears } from "../data/rankings";

const categories: { key: RankingCategory | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "paises", label: "Países" },
  { key: "ciudades", label: "Ciudades" },
  { key: "dinero", label: "Dinero" },
  { key: "clima", label: "Clima" },
  { key: "vida", label: "Vida" }
];

const orderOptions = [
  { key: "relevancia", label: "Relevancia" },
  { key: "alfabetico", label: "Alfabético" },
  { key: "actualizado", label: "Actualizado" }
] as const;

type OrderKey = (typeof orderOptions)[number]["key"];

type ExplorerFilters = {
  category: RankingCategory | "todas";
  region: RankingRegion | "todas";
  year: RankingYear | "todas";
  order: OrderKey;
  query: string;
};

const normalizeQuery = (value: string) => value.toLowerCase();

export const RankingsExplorer = ({
  rankings,
  initialFilters
}: {
  rankings: Ranking[];
  initialFilters: ExplorerFilters;
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialFilters.query);
  const [activeCategory, setActiveCategory] = useState<RankingCategory | "todas">(
    initialFilters.category
  );
  const [activeRegion, setActiveRegion] = useState<RankingRegion | "todas">(
    initialFilters.region
  );
  const [activeYear, setActiveYear] = useState<RankingYear | "todas">(
    initialFilters.year
  );
  const [activeOrder, setActiveOrder] = useState<OrderKey>(initialFilters.order);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "todas") params.set("cat", activeCategory);
    if (activeRegion !== "todas") params.set("region", activeRegion);
    if (activeYear !== "todas") params.set("year", String(activeYear));
    if (query) params.set("q", query);
    if (activeOrder !== "relevancia") params.set("order", activeOrder);
    const queryString = params.toString();
    router.replace(queryString ? `/rankings?${queryString}` : "/rankings", {
      scroll: false
    });
  }, [activeCategory, activeRegion, activeYear, activeOrder, query, router]);

  const filtered = useMemo(() => {
    const term = normalizeQuery(query);
    const results = rankings.filter((ranking) => {
      const matchesCategory =
        activeCategory === "todas" || ranking.category === activeCategory;
      const matchesRegion = activeRegion === "todas" || ranking.region === activeRegion;
      const matchesYear = activeYear === "todas" || ranking.year === activeYear;
      const matchesQuery =
        term.length === 0 ||
        ranking.title.toLowerCase().includes(term) ||
        ranking.description.toLowerCase().includes(term) ||
        ranking.items.some((item) => item.name.toLowerCase().includes(term));

      return matchesCategory && matchesRegion && matchesYear && matchesQuery;
    });

    if (activeOrder === "alfabetico") {
      return [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (activeOrder === "actualizado") {
      return [...results].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }

    return results;
  }, [query, activeCategory, activeRegion, activeYear, activeOrder, rankings]);

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
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Región
          <select
            value={activeRegion}
            onChange={(event) => setActiveRegion(event.target.value as RankingRegion | "todas")}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="todas">Todas</option>
            {regions.map((region) => (
              <option key={region.key} value={region.key}>
                {region.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Año
          <select
            value={activeYear}
            onChange={(event) => {
              const value = event.target.value;
              setActiveYear(value === "todas" ? "todas" : (Number(value) as RankingYear));
            }}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="todas">Todos</option>
            {rankingYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Orden
          <select
            value={activeOrder}
            onChange={(event) => setActiveOrder(event.target.value as OrderKey)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {orderOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
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
