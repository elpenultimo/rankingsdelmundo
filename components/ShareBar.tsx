"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CompareMode } from "../lib/url";
import { buildCompareLandingUrl, swapCompareSlugInPath } from "../lib/url";
import { trackEvent } from "../lib/metrics/client";
import { Toast } from "./Toast";

type ShareBarProps = {
  mode: CompareMode;
  entityA: { name: string; slug: string };
  entityB: { name: string; slug: string };
  className?: string;
};

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

export const ShareBar = ({ mode, entityA, entityB, className }: ShareBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeout = useRef<number | null>(null);
  const metricScope = mode === "pais" ? "compare_pais" : "compare_ciudad";
  const compareSlug = `${entityA.slug}-vs-${entityB.slug}`;

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimeout.current) {
      window.clearTimeout(toastTimeout.current);
    }
    toastTimeout.current = window.setTimeout(() => setToastMessage(null), 2200);
  }, []);

  const getCurrentUrl = () => (typeof window === "undefined" ? "" : window.location.href);

  const handleCopy = useCallback(async () => {
    const url = getCurrentUrl();
    if (!url) return;
    await copyToClipboard(url);
    trackEvent("copy_link", metricScope, compareSlug);
    console.info("[share] copy", { url });
    showToast("Enlace copiado");
  }, [compareSlug, metricScope, showToast]);

  const handleShare = useCallback(async () => {
    const url = getCurrentUrl();
    if (!url) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${entityA.name} vs ${entityB.name}`,
          text: "Comparación rápida: costo de vida, seguridad y más.",
          url
        });
        trackEvent("share", metricScope, compareSlug);
        console.info("[share] native", { url });
        showToast("Enlace compartido");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }
    await handleCopy();
  }, [compareSlug, entityA.name, entityB.name, handleCopy, metricScope, showToast]);

  const handleSwap = useCallback(() => {
    const nextPath = swapCompareSlugInPath(pathname, entityA.slug, entityB.slug);
    router.push(nextPath);
  }, [entityA.slug, entityB.slug, pathname, router]);

  const compareLandingUrl = buildCompareLandingUrl({
    mode,
    aSlug: entityA.slug,
    bSlug: entityB.slug
  });

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar enlace de la comparación"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Copiar enlace
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Compartir la comparación"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Compartir
        </button>
        <button
          type="button"
          onClick={handleSwap}
          aria-label="Intercambiar el orden de la comparación"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Intercambiar
        </button>
        <Link
          href={compareLandingUrl}
          aria-label="Abrir la comparación en el comparador"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          Abrir en /comparar
        </Link>
      </div>
      {toastMessage ? <Toast message={toastMessage} /> : null}
    </div>
  );
};
