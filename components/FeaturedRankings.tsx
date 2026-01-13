"use client";

import { useMemo, useState } from "react";
import type { Ranking } from "../data/rankings";
import { RankingCard } from "./RankingCard";
import { SearchBar } from "./SearchBar";

export const FeaturedRankings = ({ rankings }: { rankings: Ranking[] }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return rankings.filter(
      (ranking) =>
        ranking.title.toLowerCase().includes(term) ||
        ranking.description.toLowerCase().includes(term)
    );
  }, [query, rankings]);

  return (
    <section className="space-y-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Busca rankings por tema" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ranking) => (
          <RankingCard key={ranking.slug} ranking={ranking} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No hay resultados con esa búsqueda. Prueba otro término.
        </p>
      )}
    </section>
  );
};
