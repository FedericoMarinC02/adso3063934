import CoverUploadField from "@/components/CoverUploadField";
import DeleteGameButton from "@/components/DeleteGameButton";
import Link from "next/link";
import SideBar from "@/components/sidebar";
import ValidatedGameForm, { GameFieldError } from "@/components/ValidatedGameForm";
import { updateGameAction } from "@/app/games/actions";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const fallbackCover = "no-image.png";

export default async function EditGamePage({
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

  const [game, consoles] = await Promise.all([
    prisma.games.findUnique({
      where: { id: gameId },
      include: { console: true },
    }),
    prisma.console.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!game) {
    notFound();
  }

  const currentCover = game.cover || fallbackCover;
  const currentReleaseDate = new Date(game.releaseDate).toISOString().split("T")[0];
  const currentTitle = game.title;
  const currentDeveloper = game.developer;
  const currentPrice = game.price;
  const currentGenre = game.genre;
  const currentDescription = game.description;
  const currentConsoleId = game.console_id;
  const returnTo =
    resolvedSearchParams?.returnTo?.startsWith("/games")
      ? resolvedSearchParams.returnTo
      : "/games";
  const updateGame = updateGameAction.bind(null, {
    gameId,
    currentCover,
    currentReleaseDate,
    currentTitle,
    currentDeveloper,
    currentPrice,
    currentGenre,
    currentDescription,
    currentConsoleId,
    returnTo,
  });

  return (
    <SideBar currentPath="/games">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={returnTo} className="btn btn-ghost btn-sm">
            Back to games
          </Link>
          <Link
            href={`/games/view/${game.id}?returnTo=${encodeURIComponent(returnTo)}`}
            className="btn btn-outline btn-sm"
          >
            View game
          </Link>
          <DeleteGameButton
            gameId={game.id}
            title={game.title}
            className="btn btn-sm inline-flex items-center gap-1 border border-rose-400/30 bg-rose-400/15 text-rose-100 hover:bg-rose-400/25 hover:border-rose-300/40"
          />
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/45 shadow-2xl">
          <div className="bg-gradient-to-r from-sky-500/10 via-transparent to-transparent px-6 py-6 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Edit Game
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {game.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65">
              Actualiza la informacion principal del videojuego y guarda los cambios cuando todo este listo.
            </p>
          </div>

          <ValidatedGameForm action={updateGame} className="grid gap-8 px-6 py-8 md:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Title</span>
                </div>
                <input
                  type="text"
                  name="title"
                  defaultValue={game.title}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="title" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Developer</span>
                </div>
                <input
                  type="text"
                  name="developer"
                  defaultValue={game.developer}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="developer" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Genre</span>
                </div>
                <input
                  type="text"
                  name="genre"
                  defaultValue={game.genre}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="genre" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Price</span>
                </div>
                <input
                  type="number"
                  name="price"
                  defaultValue={game.price}
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="price" />
              </label>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Release Date</span>
                </div>
                <input
                  type="date"
                  name="releaseDate"
                  defaultValue={new Date(game.releaseDate).toISOString().split("T")[0]}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="releaseDate" />
              </label>

              <div className="lg:col-span-2 rounded-[1.75rem] border border-white/10 bg-base-200/35 p-5 shadow-xl">
                <CoverUploadField initialCover={game.cover} title={game.title} />
              </div>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Console</span>
                </div>
                <select
                  name="console_id"
                  defaultValue={String(game.console_id)}
                  className="select select-bordered w-full bg-base-100/70"
                >
                  {consoles.map((consoleItem) => (
                    <option key={consoleItem.id} value={consoleItem.id}>
                      {consoleItem.name}
                    </option>
                  ))}
                </select>
                <GameFieldError name="console_id" />
              </label>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Description</span>
                </div>
                <textarea
                  name="description"
                  defaultValue={game.description}
                  className="textarea textarea-bordered min-h-40 w-full bg-base-100/70"
                />
                <GameFieldError name="description" />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href={`/games/view/${game.id}?returnTo=${encodeURIComponent(returnTo)}`}
                className="btn btn-ghost"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary text-white">
                Save Changes
              </button>
            </div>
          </ValidatedGameForm>
        </section>
      </div>
    </SideBar>
  );
}
