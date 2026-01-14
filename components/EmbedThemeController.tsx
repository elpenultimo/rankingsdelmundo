"use client";

import { useEffect } from "react";

export type EmbedTheme = "light" | "dark" | "auto";

const setDarkClass = (isDark: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", isDark);
};

export const EmbedThemeController = ({ theme }: { theme: EmbedTheme }) => {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.classList.add("embed-mode");
    return () => {
      document.body.classList.remove("embed-mode");
    };
  }, []);

  useEffect(() => {
    if (theme === "auto") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setDarkClass(media.matches);
      handleChange();
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    setDarkClass(theme === "dark");
    return undefined;
  }, [theme]);

  return null;
};
