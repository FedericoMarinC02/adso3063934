import Link from "next/link";
import DeleteConsoleButton from "@/components/DeleteConsoleButton";

type ConsoleItem = {
  id: number;
  name: string;
  image: string;
  manufacturer: string;
  releaseDate: Date;
  description: string;
  _count: {
    games: number;
  };
};

function getConsoleImage(image: string) {
  if (!image || image.trim() === "" || image.trim().toLowerCase() === "no-image.png") {
    return "/imgs/no-cover.png";
  }

  return image;
}

export default function ConsolesInfo({
  consoles,
}: {
  consoles: ConsoleItem[];
}) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="flex flex-col gap-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            <span>Consoles List</span>
            <span className="text-sm font-semibold tracking-[0.22em] text-cyan-200/80 md:text-base">
              Power up{" "}
              <span
                className="text-rotate align-middle text-cyan-100 [text-shadow:0_0_12px_rgba(34,211,238,0.35)]"
                style={{ ["--duration" as string]: "11s" }}
              >
                <span className="justify-items-start">
                  <span>arcade legends</span>
                  <span>retro machines</span>
                  <span>future hardware</span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <div className="flex w-full justify-start lg:w-auto lg:justify-end">
          <Link
            href="/consoles/new"
            className="btn btn-primary btn-sm w-full shrink-0 text-white sm:w-auto"
          >
            + Add Console
          </Link>
        </div>
      </header>

      {consoles.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {consoles.map((consoleItem) => (
            <li key={consoleItem.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200/35 shadow-lg transition-all duration-300 hover:border-white/15 hover:bg-base-200/50 hover:shadow-2xl">
                <Link
                  href={`/consoles/view/${consoleItem.id}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-base-300/50"
                >
                  <img
                    src={getConsoleImage(consoleItem.image)}
                    alt={`${consoleItem.name} image`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="space-y-2">
                    <Link
                      href={`/consoles/view/${consoleItem.id}`}
                      className="block text-lg font-semibold leading-snug text-white transition-colors hover:text-cyan-200"
                    >
                      {consoleItem.name}
                    </Link>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                      Manufacturer
                    </p>
                    <p className="text-sm text-white/80">{consoleItem.manufacturer}</p>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                        Games
                      </dt>
                      <dd className="mt-1 font-semibold tabular-nums text-white">
                        {consoleItem._count.games}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                        Release
                      </dt>
                      <dd className="mt-1 font-medium tabular-nums text-white/90">
                        {new Date(consoleItem.releaseDate).toLocaleDateString("es-CO")}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
                    <Link
                      href={`/consoles/view/${consoleItem.id}`}
                      className="btn btn-sm flex-1 gap-1 border border-emerald-400/35 bg-emerald-400/15 text-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-400/25"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                        />
                      </svg>
                      Show
                    </Link>
                    <Link
                      href={`/consoles/edit/${consoleItem.id}`}
                      className="btn btn-sm flex-1 gap-1 border border-sky-400/35 bg-sky-400/15 text-sky-100 hover:border-sky-300/50 hover:bg-sky-400/25"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.1 2.1 0 0 1 2.97 2.97L8.44 17.85l-3.61.64.64-3.61 12.392-12.392Z"
                        />
                      </svg>
                      Edit
                    </Link>
                    <DeleteConsoleButton
                      consoleId={consoleItem.id}
                      title={consoleItem.name}
                      relatedGames={consoleItem._count.games}
                      className="btn btn-sm flex-1 gap-1 border border-rose-400/35 bg-rose-400/15 text-rose-100 hover:border-rose-300/50 hover:bg-rose-400/25"
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 bg-base-200/25 px-6 py-20 text-center">
          <h2 className="text-lg font-semibold text-white">No hay consolas para mostrar</h2>
          <p className="mt-2 text-sm text-white/60">
            Prueba con otra busqueda o agrega registros nuevos mas adelante.
          </p>
        </div>
      )}
    </div>
  );
}
