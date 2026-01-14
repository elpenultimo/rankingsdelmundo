import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div className="container-page flex flex-col items-start justify-between gap-4 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
      <div>
        <p className="font-medium text-slate-700 dark:text-slate-200">Rankings del Mundo</p>
        <p>Curaduría editorial de rankings globales en español.</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <Link href="/fuentes" className="font-semibold text-brand-600">
            Fuentes
          </Link>
          <span className="text-slate-400">·</span>
          <Link href="/metodologia" className="font-semibold text-brand-600">
            Metodología
          </Link>
        </div>
      </div>
      <div className="space-y-1">
        <p>Contacto: hola@rankingsdelmundo.com</p>
        <p>© 2024 Rankings del Mundo</p>
      </div>
    </div>
  </footer>
);
