import { notFound } from "next/navigation";
import Link from "next/link";
import { RelatedRankings } from "../../../components/RelatedRankings";
import { getEntities, getEntityBySlug } from "../../../data/entities";
import { rankings } from "../../../data/rankings";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../../lib/seo";

export const generateStaticParams = () =>
  getEntities("pais").map((entity) => ({ slug: entity.slug }));

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const entity = getEntityBySlug("pais", params.slug);
  if (!entity) return {};

  return buildMetadata({
    title: `${entity.name} en rankings | Rankings del Mundo`,
    description: `Explora en qué rankings aparece ${entity.name} y descubre comparativas relacionadas.`,
    path: `/pais/${entity.slug}`
  });
};

export default function CountryPage({ params }: { params: { slug: string } }) {
  const entity = getEntityBySlug("pais", params.slug);
  if (!entity) {
    notFound();
  }

  const rankingList = entity.rankings;
  const categorySet = new Set(rankingList.map((ranking) => ranking.category));
  const related = rankings.filter(
    (ranking) => !rankingList.find((entry) => entry.slug === ranking.slug) && categorySet.has(ranking.category)
  );

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Países", url: `${siteConfig.url}/paises` },
    { name: entity.name, url: `${siteConfig.url}/pais/${entity.slug}` }
  ]);

  return (
    <div className="container-page space-y-10 py-12">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">País</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{entity.name}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Este perfil editorial reúne los rankings donde aparece {entity.name}. Los datos son
          comparativos y no sustituyen reportes oficiales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Aparece en estos rankings</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {rankingList.map((ranking) => (
            <Link key={ranking.slug} href={`/ranking/${ranking.slug}`} className="card p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {ranking.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{ranking.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Rankings relacionados</h2>
        <RelatedRankings rankings={related.slice(0, 6)} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
