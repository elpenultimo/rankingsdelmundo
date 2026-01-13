import Link from "next/link";
import type { Ranking, RankingItem, RankingYear } from "../data/rankings";
import { regions, type RegionKey } from "../data/geo";
import { CategoryChip } from "./CategoryChips";
import { DataTable } from "./DataTable";
import { RelatedRankings } from "./RelatedRankings";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { getEntitySlug } from "../lib/entities";

export const RankingDetail = ({
  ranking,
  items,
  title,
  description,
  breadcrumbs,
  related,
  segmentIntro,
  segmentNote,
  activeRegion,
  activeYear,
  availableRegions,
  availableYears
}: {
  ranking: Ranking;
  items: RankingItem[];
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  related: Ranking[];
  segmentIntro?: string[];
  segmentNote?: string;
  activeRegion?: RegionKey;
  activeYear?: RankingYear;
  availableRegions: RegionKey[];
  availableYears: RankingYear[];
}) => {
  const nameLinkResolver = (item: RankingItem) => {
    if (ranking.category === "paises") {
      const slug = getEntitySlug("pais", item.name);
      return slug ? `/pais/${slug}` : null;
    }
    if (ranking.category === "ciudades") {
      const slug = getEntitySlug("ciudad", item.name);
      return slug ? `/ciudad/${slug}` : null;
    }
    return null;
  };

  return (
    <div className="container-page space-y-10 py-12">
      <section className="space-y-4">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-wrap items-center gap-3">
          <CategoryChip category={ranking.category} />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Actualizado {ranking.updatedAt}
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{description}</p>
        {segmentIntro && (
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {segmentIntro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Metodología</p>
            <p className="mt-2">{ranking.methodology}</p>
            {segmentNote && <p className="mt-2 text-xs text-slate-500">{segmentNote}</p>}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fuente</p>
            <p className="mt-2">{ranking.sourceNote}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Tabla del ranking</h2>
        <DataTable items={items} getItemLink={nameLinkResolver} />
        <div className="space-y-4">
          {availableRegions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Explorar por región
              </p>
              <div className="flex flex-wrap gap-2">
                {availableRegions.map((region) => {
                  const label = regions.find((item) => item.key === region)?.label ?? region;
                  const href = activeYear
                    ? `/ranking/${ranking.slug}/region/${region}/anio/${activeYear}`
                    : `/ranking/${ranking.slug}/region/${region}`;
                  return (
                    <Link
                      key={region}
                      href={href}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        activeRegion === region
                          ? "border-brand-500 bg-brand-600 text-white"
                          : "border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Explorar por año
            </p>
            <div className="flex flex-wrap gap-2">
              {availableYears.map((year) => {
                const href = activeRegion
                  ? `/ranking/${ranking.slug}/region/${activeRegion}/anio/${year}`
                  : `/ranking/${ranking.slug}/anio/${year}`;
                return (
                  <Link
                    key={year}
                    href={href}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      activeYear === year
                        ? "border-brand-500 bg-brand-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {year}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {ranking.faq.map((item) => (
            <div key={item.q} className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Rankings relacionados</h2>
        <RelatedRankings rankings={related} />
      </section>

      <section className="rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center dark:border-brand-900/40 dark:bg-brand-900/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Explora más rankings
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Descubre nuevas comparativas y encuentra tendencias globales.
        </p>
        <Link
          href="/rankings"
          className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Ver todos los rankings
        </Link>
      </section>
    </div>
  );
};
