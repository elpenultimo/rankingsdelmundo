import Link from "next/link";
import type { Ranking } from "../data/rankings";
import { CategoryChip } from "./CategoryChips";

export const RankingCard = ({ ranking }: { ranking: Ranking }) => (
  <article className="card flex h-full flex-col gap-4 p-6">
    <div className="flex items-start justify-between gap-4">
      <CategoryChip category={ranking.category} />
      <span className="text-xs text-slate-400">Actualizado {ranking.updatedAt}</span>
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{ranking.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{ranking.description}</p>
    </div>
    <div className="mt-auto">
      <Link
        href={`/ranking/${ranking.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-300"
      >
        Ver ranking
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  </article>
);
