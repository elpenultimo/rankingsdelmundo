import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedRankings } from "../../../components/RelatedRankings";
import { getEntityBySlug, getEntities } from "../../../lib/entities";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../../lib/seo";
import { rankings, type Ranking } from "../../../data/rankings";

export const generateStaticParams = () =>
  getEntities("pais").map((entity) => ({ slug: entity.slug }));

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const entity = getEntityBySlug("pais", params.slug);
  if (!entity) return {};

  return buildMetadata({
    title: `${entity.name} | Países en rankings`,
    description: `Explora rankings donde aparece ${entity.name} y descubre comparativas relacionadas.`,
    path: `/pais/${entity.slug}`
  });
};

export default function CountryPage({ params }: { params: { slug: string } }) {
  const entity = getEntityBySlug("pais", params.slug);

  if (!entity) {
    notFound();
  }

  const relatedRankings = Array.from(
    new Set(
      entity.rankings
        .flatMap((ranking) => ranking.related)
        .map((slug) => rankings.find((item) => item.slug === slug))
        .filter((item): item is Ranking => Boolean(item))
    )
  );

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Países", url: `${siteConfig.url}/paises` },
    { name: entity.name, url: `${siteConfig.url}/pais/${entity.slug}` }
  ]);

  return (
    <div className="container-page space-y-10 py-12">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Países", href: "/paises" },
          { label: entity.name, href: `/pais/${entity.slug}` }
        ]}
      />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{entity.name}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Resumen editorial con rankings donde aparece {entity.name} y comparativas relacionadas.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Aparece en estos rankings</h2>
        <RelatedRankings rankings={entity.rankings} />
      </section>

      {relatedRankings.length > 0 && (
        <section className="space-y-4">
          <h2 className="section-title">Rankings relacionados</h2>
          <RelatedRankings rankings={relatedRankings} />
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
