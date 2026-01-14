import Link from "next/link";
import { siteConfig } from "../lib/seo";
import type { EmbedComparisonRow } from "../lib/embed";

export type EmbedVariant = "compact" | "full";

type EmbedCompareProps = {
  entityA: { name: string; slug: string };
  entityB: { name: string; slug: string };
  rows: EmbedComparisonRow[];
  variant: EmbedVariant;
  compareUrl: string;
};

const formatMetricValue = (value?: number | string) => {
  if (value === undefined) return "—";
  if (typeof value === "number") return value.toFixed(1);
  return value;
};

const resolveWinner = (
  row: EmbedComparisonRow,
  entityA: EmbedCompareProps["entityA"],
  entityB: EmbedCompareProps["entityB"]
) => {
  if (typeof row.aValue !== "number" || typeof row.bValue !== "number") return null;
  if (row.aValue === row.bValue) return "Empate";

  const betterWhen = row.betterWhen ?? "higher";
  const isALower = row.aValue < row.bValue;
  const isAHigher = row.aValue > row.bValue;
  const winner =
    betterWhen === "lower" ? (isALower ? entityA.name : entityB.name) : isAHigher ? entityA.name : entityB.name;
  const diff = Math.abs(row.aValue - row.bValue).toFixed(1);
  return `${winner} (+${diff})`;
};

const buildWinnerSummary = (
  rows: EmbedComparisonRow[],
  entityA: EmbedCompareProps["entityA"],
  entityB: EmbedCompareProps["entityB"]
) => {
  let winsA = 0;
  let winsB = 0;
  rows.forEach((row) => {
    if (typeof row.aValue !== "number" || typeof row.bValue !== "number") return;
    if (row.aValue === row.bValue) return;
    const betterWhen = row.betterWhen ?? "higher";
    const isALower = row.aValue < row.bValue;
    const isAHigher = row.aValue > row.bValue;
    const isAWinner = betterWhen === "lower" ? isALower : isAHigher;
    if (isAWinner) {
      winsA += 1;
    } else {
      winsB += 1;
    }
  });

  if (winsA === 0 && winsB === 0) return "Empate";
  if (winsA === winsB) return `Empate ${winsA}-${winsB}`;
  return winsA > winsB
    ? `${entityA.name} gana ${winsA}, ${entityB.name} gana ${winsB}`
    : `${entityB.name} gana ${winsB}, ${entityA.name} gana ${winsA}`;
};

export const EmbedCompare = ({ entityA, entityB, rows, variant, compareUrl }: EmbedCompareProps) => {
  const isCompact = variant === "compact";
  const winnerSummary = buildWinnerSummary(rows, entityA, entityB);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Comparación rápida</p>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
          {entityA.name} vs {entityB.name}
        </h1>
      </div>

      {isCompact ? (
        <div className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <div
                key={row.key}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {row.label}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span>{formatMetricValue(row.aValue)}</span>
                  <span className="text-slate-400">vs</span>
                  <span>{formatMetricValue(row.bValue)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 dark:border-brand-900/40 dark:bg-brand-900/30 dark:text-brand-100">
            {winnerSummary}
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((row) => (
              <div
                key={row.key}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {row.label}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span>{formatMetricValue(row.aValue)}</span>
                  <span className="text-slate-400">vs</span>
                  <span>{formatMetricValue(row.bValue)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-100 text-left dark:bg-slate-900">
                <tr>
                  <th className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">Métrica</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">{entityA.name}</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">{entityB.name}</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 dark:text-slate-200">Mejor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                {rows.map((row) => (
                  <tr key={row.key}>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.label}</td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                      {formatMetricValue(row.aValue)}
                    </td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                      {formatMetricValue(row.bValue)}
                    </td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                      {resolveWinner(row, entityA, entityB) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href={compareUrl}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 transition hover:border-brand-300 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-100"
          >
            Ver comparación completa
          </Link>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Indicadores referenciales basados en rankings internos.</span>
        <a href={siteConfig.url} className="font-semibold text-brand-600">
          Powered by {siteConfig.name}
        </a>
      </div>
    </div>
  );
};
