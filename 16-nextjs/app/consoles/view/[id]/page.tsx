import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ConsoleStatusAlert from "@/components/ConsoleStatusAlert";
import SideBar from "@/components/sidebar";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

function getConsoleImage(image: string) {
  if (!image || image.trim() === "" || image.trim().toLowerCase() === "no-image.png") {
    return "/imgs/no-cover.png";
  }

  return image;
}

export default async function ViewConsolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { id } = await params;
  const consoleId = Number(id);

  if (!Number.isFinite(consoleId)) {
    notFound();
  }

  const consoleItem = await prisma.console.findUnique({
    where: { id: consoleId },
    include: {
      _count: {
        select: {
          games: true,
        },
      },
    },
  });

  if (!consoleItem) {
    notFound();
  }

  const releaseLabel = new Date(consoleItem.releaseDate).toLocaleDateString("es-CO");

  return (
    <SideBar currentPath="/consoles">
      <div className="space-y-6">
        <ConsoleStatusAlert />
        <nav className="flex flex-wrap items-center gap-3">
          <Link href="/consoles" className="btn btn-ghost btn-sm">
            Back to consoles
          </Link>
          <Link href={`/consoles/edit/${consoleItem.id}`} className="btn btn-outline btn-sm">
            Edit console
          </Link>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/45 shadow-2xl">
          <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent px-6 py-8 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Console Details
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white md:text-5xl">
              {consoleItem.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
              Informacion general de la consola y su presencia dentro del catalogo.
            </p>
          </div>

          <div className="grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-12 xl:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-base-300/30 shadow-inner">
                <div className="hover-3d aspect-square w-full sm:aspect-[4/3]">
                  <figure className="h-full w-full overflow-hidden rounded-none border-0 bg-base-300/30 shadow-none">
                    <img
                      src={getConsoleImage(consoleItem.image)}
                      alt={`${consoleItem.name} image`}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-10">
              <div>
                <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-base-100/25">
                  <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <dt className="shrink-0 text-sm font-medium text-white/55">Manufacturer</dt>
                    <dd className="text-right text-base font-semibold text-white sm:text-left">
                      {consoleItem.manufacturer}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <dt className="shrink-0 text-sm font-medium text-white/55">Games</dt>
                    <dd className="text-right text-base font-semibold tabular-nums text-white sm:text-left">
                      {consoleItem._count.games}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <dt className="shrink-0 text-sm font-medium text-white/55">Release</dt>
                    <dd className="text-right text-base font-semibold tabular-nums text-white sm:text-left">
                      {releaseLabel}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-base-100/35 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-white/45">Overview</div>
                <p className="mt-3 text-sm leading-7 text-white/70">{consoleItem.description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SideBar>
  );
}
