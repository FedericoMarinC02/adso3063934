'use client';

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  queryKey?: string;
}

export default function SearchBar({
  placeholder = "Buscar...",
  queryKey = "query",
}: SearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(queryKey) ?? "");

  const updateSearch = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue.trim()) {
      params.set(queryKey, nextValue.trim());
      params.delete("page");
    } else {
      params.delete(queryKey);
      params.delete("page");
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearch(value);
  };

  const handleClear = () => {
    setValue("");
    updateSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-base-200/70 px-4 py-3 shadow-lg backdrop-blur sm:max-w-xl sm:flex-row sm:items-center"
    >
      <div className="flex w-full items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 shrink-0 text-white/55"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
          <circle cx="11" cy="11" r="6" />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-ghost btn-sm w-full text-white/60 hover:text-white sm:btn-xs sm:w-auto"
          >
            Limpiar
          </button>
        ) : null}

        <button type="submit" className="btn btn-primary btn-sm w-full text-white sm:w-auto">
          Buscar
        </button>
      </div>
    </form>
  );
}
