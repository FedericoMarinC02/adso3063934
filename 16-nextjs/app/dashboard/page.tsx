import SideBar from "@/components/sidebar";
import LoginSuccessVideo from "@/components/LoginSuccessVideo";
import DashboardCharts from "@/components/DashboardCharts";
import { prisma } from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  const [games, consoles] = await Promise.all([
    prisma.games.findMany({
      select: {
        id: true,
        title: true,
        genre: true,
        price: true,
        releaseDate: true,
        console: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        releaseDate: "asc",
      },
    }),
    prisma.console.findMany({
      select: {
        id: true,
        name: true,
        releaseDate: true,
        _count: {
          select: {
            games: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  const totalGames = games.length;
  const totalConsoles = consoles.length;
  const averagePrice =
    totalGames > 0
      ? Number(
          (games.reduce((sum, game) => sum + game.price, 0) / totalGames).toFixed(2),
        )
      : 0;

  const latestGame = [...games].sort(
    (a, b) => b.releaseDate.getTime() - a.releaseDate.getTime(),
  )[0];

  const genreMap = new Map<string, number>();
  const timelineMap = new Map<string, number>();

  for (const game of games) {
    genreMap.set(game.genre, (genreMap.get(game.genre) ?? 0) + 1);

    const year = String(game.releaseDate.getFullYear());
    timelineMap.set(year, (timelineMap.get(year) ?? 0) + 1);
  }

  const genreData = [...genreMap.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const consoleData = consoles
    .map((consoleItem) => ({
      name: consoleItem.name,
      games: consoleItem._count.games,
      releaseYear: consoleItem.releaseDate.getFullYear(),
    }))
    .sort((a, b) => b.games - a.games);

  const releaseTimeline = [...timelineMap.entries()]
    .map(([year, gamesCount]) => ({
      year,
      games: gamesCount,
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  const stats = [
    {
      label: "Total games",
      value: totalGames.toString(),
      help: "Titles currently registered",
    },
    {
      label: "Total consoles",
      value: totalConsoles.toString(),
      help: "Platforms available in the library",
    },
    {
      label: "Average price",
      value: `$${averagePrice.toFixed(2)}`,
      help: "Average of all stored game prices",
    },
    {
      label: "Latest release",
      value: latestGame ? latestGame.title : "No data",
      help: latestGame
        ? latestGame.releaseDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Add your first game to unlock this card",
    },
  ];

  return (
    <SideBar currentPath="/dashboard">
      <div className="space-y-8">
        <LoginSuccessVideo />
        <DashboardCharts
          userName={user?.displayName ?? "Player"}
          stats={stats}
          genreData={genreData}
          consoleData={consoleData}
          releaseTimeline={releaseTimeline}
        />
      </div>
    </SideBar>
  );
}
