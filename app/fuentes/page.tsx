import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Fuentes y metodología | Rankings del Mundo",
  description:
    "Transparencia sobre fuentes públicas y metodología editorial usada en Rankings del Mundo.",
  path: "/fuentes"
});

const sources = [
  "Global Peace Index (seguridad)",
  "World Bank / UN Data (macro, cuando aplica)",
  "Numbeo / Expatistan (costo de vida como referencia)",
  "Our World in Data (contaminación, clima y salud ambiental)",
  "Wikipedia (solo como apoyo contextual cuando se requiere contexto histórico)"
];

export default function FuentesPage() {
  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Fuentes", url: `${siteConfig.url}/fuentes` }
  ]);

  return (
    <div className="container-page space-y-10 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Transparencia editorial
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Fuentes y metodología
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Los rankings publicados en Rankings del Mundo son índices referenciales construidos a
          partir de compilación editorial de fuentes públicas. No representan datos oficiales ni
          sustituyen reportes gubernamentales.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="section-title">Cómo usamos las fuentes</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Revisamos fuentes públicas, agregamos señales comparables y normalizamos la información
          para ofrecer una lectura coherente. El objetivo es orientar tendencias generales; cada
          ranking puede variar por año, contexto económico o cambios locales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Familias de fuentes consultadas</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          La inclusión de una fuente no implica uso directo de sus datos originales; se utiliza como
          referencia editorial para construir índices comparativos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Aviso de responsabilidad</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Estos rankings son orientativos. Recomendamos contrastar con fuentes oficiales y estudios
          locales antes de tomar decisiones personales o profesionales.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
