"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCityEntities, getCountryEntities } from "../lib/compare";

type CompareEntity = {
  name: string;
  slug: string;
};

type CompareSelectorProps = {
  id: string;
  label: string;
  entities: CompareEntity[];
  query: string;
  onQueryChange: (value: string) => void;
  selectedSlug: string;
  onSelect: (entity: CompareEntity) => void;
};

const CompareSelector = ({
  id,
  label,
  entities,
  query,
  onQueryChange,
  selectedSlug,
  onSelect
}: CompareSelectorProps) => {
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entities.slice(0, 8);
    return entities
      .filter((entity) => entity.name.toLowerCase().includes(normalized))
      .slice(0, 8);
  }, [entities, query]);

  const selected = entities.find((entity) => entity.slug === selectedSlug);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Buscar entidad..."
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />
      {selected ? (
        <p className="text-xs text-slate-500">Seleccionado: {selected.name}</p>
      ) : null}
      <div className="grid gap-2">
        {filtered.map((entity) => (
          <button
            key={entity.slug}
            type="button"
            onClick={() => onSelect(entity)}
            className={`flex items-center justify-between rounded-2xl border px-4 py-2 text-left text-sm ${
              entity.slug === selectedSlug
                ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/70 dark:bg-brand-900/30 dark:text-brand-100"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            <span>{entity.name}</span>
            <span className="text-xs text-slate-400">Elegir</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const CompareLanding = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pais" | "ciudad">("pais");
  const [selectionA, setSelectionA] = useState<CompareEntity | null>(null);
  const [selectionB, setSelectionB] = useState<CompareEntity | null>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");

  const entities = useMemo(
    () => (activeTab === "pais" ? getCountryEntities() : getCityEntities()),
    [activeTab]
  );

  const isInvalidMatch =
    selectionA && selectionB ? selectionA.slug === selectionB.slug : false;

  const handleCompare = () => {
    if (!selectionA || !selectionB || isInvalidMatch) return;
    router.push(`/comparar/${activeTab}/${selectionA.slug}-vs-${selectionB.slug}`);
  };

  const resetSelection = (setter: (value: CompareEntity | null) => void) => {
    setter(null);
  };

  return (
    <div className="container-page space-y-10 py-12">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Comparaciones editoriales
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Comparar países y ciudades
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Selecciona dos destinos y compara índices referenciales derivados de nuestros rankings
          internos.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {[
            { id: "pais", label: "Países" },
            { id: "ciudad", label: "Ciudades" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as "pais" | "ciudad");
                setSelectionA(null);
                setSelectionB(null);
                setQueryA("");
                setQueryB("");
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab.id
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CompareSelector
            id="compare-a"
            label="Selecciona A"
            entities={entities}
            query={queryA}
            onQueryChange={(value) => {
              setQueryA(value);
              resetSelection(setSelectionA);
            }}
            selectedSlug={selectionA?.slug ?? ""}
            onSelect={(entity) => {
              setSelectionA(entity);
              setQueryA(entity.name);
            }}
          />
          <CompareSelector
            id="compare-b"
            label="Selecciona B"
            entities={entities}
            query={queryB}
            onQueryChange={(value) => {
              setQueryB(value);
              resetSelection(setSelectionB);
            }}
            selectedSlug={selectionB?.slug ?? ""}
            onSelect={(entity) => {
              setSelectionB(entity);
              setQueryB(entity.name);
            }}
          />
        </div>

        {isInvalidMatch ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
            Selecciona dos opciones distintas para comparar.
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleCompare}
          disabled={!selectionA || !selectionB || isInvalidMatch}
          className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Comparar ahora
        </button>
      </section>
    </div>
  );
};
