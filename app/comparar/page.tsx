import { Suspense } from "react";
import { CompareLanding } from "../../components/CompareLanding";
import { buildMetadata } from "../../lib/seo";

export const generateMetadata = async () =>
  buildMetadata({
    title: "Comparar países y ciudades | Rankings del Mundo",
    description:
      "Compara países y ciudades con métricas referenciales de costo de vida, seguridad, calidad de vida y más.",
    path: "/comparar"
  });

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="container-page py-12 text-sm text-slate-500">Cargando…</div>}>
      <CompareLanding />
    </Suspense>
  );
}
