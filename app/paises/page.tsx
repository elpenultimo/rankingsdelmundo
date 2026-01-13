import { EntityExplorer } from "../../components/EntityExplorer";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { getEntities } from "../../lib/entities";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Países | Rankings del Mundo",
  description: "Explora fichas de países mencionados en nuestros rankings y descubre en qué listados aparecen.",
  path: "/paises"
});

export default function CountriesPage() {
  const countries = getEntities("pais");

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Países", url: `${siteConfig.url}/paises` }
  ]);

  return (
    <div className="container-page space-y-8 py-12">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Países", href: "/paises" }]} />
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Directorio</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Países</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Encuentra cada país mencionado en nuestros rankings y accede a las comparativas donde aparece.
        </p>
      </div>
      <EntityExplorer entities={countries} basePath="/pais" placeholder="Buscar país" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
