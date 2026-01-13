import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={item.href} className="flex items-center gap-2">
          <Link href={item.href} className="hover:text-brand-600">
            {item.label}
          </Link>
          {index < items.length - 1 && <span className="text-slate-400">/</span>}
        </li>
      ))}
    </ol>
  </nav>
);
