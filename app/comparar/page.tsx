import { Suspense } from "react";
import { CompareLanding } from "../../components/CompareLanding";
import { TrendingList } from "../../components/TrendingList";
import { getMostCompared } from "../../lib/metrics/trending";
import { buildMetadata } from "../../lib/seo";

export const generateMetadata = async () =>
  buildMetadata({
    title: "Comparar países y ciudades | Rankings del Mundo",
    description:
      "Compara países y ciudades con métricas referenciales de costo de vida, seguridad, calidad de vida y más.",
    path: "/comparar"
  });

export default async function ComparePage() {
  const mostCompared = await getMostCompared(30, 10);

  return (
    <div className="space-y-10">
      {mostCompared.length ? (
        <section className="container-page pt-12">
          <TrendingList title="Más comparados" items={mostCompared} columns={2} />
        </section>
      ) : null}
      <Suspense fallback={<div className="container-page py-12 text-sm text-slate-500">Cargando…</div>}>
        <CompareLanding />
      </Suspense>
    </div>
  );
}
