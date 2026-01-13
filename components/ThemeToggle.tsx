"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "rdm-theme";

type Theme = "light" | "dark";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Alternar modo oscuro"
    >
      <span className="text-base" aria-hidden="true">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
      {theme === "dark" ? "Modo oscuro" : "Modo claro"}
    </button>
  );
};
