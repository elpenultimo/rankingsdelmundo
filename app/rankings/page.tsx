import { RankingsExplorer } from "../../components/RankingsExplorer";
import { rankings, type RankingCategory, type RankingRegion, type RankingYear } from "../../data/rankings";
import { buildMetadata } from "../../lib/seo";
import { isRegionKey } from "../../data/geo";
import { rankingYears } from "../../data/rankings";

export const metadata = buildMetadata({
  title: "Rankings globales",
  description: "Explora todos los rankings disponibles, filtra por categoría, región o año y ordena los resultados.",
  path: "/rankings"
});

const categoryOptions: RankingCategory[] = ["paises", "ciudades", "dinero", "clima", "vida"];
const orderOptions = ["relevancia", "alfabetico", "actualizado"] as const;

type OrderKey = (typeof orderOptions)[number];

type RankingsSearchParams = {
  cat?: string;
  categoria?: string;
  region?: string;
  year?: string;
  order?: string;
  q?: string;
};

export default function RankingsPage({
  searchParams
}: {
  searchParams?: RankingsSearchParams;
}) {
  const categoryParam = searchParams?.cat ?? searchParams?.categoria;
  const regionParam = searchParams?.region;
  const yearParam = searchParams?.year;
  const orderParam = searchParams?.order;
  const queryParam = searchParams?.q ?? "";

  const initialCategory = categoryOptions.includes(categoryParam as RankingCategory)
    ? (categoryParam as RankingCategory)
    : "todas";
  const initialRegion = isRegionKey(regionParam ?? "")
    ? (regionParam as RankingRegion)
    : "todas";
  const initialYear = rankingYears.map(String).includes(yearParam ?? "")
    ? (Number(yearParam) as RankingYear)
    : "todas";
  const initialOrder = orderOptions.includes(orderParam as OrderKey)
    ? (orderParam as OrderKey)
    : "relevancia";

  return (
    <div className="container-page space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Listado</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Todos los rankings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Filtra por categoría, región o año y encuentra comparativas actualizadas con metodología clara.
        </p>
      </div>
      <RankingsExplorer
        rankings={rankings}
        initialFilters={{
          category: initialCategory,
          region: initialRegion,
          year: initialYear,
          order: initialOrder,
          query: queryParam
        }}
      />
    </div>
  );
}
