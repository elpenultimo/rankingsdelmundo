"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCityEntities, getCountryEntities } from "../lib/compare";
import { isCompareMode, type CompareMode } from "../lib/url";
import { siteConfig } from "../lib/seo";

const VARIANT_OPTIONS = ["compact", "full"] as const;
const THEME_OPTIONS = ["auto", "light", "dark"] as const;

type EmbedVariant = (typeof VARIANT_OPTIONS)[number];
type EmbedTheme = (typeof THEME_OPTIONS)[number];

const getHeightSuggestion = (variant: EmbedVariant) => (variant === "compact" ? 260 : 520);

const clampVariant = (value?: string | null): EmbedVariant =>
  value === "full" || value === "compact" ? value : "compact";

const clampTheme = (value?: string | null): EmbedTheme =>
  value === "light" || value === "dark" || value === "auto" ? value : "auto";

export const EmbedGenerator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<CompareMode>("pais");
  const [variant, setVariant] = useState<EmbedVariant>("compact");
  const [theme, setTheme] = useState<EmbedTheme>("auto");
  const [entityA, setEntityA] = useState<string>("");
  const [entityB, setEntityB] = useState<string>("");
  const [height, setHeight] = useState<number>(getHeightSuggestion("compact"));
  const [copied, setCopied] = useState(false);

  const countryEntities = useMemo(() => getCountryEntities(), []);
  const cityEntities = useMemo(() => getCityEntities(), []);

  const entities = mode === "pais" ? countryEntities : cityEntities;

  const selectionA = entities.find((entity) => entity.slug === entityA) ?? null;
  const selectionB = entities.find((entity) => entity.slug === entityB) ?? null;

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    const nextMode = isCompareMode(modeParam) ? modeParam : "pais";
    const nextVariant = clampVariant(searchParams.get("variant"));
    const nextTheme = clampTheme(searchParams.get("theme"));
    const aParam = searchParams.get("a") ?? "";
    const bParam = searchParams.get("b") ?? "";

    setMode(nextMode);
    setVariant(nextVariant);
    setTheme(nextTheme);
    setEntityA(aParam);
    setEntityB(bParam);
    setHeight(getHeightSuggestion(nextVariant));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (entityA) params.set("a", entityA);
    if (entityB) params.set("b", entityB);
    if (variant) params.set("variant", variant);
    if (theme) params.set("theme", theme);
    const nextQuery = params.toString();
    router.replace(nextQuery ? `/embed?${nextQuery}` : "/embed", { scroll: false });
  }, [entityA, entityB, mode, router, theme, variant]);

  const isSameSelection = entityA && entityB && entityA === entityB;

  const embedPath =
    selectionA && selectionB && !isSameSelection
      ? `${siteConfig.url}/embed/${mode}/${selectionA.slug}-vs-${selectionB.slug}?variant=${variant}&theme=${theme}`
      : "";

  const snippet = embedPath
    ? `<iframe\n  src="${embedPath}"\n  width="100%"\n  height="${height}"\n  style="border:0;border-radius:16px;overflow:hidden"\n  loading="lazy"\n  referrerpolicy="no-referrer-when-downgrade"\n></iframe>`
    : "";

  const handleCopy = async () => {
    if (!snippet) return;
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-page space-y-8 py-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Embed widget</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Incrusta comparaciones en tu sitio
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Genera un iframe listo para copiar con tema y tamaño configurables. Compatible con
          dispositivos móviles y escritorios.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)]">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Modo
            </label>
            <div className="flex gap-3">
              {["pais", "ciudad"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option as CompareMode)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    mode === option
                      ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-600 dark:bg-brand-900/30 dark:text-brand-100"
                      : "border-slate-200 text-slate-600 hover:border-brand-200 dark:border-slate-800 dark:text-slate-300"
                  }`}
                >
                  {option === "pais" ? "País" : "Ciudad"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selecciona A
              </label>
              <select
                value={entityA}
                onChange={(event) => setEntityA(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Elige una opción</option>
                {entities.map((entity) => (
                  <option key={entity.slug} value={entity.slug}>
                    {entity.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selecciona B
              </label>
              <select
                value={entityB}
                onChange={(event) => setEntityB(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Elige una opción</option>
                {entities.map((entity) => (
                  <option key={entity.slug} value={entity.slug}>
                    {entity.name}
                  </option>
                ))}
              </select>
            </div>
            {isSameSelection ? (
              <p className="text-xs font-semibold text-rose-500">Selecciona opciones distintas.</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Variante
              </label>
              <select
                value={variant}
                onChange={(event) => setVariant(event.target.value as EmbedVariant)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                {VARIANT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option === "compact" ? "Compact" : "Full"}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">Altura sugerida: {getHeightSuggestion(variant)}px</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tema
              </label>
              <select
                value={theme}
                onChange={(event) => setTheme(event.target.value as EmbedTheme)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                {THEME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option === "auto" ? "Automático" : option === "light" ? "Claro" : "Oscuro"}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">Auto respeta prefers-color-scheme.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Width
              </label>
              <input
                value="100%"
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900"
              />
              <p className="text-xs text-slate-500">Recomendado: 100% del contenedor.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Height
              </label>
              <input
                type="number"
                min={200}
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
              <p className="text-xs text-slate-500">Puedes ajustar si necesitas más espacio.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preview</h2>
              {copied ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ¡Copiado!
                </span>
              ) : null}
            </div>
            <div className="mt-4">
              {embedPath ? (
                <iframe
                  title="Embed preview"
                  src={embedPath}
                  width="100%"
                  height={height}
                  style={{ border: 0, borderRadius: 16, overflow: "hidden" }}
                  loading="lazy"
                />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-700">
                  Selecciona dos opciones para ver el preview.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Código para embeber
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Usa la altura sugerida para evitar scroll interno.
            </p>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <pre className="whitespace-pre-wrap break-all">{snippet || "Selecciona opciones para generar el iframe."}</pre>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!snippet}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Copiar código
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
