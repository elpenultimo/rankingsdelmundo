import Link from "next/link";
import { buildBreadcrumbs, buildFAQPage, buildMetadata, siteConfig } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Metodología editorial | Rankings del Mundo",
  description:
    "Conoce cómo construimos índices referenciales a partir de compilación editorial de fuentes públicas.",
  path: "/metodologia"
});

const faq = [
  {
    q: "¿Qué es un índice referencial?",
    a: "Es una métrica comparativa construida a partir de indicadores públicos, normalizados para facilitar lectura."
  },
  {
    q: "¿Los rankings son oficiales?",
    a: "No. Son compilaciones editoriales que resumen tendencias y no reemplazan fuentes oficiales."
  },
  {
    q: "¿Cómo se actualizan los rankings?",
    a: "Se revisan cuando hay nuevas fuentes y se actualizan de forma editorial periódica."
  }
];

export default function MetodologiaPage() {
  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Metodología", url: `${siteConfig.url}/metodologia` }
  ]);

  const faqSchema = buildFAQPage(faq);

  return (
    <div className="container-page space-y-10 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Metodología</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Metodología</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Nuestros rankings se basan en índices referenciales construidos con una compilación
          editorial de fuentes públicas. El objetivo es ofrecer comparaciones claras, consistentes y
          fáciles de entender.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="section-title">Cómo trabajamos los datos</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Reunimos indicadores públicos y los normalizamos para compararlos en una escala común.</li>
          <li>Combinamos fuentes para reducir sesgos y generar una lectura editorial contextual.</li>
          <li>Actualizamos periódicamente para reflejar cambios relevantes en cada tema.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Qué puedes esperar</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Los rankings ofrecen una guía inicial para explorar destinos, no reemplazan estudios
          oficiales ni decisiones finales. Recomendamos contrastar con datos locales y considerar
          factores personales.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/temas" className="font-semibold text-brand-600">
            Explorar temas
          </Link>
          <span className="text-slate-400">·</span>
          <Link href="/categorias" className="font-semibold text-brand-600">
            Ver categorías
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.q} className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
