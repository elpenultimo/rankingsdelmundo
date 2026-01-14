import Link from "next/link";
import { rankingYears, regionKeys } from "../data/taxonomy";
import { regionLabels } from "../lib/regions";

export const RankingExplore = ({ slug }: { slug: string }) => (
  <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Explorar por región
      </p>
      <div className="flex flex-wrap gap-2">
        {regionKeys.map((region) => (
          <Link
            key={region}
            href={`/ranking/${slug}/region/${region}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            {regionLabels[region]}
          </Link>
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Explorar por año</p>
      <div className="flex flex-wrap gap-2">
        {rankingYears.map((year) => (
          <Link
            key={year}
            href={`/ranking/${slug}/anio/${year}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
