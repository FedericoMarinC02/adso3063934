import CoverUploadField from "@/components/CoverUploadField";
import Link from "next/link";
import SideBar from "@/components/sidebar";
import ValidatedGameForm, { GameFieldError } from "@/components/ValidatedGameForm";
import { createGameAction } from "@/app/games/actions";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewGamePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  const consoles = await prisma.console.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <SideBar currentPath="/games">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/games" className="btn btn-ghost btn-sm">
            Back to games
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/45 shadow-2xl">
          <div className="bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent px-6 py-6 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Add Game
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Create a new game
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65">
              Completa la informacion principal del videojuego y guarda cuando todo este listo.
            </p>
          </div>

          {!consoles.length ? (
            <div className="mx-6 mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100 md:mx-8">
              Primero debes crear al menos una consola antes de registrar juegos.
            </div>
          ) : null}

          <ValidatedGameForm action={createGameAction} className="grid gap-8 px-6 py-8 md:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Title</span>
                </div>
                <input
                  type="text"
                  name="title"
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
                  className="input input-bordered w-full bg-base-100/70"
                />
                <GameFieldError name="releaseDate" />
              </label>

              <div className="lg:col-span-2 rounded-[1.75rem] border border-white/10 bg-base-200/35 p-5 shadow-xl">
                <CoverUploadField initialCover="" title="New game" />
              </div>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Console</span>
                </div>
                <select
                  name="console_id"
                  className="select select-bordered w-full bg-base-100/70"
                  defaultValue=""
                  disabled={!consoles.length}
                >
                  <option value="" disabled>
                    Select a console
                  </option>
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
                  className="textarea textarea-bordered min-h-40 w-full bg-base-100/70"
                />
                <GameFieldError name="description" />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link href="/games" className="btn btn-ghost">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary text-white"
                disabled={!consoles.length}
              >
                Create Game
              </button>
            </div>
          </ValidatedGameForm>
        </section>
      </div>
    </SideBar>
  );
}
