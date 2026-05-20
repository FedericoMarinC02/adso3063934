import DeleteGameButton from "@/components/DeleteGameButton";
import GameConsoleBadge from "@/components/GameConsoleBadge";
import GameGenreBadge from "@/components/GameGenreBadge";
import GameStatusAlert from "@/components/GameStatusAlert";
import GameCover3D from "@/components/GameCover3D";
import Link from "next/link";
import SideBar from "@/components/sidebar";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const resolveCover = (cover: string) => {
  if (!cover || cover.trim() === "" || cover.trim().toLowerCase() === "no-image.png") {
    return "/imgs/no-cover.png";
  }

  return cover;
};

export default async function GameViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ returnTo?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const gameId = Number(id);

  if (!Number.isInteger(gameId) || gameId <= 0) {
    notFound();
  }

  const game = await prisma.games.findUnique({
    where: { id: gameId },
    include: { console: true },
  });

  if (!game) {
    notFound();
  }

  const coverUrl = resolveCover(game.cover);
  const backToGamesHref =
    resolvedSearchParams?.returnTo?.startsWith("/games")
      ? resolvedSearchParams.returnTo
      : "/games";

  return (
    <SideBar currentPath="/games">
      <div className="space-y-6">
        <GameStatusAlert />
        <div className="flex flex-wrap items-center gap-3">
          <Link href={backToGamesHref} className="btn btn-ghost btn-sm">
            Back to games
          </Link>
          <Link
            href={`/games/edit/${game.id}?returnTo=${encodeURIComponent(backToGamesHref)}`}
            className="btn btn-outline btn-sm"
          >
            Edit game
          </Link>
          <DeleteGameButton
            gameId={game.id}
            title={game.title}
            className="btn btn-sm inline-flex items-center gap-1 border border-rose-400/30 bg-rose-400/15 text-rose-100 hover:bg-rose-400/25 hover:border-rose-300/40"
          />
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/45 shadow-2xl">
          <div className="bg-gradient-to-r from-base-300/70 via-base-200/20 to-transparent px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                  Game Details
                </p>
                <h1 className="text-4xl font-black tracking-tight md:text-5xl">{game.title}</h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="badge badge-lg border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-emerald-100">
                  ${game.price.toFixed(2)}
                </span>
                <GameGenreBadge genre={game.genre} className="badge-lg" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 md:px-8 xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-4">
              <GameCover3D title={game.title} coverUrl={coverUrl} />
              <div className="w-full max-w-[240px] rounded-2xl border border-white/10 bg-base-300/40 px-4 py-4 text-sm text-white/75 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                  Release
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {new Date(game.releaseDate).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-base-300 bg-base-200/55 p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold">Description</h2>
                <p className="leading-8 text-white/80">{game.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-base-300 bg-base-200/35 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Developer</p>
                  <p className="mt-2 text-lg font-semibold">{game.developer}</p>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-200/35 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Console</p>
                  <div className="mt-3">
                    <GameConsoleBadge consoleName={game.console.name} className="badge-lg" />
                  </div>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-200/35 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Price</p>
                  <p className="mt-2 text-lg font-semibold">${game.price.toFixed(2)}</p>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-200/35 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Genre</p>
                  <div className="mt-3">
                    <GameGenreBadge genre={game.genre} className="badge-lg" />
                  </div>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-200/35 p-5 shadow-lg md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Platform Info</p>
                  <div className="mt-3">
                    <GameConsoleBadge consoleName={game.console.name} className="badge-lg" />
                  </div>
                  <p className="mt-1 text-sm leading-6 text-white/65">
                    {game.console.manufacturer} |{" "}
                    {new Date(game.console.releaseDate).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SideBar>
  );
}
