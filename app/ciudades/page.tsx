import { EntityExplorer } from "../../components/EntityExplorer";
import { getEntities } from "../../data/entities";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Ciudades destacadas",
  description: "Listado de ciudades presentes en los rankings con enlaces a sus apariciones.",
  path: "/ciudades"
});

export default function CitiesPage() {
  const cities = getEntities("ciudad");

  return (
    <div className="container-page space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Entidades</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Ciudades</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Encuentra las ciudades destacadas en rankings de seguridad, movilidad y calidad de
          vida.
        </p>
      </div>
      <EntityExplorer entities={cities} type="ciudad" />
    </div>
  );
}
