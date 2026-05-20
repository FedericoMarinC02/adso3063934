'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GameFiltersProps {
  consoles: string[];
  genres: string[];
}

export default function GameFilters({ consoles, genres }: GameFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedConsole = searchParams.get("console") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "";

  const updateFilter = (key: "console" | "genre", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");
    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-end">
      <label className="form-control w-full md:w-[260px]">
        <div className="label pb-1 pt-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Filtrar por consola
          </span>
        </div>
        <select
          value={selectedConsole}
          onChange={(event) => updateFilter("console", event.target.value)}
          className="h-[52px] min-h-[52px] w-full rounded-2xl border border-white/10 bg-base-200/70 px-4 text-sm text-white outline-none"
        >
          <option value="">Todas las consolas</option>
          {consoles.map((consoleName) => (
            <option key={consoleName} value={consoleName}>
              {consoleName}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full md:w-[260px]">
        <div className="label pb-1 pt-0">
          <span className="label-text text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Filtrar por genero
          </span>
        </div>
        <select
          value={selectedGenre}
          onChange={(event) => updateFilter("genre", event.target.value)}
          className="h-[52px] min-h-[52px] w-full rounded-2xl border border-white/10 bg-base-200/70 px-4 text-sm text-white outline-none"
        >
          <option value="">Todos los generos</option>
          {genres.map((genreName) => (
            <option key={genreName} value={genreName}>
              {genreName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
