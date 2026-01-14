import Link from "next/link";
import type { ResolvedCuratedCompare } from "../lib/curated-compares";
import { topics, type TopicKey } from "../lib/topics";

type CuratedCompareCardProps = {
  compare: ResolvedCuratedCompare;
};

export const CuratedCompareCard = ({ compare }: CuratedCompareCardProps) => {
  const topicLabels = compare.topics.map(
    (topic) => topics[topic as TopicKey]?.label ?? topic
  );

  return (
    <Link href={compare.href} className="card space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
            {compare.mode === "pais" ? "Países" : "Ciudades"}
          </p>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {compare.title}
          </h3>
        </div>
        <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-400/20 dark:text-amber-200">
          Popular
        </span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300">{compare.reason}</p>
      <div className="flex flex-wrap gap-2">
        {topicLabels.map((label) => (
          <span
            key={label}
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {label}
          </span>
        ))}
      </div>
    </Link>
  );
};
