import { Suspense } from "react";
import { EmbedGeneratorClient } from "./EmbedGeneratorClient";

export const dynamic = "force-dynamic";

export default function EmbedPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando…</div>}>
      <EmbedGeneratorClient />
    </Suspense>
  );
}
