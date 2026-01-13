"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "rdm-theme";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div data-theme={theme} className="min-h-screen">
      {children}
      <span className="sr-only" aria-live="polite">
        Tema actual: {theme === "dark" ? "oscuro" : "claro"}
      </span>
      <ThemeSync onChange={setTheme} theme={theme} />
    </div>
  );
};

const ThemeSync = ({
  theme,
  onChange
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) => {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") return;
      onChange(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [onChange]);

  return (
    <input
      type="hidden"
      value={theme}
      aria-hidden="true"
      readOnly
    />
  );
};
