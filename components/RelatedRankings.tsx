import Link from "next/link";
import type { Ranking } from "../data/rankings";
import { CategoryLabel } from "./CategoryChips";

export const RelatedRankings = ({ rankings }: { rankings: Ranking[] }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {rankings.map((ranking) => (
      <Link
        key={ranking.slug}
        href={`/ranking/${ranking.slug}`}
        className="card flex h-full flex-col gap-2 p-4"
      >
        <div className="flex items-center justify-between">
          <CategoryLabel category={ranking.category} />
          <span className="text-xs text-slate-400">{ranking.updatedAt}</span>
        </div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{ranking.title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">{ranking.description}</p>
      </Link>
    ))}
  </div>
);
