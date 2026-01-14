import { EntityExplorer } from "../../components/EntityExplorer";
import { getEntities } from "../../data/entities";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Países destacados",
  description: "Listado de países presentes en los rankings con enlaces a sus apariciones.",
  path: "/paises"
});

export default function CountriesPage() {
  const countries = getEntities("pais");

  return (
    <div className="container-page space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Entidades</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Países</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Explora los países que aparecen en nuestros rankings editoriales y accede a sus
          comparativas.
        </p>
      </div>
      <EntityExplorer entities={countries} type="pais" />
    </div>
  );
}
