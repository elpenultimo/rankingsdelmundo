"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCityEntities, getCountryEntities } from "../../lib/compare";
import { isCompareMode, type CompareMode } from "../../lib/url";

const variantOptions = [
  { value: "default", label: "Normal" },
  { value: "compact", label: "Compacto" }
];

const themeOptions = [
  { value: "auto", label: "Automático" },
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" }
];

const parseVariant = (value: string | null) =>
  value && variantOptions.some((option) => option.value === value) ? value : "default";

const parseTheme = (value: string | null) =>
  value && themeOptions.some((option) => option.value === value) ? value : "auto";

export const EmbedGeneratorClient = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<CompareMode>("pais");
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [variant, setVariant] = useState("default");
  const [theme, setTheme] = useState("auto");
  const didInit = useRef(false);

  const countryEntities = useMemo(() => getCountryEntities(), []);
  const cityEntities = useMemo(() => getCityEntities(), []);

  const entities = mode === "pais" ? countryEntities : cityEntities;

  useEffect(() => {
    const nextMode = isCompareMode(searchParams.get("mode")) ? (searchParams.get("mode") as CompareMode) : "pais";
    const nextA = searchParams.get("a") ?? "";
    const nextB = searchParams.get("b") ?? "";
    const nextVariant = parseVariant(searchParams.get("variant"));
    const nextTheme = parseTheme(searchParams.get("theme"));

    if (!didInit.current) {
      setMode(nextMode);
      setSelectionA(nextA);
      setSelectionB(nextB);
      setVariant(nextVariant);
      setTheme(nextTheme);
      didInit.current = true;
      return;
    }

    if (mode !== nextMode) setMode(nextMode);
    if (selectionA !== nextA) setSelectionA(nextA);
    if (selectionB !== nextB) setSelectionB(nextB);
    if (variant !== nextVariant) setVariant(nextVariant);
    if (theme !== nextTheme) setTheme(nextTheme);
  }, [mode, searchParams, selectionA, selectionB, theme, variant]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (mode !== "pais") params.set("mode", mode);
    if (selectionA) params.set("a", selectionA);
    if (selectionB) params.set("b", selectionB);
    if (variant !== "default") params.set("variant", variant);
    if (theme !== "auto") params.set("theme", theme);

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [mode, pathname, router, searchParams, selectionA, selectionB, theme, variant]);

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (selectionA) params.set("a", selectionA);
    if (selectionB) params.set("b", selectionB);
    params.set("variant", variant);
    params.set("theme", theme);
    const query = params.toString();
    return `${pathname}?${query}`;
  }, [mode, pathname, selectionA, selectionB, theme, variant]);

  const iframeCode = `<iframe src="${embedUrl}" width="480" height="320" style="border:0" loading="lazy"></iframe>`;

  return (
    <div className="container-page space-y-8 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Embed</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Generador de embed
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Configura la comparación y copia el código para integrarlo en tu sitio.
        </p>
      </header>

      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Modo</span>
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as CompareMode)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="pais">País</option>
              <option value="ciudad">Ciudad</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Variante</span>
            <select
              value={variant}
              onChange={(event) => setVariant(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {variantOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Entidad A
            </span>
            <select
              value={selectionA}
              onChange={(event) => setSelectionA(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="">Selecciona…</option>
              {entities.map((entity) => (
                <option key={entity.slug} value={entity.slug}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Entidad B
            </span>
            <select
              value={selectionB}
              onChange={(event) => setSelectionB(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="">Selecciona…</option>
              {entities.map((entity) => (
                <option key={entity.slug} value={entity.slug}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tema</span>
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {themeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            URL del embed
          </span>
          <code className="break-all rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {embedUrl}
          </code>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Código iframe
          </span>
          <code className="break-all rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {iframeCode}
          </code>
        </div>
      </div>
    </div>
  );
};
