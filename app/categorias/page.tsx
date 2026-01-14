import Link from "next/link";
import { categories, categoryKeys } from "../../lib/categories";
import { buildBreadcrumbs, buildMetadata, siteConfig } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Categorías de rankings | Rankings del Mundo",
  description:
    "Explora las categorías de rankings para navegar por países, ciudades, dinero, clima y vida con enfoque editorial.",
  path: "/categorias"
});

const categoryList = categoryKeys.map((key) => ({ key, ...categories[key] }));

export default function CategoriesIndexPage() {
  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Categorías", url: `${siteConfig.url}/categorias` }
  ]);

  return (
    <div className="container-page space-y-12 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Guía</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Categorías de rankings
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Organiza tu exploración por temática y encuentra comparativas editoriales relevantes.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((category) => (
          <Link key={category.key} href={`/categoria/${category.key}`} className="card p-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span aria-hidden="true">{category.icon}</span>
              <span className="font-semibold uppercase tracking-wide">{category.label}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
              Rankings de {category.label}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {category.description}
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand-600">
              Ver rankings de {category.label} →
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Cómo usar el sitio</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Elige una categoría y revisa los rankings destacados del tema.</li>
            <li>Usa filtros rápidos por región o año para ajustar el contexto.</li>
            <li>Abre comparaciones para ver dos entidades lado a lado.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Metodología breve</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Cada ranking se basa en índices referenciales y una compilación editorial de fuentes
            públicas. Priorizamos claridad, comparabilidad y consistencia en las actualizaciones.
          </p>
          <p className="text-xs text-slate-500">
            Próximamente: metodología editorial detallada en una sección dedicada.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
