import Link from "next/link";
import { RankingsExplorer } from "../../components/RankingsExplorer";
import { rankings } from "../../data/rankings";
import { rankingYears, regionKeys } from "../../data/taxonomy";
import { categories, categoryKeys } from "../../lib/categories";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Rankings globales",
  description: "Explora todos los rankings disponibles y filtra por categoría.",
  path: "/rankings"
});

export default function RankingsPage({
  searchParams
}: {
  searchParams?: {
    cat?: string;
    region?: string;
    year?: string;
    q?: string;
    sort?: string;
  };
}) {
  const initialCategory = searchParams?.cat;
  const initialRegion = searchParams?.region;
  const initialYear = searchParams?.year;
  const initialQuery = searchParams?.q ?? "";
  const initialSort = searchParams?.sort;

  return (
    <div className="container-page space-y-8 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Explorar por categoría
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Visita los hubs temáticos para navegar rankings y comparaciones relacionadas.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryKeys.map((categoryKey) => (
              <Link
                key={categoryKey}
                href={`/categoria/${categoryKey}`}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
              >
                {categories[categoryKey].label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Listado</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Todos los rankings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Filtra por categoría y encuentra comparativas actualizadas con metodología clara.
        </p>
      </div>
      <RankingsExplorer
        rankings={rankings}
        initialCategory={
          initialCategory === "paises" ||
          initialCategory === "ciudades" ||
          initialCategory === "dinero" ||
          initialCategory === "clima" ||
          initialCategory === "vida"
            ? initialCategory
            : "todas"
        }
        initialRegion={
          initialRegion && regionKeys.includes(initialRegion as (typeof regionKeys)[number])
            ? (initialRegion as (typeof regionKeys)[number])
            : "todas"
        }
        initialYear={
          initialYear && rankingYears.includes(initialYear as (typeof rankingYears)[number])
            ? (initialYear as (typeof rankingYears)[number])
            : "todas"
        }
        initialQuery={initialQuery}
        initialSort={initialSort === "alpha" || initialSort === "updated" ? initialSort : "relevance"}
      />
    </div>
  );
}
