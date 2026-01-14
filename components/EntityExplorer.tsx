"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import type { EntityRecord, EntityType } from "../data/entities";

export const EntityExplorer = ({
  entities,
  type
}: {
  entities: EntityRecord[];
  type: EntityType;
}) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return entities.filter((entity) => entity.name.toLowerCase().includes(term));
  }, [entities, query]);

  return (
    <div className="space-y-6">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder={`Buscar ${type === "pais" ? "país" : "ciudad"}`}
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entity) => (
          <Link
            key={entity.slug}
            href={`/${type}/${entity.slug}`}
            className="card flex items-center justify-between p-4"
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {entity.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {entity.rankings.length} rankings
            </span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          No encontramos resultados con ese filtro.
        </div>
      )}
    </div>
  );
};
