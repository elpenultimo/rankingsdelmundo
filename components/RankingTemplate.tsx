import Link from "next/link";
import { DataTable } from "./DataTable";
import { RankingExplore } from "./RankingExplore";
import { RelatedRankings } from "./RelatedRankings";
import { CategoryChip } from "./CategoryChips";
import type { Ranking, RankingItem } from "../data/rankings";

export const RankingTemplate = ({
  ranking,
  items,
  pageTitle,
  description,
  introLines,
  methodologyNote,
  related,
  breadcrumbs,
  faqSchema,
  itemListSchema
}: {
  ranking: Ranking;
  items: RankingItem[];
  pageTitle: string;
  description: string;
  introLines?: string[];
  methodologyNote?: string;
  related: Ranking[];
  breadcrumbs: object;
  faqSchema: object;
  itemListSchema: object;
}) => (
  <div className="container-page space-y-10 py-12">
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <CategoryChip category={ranking.category} />
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Actualizado {ranking.updatedAt}
        </span>
      </div>
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{pageTitle}</h1>
      <p className="text-base text-slate-600 dark:text-slate-300">{description}</p>
      {introLines?.length ? (
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {introLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Metodología</p>
          <p className="mt-2">{ranking.methodology}</p>
          {methodologyNote ? <p className="mt-2 text-xs text-slate-500">{methodologyNote}</p> : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fuente</p>
          <p className="mt-2">{ranking.sourceNote}</p>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="section-title">Tabla del ranking</h2>
      <DataTable items={items} category={ranking.category} />
    </section>

    <section className="space-y-4">
      <h2 className="section-title">Explorar segmentaciones</h2>
      <RankingExplore slug={ranking.slug} />
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
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Explora más rankings</h2>
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

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  </div>
);
