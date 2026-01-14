import Link from "next/link";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../lib/seo";
import { topics, topicKeys } from "../../lib/topics";

export const metadata = buildMetadata({
  title: "Temas de rankings | Rankings del Mundo",
  description:
    "Explora hubs temáticos que reúnen rankings, comparaciones y entidades destacadas en un mismo lugar.",
  path: "/temas"
});

const topicList = topicKeys.map((key) => topics[key]);

export default function TopicsIndexPage() {
  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Temas", url: `${siteConfig.url}/temas` }
  ]);

  return (
    <div className="container-page space-y-12 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Guía</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Temas</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Hubs editoriales que combinan rankings, comparaciones y entidades para responder
          búsquedas específicas.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topicList.map((topic) => (
          <Link key={topic.key} href={`/tema/${topic.key}`} className="card p-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span aria-hidden="true">{topic.icon}</span>
              <span className="font-semibold uppercase tracking-wide">{topic.label}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
              Rankings de {topic.label}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{topic.intro}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand-600">
              Ver hub de {topic.label} →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Cómo leer estos rankings
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>
            Usa los rankings para identificar tendencias generales y luego profundiza con fuentes
            locales.
          </li>
          <li>
            Contrasta el tema con comparaciones directas entre países o ciudades para ver diferencias.
          </li>
          <li>
            Recuerda que los índices son referenciales y se basan en compilación editorial.
          </li>
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
