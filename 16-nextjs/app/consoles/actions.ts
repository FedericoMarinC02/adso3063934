'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { deleteReplacedImage, saveUploadedConsoleImage } from "@/src/lib/game-cover";
import {
  ConsoleFormFieldName,
  consoleFormSchema,
  getConsoleFormValues,
} from "@/src/lib/console-form-schema";

const fallbackImage = "no-image.png";
const validationErrorMessage = "Revisa los campos obligatorios antes de continuar.";
const duplicateNameErrorMessage = "Ya existe una consola con ese nombre. Usa un nombre diferente.";

type ConsoleActionResult =
  | void
  | {
      error?: string;
      fieldErrors?: Partial<Record<ConsoleFormFieldName, string[]>>;
      redirectTo?: string;
    };

type ConsoleValidationData = {
  name: string;
  manufacturer: string;
  releaseDate: string;
  description: string;
};

type ConsoleValidationResult =
  | {
      data: ConsoleValidationData;
    }
  | {
      error: string;
      fieldErrors: Partial<Record<ConsoleFormFieldName, string[]>>;
    };

type ImageUploadResult =
  | {
      image: string;
      changed: boolean;
    }
  | {
      error: string;
    };

type UpdateConsoleActionArgs = {
  consoleId: number;
  currentImage: string;
  currentReleaseDate: string;
  currentName: string;
  currentManufacturer: string;
  currentDescription: string;
};

async function requireUser(redirectTo: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }
}

function getValidationResult(formData: FormData): ConsoleValidationResult {
  const parsed = consoleFormSchema.safeParse(getConsoleFormValues(formData));

  if (!parsed.success) {
    return {
      error: validationErrorMessage,
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<ConsoleFormFieldName, string[]>
      >,
    };
  }

  return {
    data: {
      name: parsed.data.name.trim(),
      manufacturer: parsed.data.manufacturer.trim(),
      releaseDate: parsed.data.releaseDate,
      description: parsed.data.description.trim(),
    },
  };
}

async function resolveImageUpload(
  formData: FormData,
  currentImage = fallbackImage,
  uploadErrorMessage?: string,
): Promise<ImageUploadResult> {
  const coverFile = formData.get("coverFile");
  const uploadedImageUrl = formData.get("coverUrl")?.toString().trim();

  if (uploadedImageUrl) {
    return { image: uploadedImageUrl, changed: uploadedImageUrl !== currentImage };
  }

  if (!(coverFile instanceof File) || coverFile.size === 0) {
    return { image: currentImage, changed: false };
  }

  try {
    const image = await saveUploadedConsoleImage(coverFile);
    return { image, changed: true };
  } catch (uploadError) {
    console.error("Console image upload error:", uploadError);

    if (uploadErrorMessage) {
      return { error: uploadErrorMessage };
    }

    return { image: currentImage, changed: false };
  }
}

function getConsoleErrorResult(error: any, fallbackMessage: string): ConsoleActionResult {
  console.error(
    fallbackMessage.includes("crear") ? "Create console error:" : "Update console error:",
    error,
  );

  if (error?.code === "P2002") {
    return {
      error: duplicateNameErrorMessage,
      fieldErrors: {
        name: ["Ya existe una consola con ese nombre"],
      },
    };
  }

  return { error: fallbackMessage };
}

function revalidateConsolePaths(consoleId?: number) {
  revalidatePath("/consoles");

  if (consoleId) {
    revalidatePath(`/consoles/view/${consoleId}`);
    revalidatePath(`/consoles/edit/${consoleId}`);
  }
}

export async function createConsoleAction(formData: FormData): Promise<ConsoleActionResult> {
  await requireUser("/handler/sign-in");

  const validation = getValidationResult(formData);
  if (!("data" in validation)) return validation;

  const upload = await resolveImageUpload(formData);
  if ("error" in upload) return { error: upload.error };

  const { name, manufacturer, releaseDate, description } = validation.data;

  try {
    const created = await prisma.console.create({
      data: {
        name,
        image: upload.image,
        manufacturer,
        releaseDate: new Date(releaseDate),
        description,
      },
    });

    revalidateConsolePaths();
    return {
      redirectTo: `/consoles/view/${created.id}?created=1`,
    };
  } catch (error: any) {
    return getConsoleErrorResult(
      error,
      "No se pudo crear la consola. Intenta de nuevo en unos segundos.",
    );
  }
}

export async function updateConsoleAction(
  args: UpdateConsoleActionArgs,
  formData: FormData,
): Promise<ConsoleActionResult> {
  await requireUser("/");

  const validation = getValidationResult(formData);
  if (!("data" in validation)) return validation;

  const upload = await resolveImageUpload(
    formData,
    args.currentImage,
    "No se pudo subir la imagen de la consola. Intenta nuevamente.",
  );
  if ("error" in upload) return { error: upload.error };

  const { name, manufacturer, releaseDate, description } = validation.data;

  const changedFields: string[] = [];
  if (upload.changed) changedFields.push("image");

  if (name !== args.currentName) changedFields.push("name");
  if (manufacturer !== args.currentManufacturer) changedFields.push("manufacturer");
  if (releaseDate !== args.currentReleaseDate) changedFields.push("release date");
  if (description !== args.currentDescription) changedFields.push("description");

  try {
    await prisma.console.update({
      where: { id: args.consoleId },
      data: {
        name,
        image: upload.image,
        manufacturer,
        releaseDate: new Date(releaseDate),
        description,
      },
    });

    if (upload.changed) {
      await deleteReplacedImage(args.currentImage);
    }

    revalidateConsolePaths(args.consoleId);

    const nextParams = new URLSearchParams({
      edited: "1",
      console: name,
    });

    if (changedFields.length) {
      nextParams.set("changes", changedFields.join("|"));
    }

    return {
      redirectTo: `/consoles/view/${args.consoleId}?${nextParams.toString()}`,
    };
  } catch (error: any) {
    return getConsoleErrorResult(
      error,
      "No se pudo actualizar la consola. Intenta de nuevo en unos segundos.",
    );
  }
}

export async function deleteConsoleAction(consoleId: number) {
  await requireUser("/");

  const consoleItem = await prisma.console.findUnique({
    where: { id: consoleId },
    select: { image: true },
  });

  await prisma.console.delete({
    where: { id: consoleId },
  });

  if (consoleItem?.image) {
    await deleteReplacedImage(consoleItem.image);
  }

  revalidateConsolePaths(consoleId);
}
