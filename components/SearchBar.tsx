"use client";

import { ChangeEvent } from "react";

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar ranking..."
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Buscar ranking
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />
    </div>
  );
};
