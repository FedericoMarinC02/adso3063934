'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNavigation = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    if (safePage === currentPage) return;

    const url = createPageURL(safePage);
    router.push(url);
  };

  const pagesToShow = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
        (page) => page >= 1 && page <= totalPages
      )
    )
  );

  return (
    <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-base-200/45 px-4 py-4 shadow-xl backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <span className="rounded-full border border-white/10 bg-base-100/60 px-4 py-2 text-sm font-semibold text-white/85">
            Pagina {currentPage} de {totalPages}
          </span>
          <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100">
            {totalPages} paginas disponibles
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <button
            onClick={() => handleNavigation(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn btn-sm w-full border border-white/10 bg-base-100/60 text-white hover:bg-base-100 disabled:opacity-40 sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {pagesToShow.map((page, index) => {
              const previousPage = pagesToShow[index - 1];
              const showEllipsis = previousPage && page - previousPage > 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsis ? (
                    <span className="px-2 text-sm text-white/45">...</span>
                  ) : null}
                  <button
                    onClick={() => handleNavigation(page)}
                    className={`btn btn-sm min-w-10 border ${
                      page === currentPage
                        ? 'border-fuchsia-400/40 bg-fuchsia-500 text-white hover:bg-fuchsia-400'
                        : 'border-white/10 bg-base-100/55 text-white/80 hover:bg-base-100'
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <button
            onClick={() => handleNavigation(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn btn-sm w-full border border-white/10 bg-base-100/60 text-white hover:bg-base-100 disabled:opacity-40 sm:w-auto"
          >
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
