import Link from "next/link";
import { notFound } from "next/navigation";
import { RankingCard } from "../../../components/RankingCard";
import { featuredRankings, rankings } from "../../../data/rankings";
import { rankingYears, regionKeys } from "../../../data/taxonomy";
import { buildComparePairs, getTopCities, getTopCountries } from "../../../lib/compare";
import {
  categories,
  categoryClusters,
  categoryKeys,
  getCategoryFaq,
  getCategoryIntro,
  getCategoryLabel
} from "../../../lib/categories";
import { buildBreadcrumbs, buildFAQPage, buildMetadata, siteConfig } from "../../../lib/seo";
import { regionLabels } from "../../../lib/regions";
import { topicKeys, topics } from "../../../lib/topics";

const buildHighlightRankings = (category: (typeof categoryKeys)[number]) => {
  const primary = featuredRankings.filter((ranking) => ranking.category === category);
  const sorted = rankings
    .filter((ranking) => ranking.category === category)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const combined: typeof sorted = [];
  const seen = new Set<string>();

  for (const ranking of [...primary, ...sorted]) {
    if (seen.has(ranking.slug)) continue;
    seen.add(ranking.slug);
    combined.push(ranking);
  }

  return combined.slice(0, 10);
};

const buildItemListSchema = (
  categoryLabel: string,
  items: Array<(typeof rankings)[number]>
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Rankings destacados de ${categoryLabel}`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    url: `${siteConfig.url}/ranking/${item.slug}`
  }))
});

export const generateStaticParams = async () => categoryKeys.map((cat) => ({ cat }));

export const generateMetadata = async ({ params }: { params: { cat: string } }) => {
  if (!categoryKeys.includes(params.cat as (typeof categoryKeys)[number])) return {};
  const category = categories[params.cat as keyof typeof categories];
  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/categoria/${params.cat}`
  });
};

export default function CategoryHubPage({ params }: { params: { cat: string } }) {
  if (!categoryKeys.includes(params.cat as (typeof categoryKeys)[number])) {
    notFound();
  }

  const categoryKey = params.cat as (typeof categoryKeys)[number];
  const categoryLabel = getCategoryLabel(categoryKey);
  const categoryIntro = getCategoryIntro(categoryKey);
  const categoryFaq = getCategoryFaq(categoryKey);

  const highlighted = buildHighlightRankings(categoryKey);

  const clusters = categoryClusters[categoryKey] ?? [];
  const rankingBySlug = new Map(rankings.map((ranking) => [ranking.slug, ranking]));
  const clusterSections = clusters
    .map((cluster) => ({
      ...cluster,
      items: cluster.rankings
        .map((slug) => rankingBySlug.get(slug))
        .filter((item): item is (typeof rankings)[number] => Boolean(item))
    }))
    .filter((cluster) => cluster.items.length > 0);

  const isCityCategory = categoryKey === "ciudades";
  const compareType = isCityCategory ? "ciudad" : "pais";
  const topEntities = isCityCategory ? getTopCities(12) : getTopCountries(12);
  const nameBySlug = new Map(topEntities.map((entity) => [entity.slug, entity.name]));
  const comparePairs = buildComparePairs(topEntities, 6);
  const compareLinks = comparePairs
    .map((pair) => {
      const [aSlug, bSlug] = pair.split("-vs-");
      const aName = nameBySlug.get(aSlug);
      const bName = nameBySlug.get(bSlug);
      if (!aName || !bName) return null;
      return {
        slug: pair,
        label: `${aName} vs ${bName}`
      };
    })
    .filter(Boolean) as { slug: string; label: string }[];

  const popularEntities = topEntities.slice(0, 12);
  const otherCategories = categoryKeys.filter((key) => key !== categoryKey);
  const popularTopics = topicKeys.slice(0, 8).map((key) => topics[key]);

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Categorías", url: `${siteConfig.url}/categorias` },
    { name: categoryLabel, url: `${siteConfig.url}/categoria/${categoryKey}` }
  ]);

  const faqSchema = buildFAQPage(categoryFaq);
  const itemListSchema = buildItemListSchema(categoryLabel, highlighted);

  return (
    <div className="container-page space-y-12 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Hub</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Rankings de {categoryLabel}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{categoryIntro}</p>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Filtros rápidos
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Ajusta el listado por región o año para explorar tendencias específicas.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {regionKeys.map((region) => (
                  <Link
                    key={region}
                    href={`/rankings?cat=${categoryKey}&region=${region}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    {regionLabels[region]}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {rankingYears.map((year) => (
                  <Link
                    key={year}
                    href={`/rankings?cat=${categoryKey}&year=${year}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    {year}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Rankings destacados</h2>
          <Link href={`/rankings?cat=${categoryKey}`} className="link-muted">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((ranking) => (
            <RankingCard key={ranking.slug} ranking={ranking} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title">Rankings por tema</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Explora clusters editoriales para profundizar en subtemas específicos.
          </p>
        </div>
        <div className="space-y-6">
          {clusterSections.map((cluster) => (
            <div key={cluster.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {cluster.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {cluster.description}
                </p>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {cluster.items.map((ranking) => (
                  <Link
                    key={ranking.slug}
                    href={`/ranking/${ranking.slug}`}
                    className="card p-4"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {ranking.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {ranking.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Temas populares</h2>
          <Link href="/temas" className="link-muted">
            Ver todos los temas
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic) => (
            <Link
              key={topic.key}
              href={`/tema/${topic.key}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </section>

      {compareLinks.length ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Comparaciones populares</h2>
            <Link href="/comparar" className="link-muted">
              Ver comparador
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {compareLinks.map((link) => (
              <Link key={link.slug} href={`/comparar/${compareType}/${link.slug}`} className="card p-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {link.label}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Comparativa rápida con índices referenciales.
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {categoryKey === "paises" || categoryKey === "ciudades" ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Explorar entidades</h2>
            <Link href={categoryKey === "paises" ? "/paises" : "/ciudades"} className="link-muted">
              Ver listado completo
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularEntities.map((entity) => (
              <Link
                key={entity.slug}
                href={`/${categoryKey === "paises" ? "pais" : "ciudad"}/${entity.slug}`}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
              >
                {entity.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {categoryFaq.map((item) => (
            <div key={item.q} className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center dark:border-brand-900/40 dark:bg-brand-900/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Ver todos los rankings de {categoryLabel}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Accede al listado completo y utiliza filtros por región, año o palabra clave.
        </p>
        <Link
          href={`/rankings?cat=${categoryKey}`}
          className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Explorar rankings
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
          {otherCategories.map((key) => (
            <Link key={key} href={`/categoria/${key}`} className="hover:text-brand-600">
              {getCategoryLabel(key)}
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
