import CoverUploadField from "@/components/CoverUploadField";
import DeleteConsoleButton from "@/components/DeleteConsoleButton";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SideBar from "@/components/sidebar";
import ValidatedConsoleForm, { ConsoleFieldError } from "@/components/ValidatedConsoleForm";
import { updateConsoleAction } from "@/app/consoles/actions";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

const fallbackImage = "no-image.png";

export default async function EditConsolePage({
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
        select: { games: true },
      },
    },
  });

  if (!consoleItem) {
    notFound();
  }

  const currentImage = consoleItem.image || fallbackImage;
  const currentReleaseDate = new Date(consoleItem.releaseDate).toISOString().split("T")[0];
  const currentName = consoleItem.name;
  const currentManufacturer = consoleItem.manufacturer;
  const currentDescription = consoleItem.description;
  const updateConsole = updateConsoleAction.bind(null, {
    consoleId,
    currentImage,
    currentReleaseDate,
    currentName,
    currentManufacturer,
    currentDescription,
  });

  return (
    <SideBar currentPath="/consoles">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/consoles" className="btn btn-ghost btn-sm">
            Back to consoles
          </Link>
          <Link href={`/consoles/view/${consoleItem.id}`} className="btn btn-outline btn-sm">
            View console
          </Link>
          <DeleteConsoleButton
            consoleId={consoleItem.id}
            title={consoleItem.name}
            relatedGames={consoleItem._count.games}
            className="btn btn-sm inline-flex items-center gap-1 border border-rose-400/30 bg-rose-400/15 text-rose-100 hover:bg-rose-400/25 hover:border-rose-300/40"
          />
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/45 shadow-2xl">
          <div className="bg-gradient-to-r from-sky-500/10 via-transparent to-transparent px-6 py-6 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
              Edit Console
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {consoleItem.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65">
              Actualiza la informacion principal de la consola y guarda los cambios cuando todo este listo.
            </p>
          </div>

          <ValidatedConsoleForm action={updateConsole} className="grid gap-8 px-6 py-8 md:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  defaultValue={consoleItem.name}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <ConsoleFieldError name="name" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white/75">Manufacturer</span>
                </div>
                <input
                  type="text"
                  name="manufacturer"
                  defaultValue={consoleItem.manufacturer}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <ConsoleFieldError name="manufacturer" />
              </label>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Release Date</span>
                </div>
                <input
                  type="date"
                  name="releaseDate"
                  defaultValue={new Date(consoleItem.releaseDate).toISOString().split("T")[0]}
                  className="input input-bordered w-full bg-base-100/70"
                />
                <ConsoleFieldError name="releaseDate" />
              </label>

              <div className="lg:col-span-2 rounded-[1.75rem] border border-white/10 bg-base-200/35 p-5 shadow-xl">
                <CoverUploadField initialCover={consoleItem.image} title={consoleItem.name} />
              </div>

              <label className="form-control w-full lg:col-span-2">
                <div className="label">
                  <span className="label-text text-white/75">Description</span>
                </div>
                <textarea
                  name="description"
                  defaultValue={consoleItem.description}
                  className="textarea textarea-bordered min-h-40 w-full bg-base-100/70"
                />
                <ConsoleFieldError name="description" />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link href={`/consoles/view/${consoleItem.id}`} className="btn btn-ghost">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary text-white">
                Save Changes
              </button>
            </div>
          </ValidatedConsoleForm>
        </section>
      </div>
    </SideBar>
  );
}
