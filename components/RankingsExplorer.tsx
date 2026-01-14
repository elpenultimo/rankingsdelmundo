"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Ranking } from "../data/rankings";
import { RankingCard } from "./RankingCard";
import { SearchBar } from "./SearchBar";
import { rankingYears, regionKeys, type CategoryKey, type RankingYear, type RegionKey } from "../data/taxonomy";
import { regionLabels } from "../lib/regions";

const categories: { key: CategoryKey | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "paises", label: "Países" },
  { key: "ciudades", label: "Ciudades" },
  { key: "dinero", label: "Dinero" },
  { key: "clima", label: "Clima" },
  { key: "vida", label: "Vida" }
];

const sortOptions = [
  { key: "relevance", label: "Relevancia" },
  { key: "alpha", label: "A-Z" },
  { key: "updated", label: "Actualizado" }
] as const;

type SortKey = (typeof sortOptions)[number]["key"];

const parseQueryValue = (value: string | null) => (value ? value : "");

const parseRankingCategory = (value: string | null) => {
  if (value === "paises" || value === "ciudades" || value === "dinero" || value === "clima" || value === "vida") {
    return value;
  }
  return "todas";
};

const parseRegion = (value: string | null): RegionKey | "todas" => {
  if (value && regionKeys.includes(value as RegionKey)) {
    return value as RegionKey;
  }
  return "todas";
};

const parseYear = (value: string | null): RankingYear | "todas" => {
  if (value && rankingYears.includes(value as RankingYear)) {
    return value as RankingYear;
  }
  return "todas";
};

const parseSort = (value: string | null): SortKey => {
  if (value === "alpha" || value === "updated") {
    return value;
  }
  return "relevance";
};

export const RankingsExplorer = ({
  rankings,
  initialCategory = "todas",
  initialRegion = "todas",
  initialYear = "todas",
  initialQuery = "",
  initialSort = "relevance"
}: {
  rankings: Ranking[];
  initialCategory?: CategoryKey | "todas";
  initialRegion?: RegionKey | "todas";
  initialYear?: RankingYear | "todas";
  initialQuery?: string;
  initialSort?: SortKey;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "todas">(initialCategory);
  const [activeRegion, setActiveRegion] = useState<RegionKey | "todas">(initialRegion);
  const [activeYear, setActiveYear] = useState<RankingYear | "todas">(initialYear);
  const [sortKey, setSortKey] = useState<SortKey>(initialSort);

  useEffect(() => {
    const params = searchParams;
    if (!params) return;

    const nextQuery = parseQueryValue(params.get("q"));
    const nextCategory = parseRankingCategory(params.get("cat"));
    const nextRegion = parseRegion(params.get("region"));
    const nextYear = parseYear(params.get("year"));
    const nextSort = parseSort(params.get("sort"));

    setQuery(nextQuery);
    setActiveCategory(nextCategory);
    setActiveRegion(nextRegion);
    setActiveYear(nextYear);
    setSortKey(nextSort);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "todas") params.set("cat", activeCategory);
    if (activeRegion !== "todas") params.set("region", activeRegion);
    if (activeYear !== "todas") params.set("year", activeYear);
    if (query) params.set("q", query);
    if (sortKey !== "relevance") params.set("sort", sortKey);

    const next = params.toString();
    const current = searchParams?.toString() ?? "";
    if (next !== current) {
      router.replace(next ? `/rankings?${next}` : "/rankings");
    }
  }, [activeCategory, activeRegion, activeYear, query, sortKey, router, searchParams]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    const result = rankings.filter((ranking) => {
      const matchesCategory = activeCategory === "todas" || ranking.category === activeCategory;
      const matchesRegion =
        activeRegion === "todas" || (ranking.regionScope ?? "global") === activeRegion;
      const matchesYear = activeYear === "todas" || ranking.year === activeYear;
      const matchesQuery =
        ranking.title.toLowerCase().includes(term) ||
        ranking.description.toLowerCase().includes(term) ||
        ranking.items.some((item) => item.name.toLowerCase().includes(term));
      return matchesCategory && matchesRegion && matchesYear && matchesQuery;
    });

    if (sortKey === "alpha") {
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortKey === "updated") {
      return [...result].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }

    return result;
  }, [query, activeCategory, activeRegion, activeYear, rankings, sortKey]);

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
      <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Región</span>
          <select
            value={activeRegion}
            onChange={(event) => setActiveRegion(event.target.value as RegionKey | "todas")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="todas">Todas</option>
            {regionKeys.map((region) => (
              <option key={region} value={region}>
                {regionLabels[region]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Año</span>
          <select
            value={activeYear}
            onChange={(event) => setActiveYear(event.target.value as RankingYear | "todas")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="todas">Todos</option>
            {rankingYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Orden</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {sortOptions.map((option) => (
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
