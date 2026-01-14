import { RankingsExplorer } from "../../components/RankingsExplorer";
import { rankings } from "../../data/rankings";
import { rankingYears, regionKeys } from "../../data/taxonomy";
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
