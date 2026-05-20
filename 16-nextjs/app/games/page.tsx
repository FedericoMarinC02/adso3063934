import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import SideBar from "@/components/sidebar";
import GameStatusAlert from "@/components/GameStatusAlert";
import GamesInfo from "@/components/GamesInfo";
import React from "react";
import Pagination from "@/components/Pagination";
import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic';

const GAMES_PER_PAGE = 10;

export default async function GamesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
    deleted?: string;
    console?: string;
    genre?: string;
  }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  const currentSearch = new URLSearchParams();
  const requestedPage = Number(resolvedSearchParams?.page);
  const searchQuery = resolvedSearchParams?.query?.trim() ?? "";
  const selectedConsole = resolvedSearchParams?.console?.trim() ?? "";
  const selectedGenre = resolvedSearchParams?.genre?.trim() ?? "";

  if (resolvedSearchParams?.page) currentSearch.set("page", resolvedSearchParams.page);
  if (resolvedSearchParams?.query) currentSearch.set("query", resolvedSearchParams.query);
  if (resolvedSearchParams?.console) currentSearch.set("console", resolvedSearchParams.console);
  if (resolvedSearchParams?.genre) currentSearch.set("genre", resolvedSearchParams.genre);

  const returnTo = currentSearch.toString() ? `/games?${currentSearch.toString()}` : "/games";
  const where = {
    ...(searchQuery
      ? {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" as const } },
            { developer: { contains: searchQuery, mode: "insensitive" as const } },
            { genre: { contains: searchQuery, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(selectedConsole
      ? {
          console: {
            name: selectedConsole,
          },
        }
      : {}),
    ...(selectedGenre
      ? {
          genre: selectedGenre,
        }
      : {}),
  };

  const [availableConsoles, availableGenres] = await Promise.all([
    prisma.console.findMany({
      orderBy: { name: "asc" },
      select: { name: true },
    }),
    prisma.games.findMany({
      distinct: ["genre"],
      orderBy: { genre: "asc" },
      select: { genre: true },
    }),
  ]);

  const totalGames = await prisma.games.count({ where });
  const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE);
  const currentPage = Math.min(
    Math.max(Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1, 1),
    Math.max(totalPages, 1)
  );

  const games = await prisma.games.findMany({
    take: GAMES_PER_PAGE,
    skip: (currentPage - 1) * GAMES_PER_PAGE,
    where,
    include: {
      console: true,
    },
    orderBy: {
      releaseDate: 'desc',
    }
  });

  return (
    <SideBar currentPath="/games">
      <GameStatusAlert />
      <GamesInfo
        games={games}
        consoles={availableConsoles.map((consoleItem) => consoleItem.name)}
        genres={availableGenres.map((genreItem) => genreItem.genre)}
        returnTo={returnTo}
      />
      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </SideBar>
  );
}
