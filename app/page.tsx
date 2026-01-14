import Link from "next/link";
import { FeaturedRankings } from "../components/FeaturedRankings";
import { TrackView } from "../components/TrackView";
import { TrendingList } from "../components/TrendingList";
import { featuredRankings } from "../data/rankings";
import { categories, categoryKeys } from "../lib/categories";
import { getMostViewedRankings, getTrendingCompares, getTrendingRankings } from "../lib/metrics/trending";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Rankings globales en español",
  description:
    "Explora rankings globales sobre países, ciudades, clima, dinero y calidad de vida con foco editorial.",
  path: "/"
});

export default async function HomePage() {
  const [trendingRankings, trendingCompares, mostViewed] = await Promise.all([
    getTrendingRankings(7, 6),
    getTrendingCompares(7, 4),
    getMostViewedRankings(30, 8)
  ]);

  return (
    <div className="space-y-16 py-12">
      <TrackView scope="home" slug="home" />
      <section className="container-page">
        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Rankings globales en español
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white">
              Descubre rankings confiables para entender cómo evoluciona el mundo.
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Curaduría editorial con datos públicos. Filtra por categorías y explora tendencias en
              países, ciudades, clima, economía y calidad de vida.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rankings"
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-500"
              >
                Ver rankings
              </Link>
              <Link
                href="#categorias"
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
              >
                Explorar categorías
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Actualizaciones claras</p>
              <p>Rankings revisados trimestralmente con metodología transparente.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Enfoque editorial</p>
              <p>Datos explicados en un lenguaje simple y útil para tomar decisiones.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Búsqueda rápida</p>
              <p>Encuentra rankings por texto y explora relacionados fácilmente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Rankings destacados</h2>
          <Link href="/rankings" className="link-muted">
            Ver todos
          </Link>
        </div>
        <FeaturedRankings rankings={featuredRankings} />
      </section>

      {(trendingRankings.length || trendingCompares.length) && (
        <section className="container-page space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              🔥 Trending esta semana
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Rankings y comparaciones con más actividad en los últimos 7 días.
            </p>
          </div>
          {trendingRankings.length ? (
            <TrendingList title="Rankings en tendencia" items={trendingRankings} columns={2} />
          ) : null}
          {trendingCompares.length ? (
            <TrendingList title="Comparaciones destacadas" items={trendingCompares} columns={2} />
          ) : null}
        </section>
      )}

      {mostViewed.length ? (
        <section className="container-page space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              📈 Más vistos (30 días)
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Los rankings más consultados del último mes.
            </p>
          </div>
          <TrendingList title="Rankings más vistos" items={mostViewed} columns={2} />
        </section>
      ) : null}

      <section id="categorias" className="container-page space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Explora por categorías</h2>
          <Link href="/categorias" className="link-muted">
            Ver todas
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryKeys.map((categoryKey) => (
            <Link
              key={categoryKey}
              href={`/categoria/${categoryKey}`}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {categories[categoryKey].label}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {categories[categoryKey].description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center dark:border-brand-900/40 dark:bg-brand-900/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          ¿Listo para explorar más rankings?
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Accede a nuestras comparativas completas y descubre tendencias globales.
        </p>
        <Link
          href="/rankings"
          className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Explorar rankings
        </Link>
      </section>
    </div>
  );
}
