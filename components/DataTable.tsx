import Link from "next/link";
import type { RankingItem } from "../data/rankings";

export const DataTable = ({
  items,
  getItemLink
}: {
  items: RankingItem[];
  getItemLink?: (item: RankingItem) => string | null;
}) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
    <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
      <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <tr>
          <th className="px-4 py-3">Posición</th>
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Valor</th>
          <th className="px-4 py-3">Nota</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
        {items.map((item) => {
          const link = getItemLink?.(item);
          return (
            <tr key={`${item.rank}-${item.name}`} className="hover:bg-slate-50 dark:hover:bg-slate-900">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                {item.rank}
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
                {link ? (
                  <Link href={link} className="font-semibold text-brand-600 hover:underline">
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{item.value}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{item.note}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
