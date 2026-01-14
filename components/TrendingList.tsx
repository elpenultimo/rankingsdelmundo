import Link from "next/link";

type TrendingItem = {
  title: string;
  href: string;
  subtitle?: string;
};

export const TrendingList = ({
  title,
  items,
  columns = 1
}: {
  title: string;
  items: TrendingItem[];
  columns?: 1 | 2 | 3;
}) => {
  if (!items.length) return null;

  const gridClass =
    columns === 3
      ? "grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "grid gap-3 md:grid-cols-2"
        : "grid gap-3";

  return (
    <section className="space-y-4">
      <h2 className="section-title">{title}</h2>
      <div className={gridClass}>
        {items.map((item, index) => (
          <Link key={`${item.href}-${item.title}`} href={item.href} className="card p-4">
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                {item.subtitle ? (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                    {item.subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
