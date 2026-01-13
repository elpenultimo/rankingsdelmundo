import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
        No encontramos esa página
      </h1>
      <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
        Puede que el ranking se haya movido o que el enlace esté incompleto. Explora el listado
        completo para volver a empezar.
      </p>
      <Link
        href="/rankings"
        className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500"
      >
        Ir a rankings
      </Link>
    </div>
  );
}
