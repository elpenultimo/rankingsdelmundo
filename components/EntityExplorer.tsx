"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import type { EntitySummary } from "../lib/entities";

export const EntityExplorer = ({
  entities,
  basePath,
  placeholder
}: {
  entities: EntitySummary[];
  basePath: "/pais" | "/ciudad";
  placeholder: string;
}) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return entities.filter((entity) => entity.name.toLowerCase().includes(term));
  }, [query, entities]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} placeholder={placeholder} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entity) => (
          <Link
            key={entity.slug}
            href={`${basePath}/${entity.slug}`}
            className="card flex items-center justify-between p-5 transition hover:border-brand-300"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {entity.name}
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Mencionado en {entity.rankings.length} ranking(s)
              </p>
            </div>
            <span className="text-xs font-semibold text-brand-600">Ver ficha →</span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          No encontramos resultados. Prueba otra palabra.
        </div>
      )}
    </div>
  );
};
