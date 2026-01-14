"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildComparePairs,
  getCityEntities,
  getCountryEntities,
  getTopCities,
  getTopCountries
} from "../lib/compare";
import { CuratedCompareCard } from "./CuratedCompareCard";
import {
  getCuratedCompares,
  resolveCuratedCompare,
  type ResolvedCuratedCompare
} from "../lib/curated-compares";
import { topics, type TopicKey } from "../lib/topics";
import {
  buildCompareDetailPath,
  buildCompareLandingUrl,
  isCompareMode,
  parseCompareSlug,
  type CompareMode
} from "../lib/url";

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
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          const firstMatch = filtered[0];
          if (firstMatch) {
            event.preventDefault();
            onSelect(firstMatch);
          }
        }}
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
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<CompareMode>("pais");
  const [selectionA, setSelectionA] = useState<CompareEntity | null>(null);
  const [selectionB, setSelectionB] = useState<CompareEntity | null>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicKey>("seguridad");
  const didInit = useRef(false);

  const countryEntities = useMemo(() => getCountryEntities(), []);
  const cityEntities = useMemo(() => getCityEntities(), []);

  const entities = useMemo(
    () => (activeTab === "pais" ? countryEntities : cityEntities),
    [activeTab, cityEntities, countryEntities]
  );

  const entityMap = useMemo(() => new Map(entities.map((entity) => [entity.slug, entity])), [
    entities
  ]);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    const nextMode = isCompareMode(modeParam) ? modeParam : "pais";
    const nextEntities = nextMode === "pais" ? countryEntities : cityEntities;
    const aParam = searchParams.get("a");
    const bParam = searchParams.get("b");
    const nextA = aParam ? nextEntities.find((entity) => entity.slug === aParam) ?? null : null;
    const nextB = bParam ? nextEntities.find((entity) => entity.slug === bParam) ?? null : null;

    if (activeTab !== nextMode) {
      setActiveTab(nextMode);
    }

    if ((selectionA?.slug ?? null) !== (nextA?.slug ?? null)) {
      setSelectionA(nextA);
    }

    if ((selectionB?.slug ?? null) !== (nextB?.slug ?? null)) {
      setSelectionB(nextB);
    }

    if (!didInit.current) {
      setQueryA(nextA?.name ?? "");
      setQueryB(nextB?.name ?? "");
      didInit.current = true;
      return;
    }

    if (nextA) {
      setQueryA(nextA.name);
    } else if (selectionA) {
      setQueryA("");
    }

    if (nextB) {
      setQueryB(nextB.name);
    } else if (selectionB) {
      setQueryB("");
    }
  }, [activeTab, cityEntities, countryEntities, searchParams, selectionA, selectionB]);

  useEffect(() => {
    const shouldSync =
      hasUserInteracted ||
      searchParams.has("mode") ||
      searchParams.has("a") ||
      searchParams.has("b");
    if (!shouldSync) return;

    const params = new URLSearchParams();
    if (activeTab !== "pais" || hasUserInteracted || searchParams.has("mode")) {
      params.set("mode", activeTab);
    }
    if (selectionA) params.set("a", selectionA.slug);
    if (selectionB) params.set("b", selectionB.slug);
    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `/comparar?${nextQuery}` : "/comparar", { scroll: false });
    }
  }, [activeTab, hasUserInteracted, router, searchParams, selectionA, selectionB]);

  const isInvalidMatch =
    selectionA && selectionB ? selectionA.slug === selectionB.slug : false;

  const handleCompare = () => {
    if (!selectionA || !selectionB || isInvalidMatch) return;
    router.push(buildCompareDetailPath(activeTab, selectionA.slug, selectionB.slug));
  };

  const handleGenerateLink = () => {
    if (!selectionA || !selectionB || isInvalidMatch) return;
    const path = buildCompareDetailPath(activeTab, selectionA.slug, selectionB.slug);
    const url = `${window.location.origin}${path}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyMessage("Link copiado.");
          window.setTimeout(() => setCopyMessage(""), 2500);
        })
        .catch(() => {
          window.prompt("Copia este link:", url);
        });
      return;
    }
    window.prompt("Copia este link:", url);
  };

  const resetSelection = (
    setter: (value: CompareEntity | null) => void,
    otherSetter?: (value: CompareEntity | null) => void
  ) => {
    setter(null);
    if (otherSetter) {
      otherSetter(null);
    }
  };

  const popularEntities = useMemo(
    () => (activeTab === "pais" ? getTopCountries(8) : getTopCities(8)),
    [activeTab]
  );

  const popularExamples = useMemo(() => {
    const list = activeTab === "pais" ? getTopCountries(10) : getTopCities(10);
    return buildComparePairs(list, 6)
      .map((slug) => {
        const parsed = parseCompareSlug(slug);
        if (!parsed) return null;
        const entityA = entityMap.get(parsed.aSlug);
        const entityB = entityMap.get(parsed.bSlug);
        if (!entityA || !entityB) return null;
        return {
          a: entityA,
          b: entityB,
          label: `${entityA.name} vs ${entityB.name}`
        };
      })
      .filter(Boolean) as Array<{ a: CompareEntity; b: CompareEntity; label: string }>;
  }, [activeTab, entityMap]);

  const handleExampleSelect = (example: { a: CompareEntity; b: CompareEntity }) => {
    setHasUserInteracted(true);
    setActiveTab(activeTab);
    setSelectionA(example.a);
    setSelectionB(example.b);
    setQueryA(example.a.name);
    setQueryB(example.b.name);
    router.replace(
      buildCompareLandingUrl({ mode: activeTab, aSlug: example.a.slug, bSlug: example.b.slug }),
      { scroll: false }
    );
  };

  const handleQuickFill = (entity: CompareEntity) => {
    setHasUserInteracted(true);
    if (!selectionA) {
      setSelectionA(entity);
      setQueryA(entity.name);
      return;
    }
    if (!selectionB) {
      setSelectionB(entity);
      setQueryB(entity.name);
      return;
    }
    setSelectionB(entity);
    setQueryB(entity.name);
  };

  const curatedComparisons = useMemo(
    () =>
      getCuratedCompares()
        .map((compare) => resolveCuratedCompare(compare))
        .filter(Boolean) as ResolvedCuratedCompare[],
    []
  );

  const popularCurated = useMemo(() => {
    const popularCountries = curatedComparisons.filter((item) => item.mode === "pais").slice(0, 8);
    const popularCities = curatedComparisons.filter((item) => item.mode === "ciudad").slice(0, 6);
    return [...popularCountries, ...popularCities];
  }, [curatedComparisons]);

  const topicTabs: TopicKey[] = [
    "seguridad",
    "costo-de-vida",
    "calidad-de-vida",
    "clima",
    "impuestos"
  ];

  const topicRecommendations = useMemo(
    () =>
      curatedComparisons
        .filter((item) => item.mode === activeTab && item.topics.includes(activeTopic))
        .slice(0, 8),
    [activeTab, activeTopic, curatedComparisons]
  );

  const handleSurprise = () => {
    const pool = topicRecommendations.length
      ? topicRecommendations
      : curatedComparisons.filter((item) => item.mode === activeTab);
    if (!pool.length) return;
    const selection = pool[Math.floor(Math.random() * pool.length)];
    router.push(selection.href);
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
                setHasUserInteracted(true);
                setActiveTab(tab.id as CompareMode);
                resetSelection(setSelectionA, setSelectionB);
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
              setHasUserInteracted(true);
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
              setHasUserInteracted(true);
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

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCompare}
            disabled={!selectionA || !selectionB || isInvalidMatch}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Ver comparación
          </button>
          <button
            type="button"
            onClick={handleGenerateLink}
            disabled={!selectionA || !selectionB || isInvalidMatch}
            className="inline-flex items-center justify-center rounded-full border border-brand-200 px-6 py-2 text-sm font-semibold text-brand-600 shadow-sm transition hover:border-brand-300 hover:text-brand-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 dark:border-brand-500/40 dark:text-brand-200"
          >
            Generar link
          </button>
        </div>

        {copyMessage ? <p className="text-xs text-emerald-600">{copyMessage}</p> : null}

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sugerencias rápidas
            </p>
            <div className="flex flex-wrap gap-2">
              {popularEntities.map((entity) => (
                <button
                  key={entity.slug}
                  type="button"
                  onClick={() => handleQuickFill(entity)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  {entity.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Haz clic para completar {selectionA ? "B" : "A"} rápidamente.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ejemplos populares
            </p>
            <div className="flex flex-wrap gap-2">
              {popularExamples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => handleExampleSelect(example)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">🔥 Populares</h2>
          <p className="text-xs text-slate-500">Selección editorial destacada</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {popularCurated.map((compare) => (
            <CuratedCompareCard key={compare.slug} compare={compare} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Recomendadas por tema</h2>
            <p className="text-xs text-slate-500">
              Curadas para {activeTab === "pais" ? "países" : "ciudades"}.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSurprise}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            Sorpréndeme
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {topicTabs.map((topicKey) => (
            <button
              key={topicKey}
              type="button"
              onClick={() => setActiveTopic(topicKey)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                activeTopic === topicKey
                  ? "bg-brand-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {topics[topicKey].label}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {topicRecommendations.map((compare) => (
            <CuratedCompareCard key={compare.slug} compare={compare} />
          ))}
        </div>
      </section>
    </div>
  );
};
