import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => (
  <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
    <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link href="/" className="text-xl font-semibold text-slate-900 dark:text-white">
          Rankings del Mundo
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Rankings globales en español con foco editorial.
        </p>
      </div>
      <nav className="flex flex-wrap items-center gap-4">
        <Link href="/categorias" className="link-muted">
          Categorías
        </Link>
        <Link href="/rankings" className="link-muted">
          Rankings
        </Link>
        <Link href="/paises" className="link-muted">
          Países
        </Link>
        <Link href="/ciudades" className="link-muted">
          Ciudades
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  </header>
);
