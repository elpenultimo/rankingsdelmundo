import { EntityExplorer } from "../../components/EntityExplorer";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { getEntities } from "../../lib/entities";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Ciudades | Rankings del Mundo",
  description: "Explora fichas de ciudades mencionadas en nuestros rankings y descubre en qué listados aparecen.",
  path: "/ciudades"
});

export default function CitiesPage() {
  const cities = getEntities("ciudad");

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Ciudades", url: `${siteConfig.url}/ciudades` }
  ]);

  return (
    <div className="container-page space-y-8 py-12">
      <Breadcrumbs
        items={[{ label: "Inicio", href: "/" }, { label: "Ciudades", href: "/ciudades" }]}
      />
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Directorio</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Ciudades</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Encuentra cada ciudad destacada en nuestros rankings y revisa sus apariciones.
        </p>
      </div>
      <EntityExplorer entities={cities} basePath="/ciudad" placeholder="Buscar ciudad" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
