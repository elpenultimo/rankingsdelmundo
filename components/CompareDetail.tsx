import Link from "next/link";
import { RelatedRankings } from "./RelatedRankings";
import type { Ranking } from "../data/rankings";

export type ComparisonRow = {
  key: string;
  label: string;
  aValue?: number | string;
  bValue?: number | string;
  betterWhen?: "lower" | "higher";
};

type CompareDetailProps = {
  entityTypeLabel: string;
  entityA: { name: string; slug: string };
  entityB: { name: string; slug: string };
  introText: string;
  summaryText: string;
  rows: ComparisonRow[];
  rankingsA: Ranking[];
  rankingsB: Ranking[];
  relatedRankings: Ranking[];
  faq: { q: string; a: string }[];
  breadcrumbs: object;
  faqSchema: object;
  itemListSchema: object;
};

const formatMetricValue = (value?: number | string) => {
  if (value === undefined) return "—";
  if (typeof value === "number") return value.toFixed(1);
  return value;
};

const resolveWinner = (
  row: ComparisonRow,
  entityA: CompareDetailProps["entityA"],
  entityB: CompareDetailProps["entityB"]
) => {
  if (typeof row.aValue !== "number" || typeof row.bValue !== "number") return "—";
  if (row.aValue === row.bValue) return "Empate";

  const betterWhen = row.betterWhen ?? "higher";
  const isALower = row.aValue < row.bValue;
  const isAHigher = row.aValue > row.bValue;
  const winner =
    betterWhen === "lower" ? (isALower ? entityA.name : entityB.name) : isAHigher ? entityA.name : entityB.name;
  const diff = Math.abs(row.aValue - row.bValue).toFixed(1);
  return `${winner} (+${diff})`;
};

export const CompareDetail = ({
  entityTypeLabel,
  entityA,
  entityB,
  introText,
  summaryText,
  rows,
  rankingsA,
  rankingsB,
  relatedRankings,
  faq,
  breadcrumbs,
  faqSchema,
  itemListSchema
}: CompareDetailProps) => (
  <div className="container-page space-y-10 py-12">
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
        Comparativa de {entityTypeLabel.toLowerCase()}
      </p>
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Comparar {entityA.name} vs {entityB.name}
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">{introText}</p>
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-slate-700 dark:border-brand-900/40 dark:bg-brand-900/20 dark:text-slate-200">
        <p className="font-semibold text-brand-700 dark:text-brand-100">Resumen rápido</p>
        <p className="mt-1">{summaryText}</p>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="section-title">Comparativa de métricas</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-200">Métrica</th>
              <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-200">{entityA.name}</th>
              <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-200">{entityB.name}</th>
              <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-200">Mejor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{row.label}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
                  {formatMetricValue(row.aValue)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
                  {formatMetricValue(row.bValue)}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {resolveWinner(row, entityA, entityB)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Las métricas son índices referenciales derivados de rankings internos y no reemplazan
        fuentes oficiales.
      </p>
    </section>

    <section className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h2 className="section-title">En qué rankings aparece {entityA.name}</h2>
        <div className="grid gap-3">
          {rankingsA.map((ranking) => (
            <Link key={ranking.slug} href={`/ranking/${ranking.slug}`} className="card p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {ranking.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{ranking.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="section-title">En qué rankings aparece {entityB.name}</h2>
        <div className="grid gap-3">
          {rankingsB.map((ranking) => (
            <Link key={ranking.slug} href={`/ranking/${ranking.slug}`} className="card p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {ranking.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{ranking.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="section-title">Rankings relacionados</h2>
      <RelatedRankings rankings={relatedRankings} />
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        ¿Quieres crear otra comparación?{" "}
        <Link href="/comparar" className="font-semibold text-brand-600">
          Volver al comparador
        </Link>
        .
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="section-title">Preguntas frecuentes</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {faq.map((item) => (
          <div key={item.q} className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
          </div>
        ))}
      </div>
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
