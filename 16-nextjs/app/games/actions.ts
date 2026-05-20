'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { deleteReplacedImage, saveUploadedGameCover } from "@/src/lib/game-cover";
import { GameFormFieldName, gameFormSchema, getGameFormValues } from "@/src/lib/game-form-schema";

const fallbackCover = "no-image.png";
const validationErrorMessage = "Revisa los campos obligatorios antes de continuar.";
const duplicateTitleErrorMessage = "Ya existe un juego con ese titulo. Usa un titulo diferente.";
const invalidConsoleErrorMessage =
  "La consola seleccionada no es valida. Vuelve a elegirla e intenta de nuevo.";

type GameActionResult =
  | void
  | {
      error?: string;
      fieldErrors?: Partial<Record<GameFormFieldName, string[]>>;
      redirectTo?: string;
    };

type GameValidationData = {
  title: string;
  developer: string;
  releaseDate: string;
  price: number;
  genre: string;
  description: string;
  consoleId: number;
};

type GameValidationResult =
  | {
      data: GameValidationData;
    }
  | {
      error: string;
      fieldErrors: Partial<Record<GameFormFieldName, string[]>>;
    };

type CoverUploadResult =
  | {
      cover: string;
      changed: boolean;
    }
  | {
      error: string;
    };

type UpdateGameActionArgs = {
  gameId: number;
  currentCover: string;
  currentReleaseDate: string;
  currentTitle: string;
  currentDeveloper: string;
  currentPrice: number;
  currentGenre: string;
  currentDescription: string;
  currentConsoleId: number;
  returnTo: string;
};

async function requireUser(redirectTo: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }
}

function getValidationResult(formData: FormData): GameValidationResult {
  const parsed = gameFormSchema.safeParse(getGameFormValues(formData));

  if (!parsed.success) {
    return {
      error: validationErrorMessage,
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<GameFormFieldName, string[]>
      >,
    };
  }

  return {
    data: {
      title: parsed.data.title.trim(),
      developer: parsed.data.developer.trim(),
      releaseDate: parsed.data.releaseDate,
      price: Number(parsed.data.price),
      genre: parsed.data.genre.trim(),
      description: parsed.data.description.trim(),
      consoleId: Number(parsed.data.console_id),
    },
  };
}

async function resolveCoverUpload(
  formData: FormData,
  currentCover = fallbackCover,
  uploadErrorMessage?: string,
): Promise<CoverUploadResult> {
  const coverFile = formData.get("coverFile");
  const uploadedCoverUrl = formData.get("coverUrl")?.toString().trim();

  if (uploadedCoverUrl) {
    return { cover: uploadedCoverUrl, changed: uploadedCoverUrl !== currentCover };
  }

  if (!(coverFile instanceof File) || coverFile.size === 0) {
    return { cover: currentCover, changed: false };
  }

  try {
    const cover = await saveUploadedGameCover(coverFile);
    return { cover, changed: true };
  } catch (uploadError) {
    console.error("Game cover upload error:", uploadError);

    if (uploadErrorMessage) {
      return { error: uploadErrorMessage };
    }

    return { cover: currentCover, changed: false };
  }
}

function getGameErrorResult(error: any, fallbackMessage: string): GameActionResult {
  console.error(fallbackMessage.includes("crear") ? "Create game error:" : "Update game error:", error);

  if (error?.code === "P2002") {
    return {
      error: duplicateTitleErrorMessage,
      fieldErrors: {
        title: ["Ya existe un juego con ese titulo"],
      },
    };
  }

  if (error?.code === "P2003") {
    return {
      error: invalidConsoleErrorMessage,
      fieldErrors: {
        console_id: ["Selecciona una consola valida"],
      },
    };
  }

  return { error: fallbackMessage };
}

function revalidateGamePaths(gameId?: number) {
  revalidatePath("/games");

  if (gameId) {
    revalidatePath(`/games/view/${gameId}`);
    revalidatePath(`/games/edit/${gameId}`);
  }
}

export async function createGameAction(formData: FormData): Promise<GameActionResult> {
  await requireUser("/handler/sign-in");

  const validation = getValidationResult(formData);
  if (!("data" in validation)) return validation;

  const upload = await resolveCoverUpload(formData);
  if ("error" in upload) return { error: upload.error };

  const { title, developer, releaseDate, price, genre, description, consoleId } = validation.data;

  try {
    const game = await prisma.games.create({
      data: {
        title,
        cover: upload.cover,
        developer,
        releaseDate: new Date(releaseDate),
        price,
        genre,
        description,
        console_id: consoleId,
      },
    });

    revalidateGamePaths();
    return {
      redirectTo: `/games/view/${game.id}?created=1`,
    };
  } catch (error: any) {
    return getGameErrorResult(error, "No se pudo crear el juego. Intenta de nuevo en unos segundos.");
  }
}

export async function updateGameAction(
  args: UpdateGameActionArgs,
  formData: FormData,
): Promise<GameActionResult> {
  await requireUser("/");

  const validation = getValidationResult(formData);
  if (!("data" in validation)) return validation;

  const upload = await resolveCoverUpload(
    formData,
    args.currentCover,
    "No se pudo subir la portada del juego. Intenta nuevamente.",
  );
  if ("error" in upload) return { error: upload.error };

  const { title, developer, releaseDate, price, genre, description, consoleId } = validation.data;

  const changedFields: string[] = [];
  if (upload.changed) changedFields.push("cover");

  if (title !== args.currentTitle) changedFields.push("title");
  if (developer !== args.currentDeveloper) changedFields.push("developer");
  if (releaseDate !== args.currentReleaseDate) changedFields.push("release date");
  if (price !== args.currentPrice) changedFields.push("price");
  if (genre !== args.currentGenre) changedFields.push("genre");
  if (description !== args.currentDescription) changedFields.push("description");
  if (consoleId !== args.currentConsoleId) changedFields.push("console");

  try {
    await prisma.games.update({
      where: { id: args.gameId },
      data: {
        title,
        cover: upload.cover,
        developer,
        releaseDate: new Date(releaseDate),
        price,
        genre,
        description,
        console_id: consoleId,
      },
    });

    if (upload.changed) {
      await deleteReplacedImage(args.currentCover);
    }

    revalidateGamePaths(args.gameId);

    const nextParams = new URLSearchParams({
      edited: "1",
      game: title,
    });

    if (changedFields.length) {
      nextParams.set("changes", changedFields.join("|"));
    }

    nextParams.set("returnTo", args.returnTo);

    return {
      redirectTo: `/games/view/${args.gameId}?${nextParams.toString()}`,
    };
  } catch (error: any) {
    return getGameErrorResult(
      error,
      "No se pudo actualizar el juego. Intenta de nuevo en unos segundos.",
    );
  }
}

export async function deleteGameAction(gameId: number) {
  await requireUser("/");

  const game = await prisma.games.findUnique({
    where: { id: gameId },
    select: { cover: true },
  });

  await prisma.games.delete({
    where: { id: gameId },
  });

  if (game?.cover) {
    await deleteReplacedImage(game.cover);
  }

  revalidateGamePaths(gameId);
}
