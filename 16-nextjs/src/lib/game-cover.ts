import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const mimeToExtension: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

const publicImgsDir = path.join(process.cwd(), "public", "imgs");
const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.games_READ_WRITE_TOKEN;

const getFileExtension = (file: File) => {
  const originalExtension = path.extname(file.name).toLowerCase();
  if (originalExtension) return originalExtension;

  return mimeToExtension[file.type] ?? ".png";
};

const isSupportedImageFile = (file: File) => {
  if (file.type.startsWith("image/")) {
    return true;
  }

  const extension = path.extname(file.name).toLowerCase();
  return Object.values(mimeToExtension).includes(extension);
};

export async function saveUploadedPublicImage(file: File, fileNamePrefix: string) {
  if (!isSupportedImageFile(file)) {
    throw new Error("The selected file must be an image.");
  }

  if (process.env.VERCEL && !blobToken) {
    throw new Error("Falta configurar un token de Vercel Blob en el proyecto.");
  }

  const extension = getFileExtension(file);
  const fileName = `${fileNamePrefix}-${randomUUID()}${extension}`;

  // In Vercel production, write uploads to Blob storage because the function
  // filesystem is ephemeral and should not be used for persistent user files.
  if (blobToken) {
    const blob = await put(`imgs/${fileName}`, file, {
      access: "public",
      addRandomSuffix: false,
      token: blobToken,
    });

    return blob.url;
  }

  await mkdir(publicImgsDir, { recursive: true });

  const absolutePath = path.join(publicImgsDir, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(absolutePath, bytes);

  return `/imgs/${fileName}`;
}

export async function saveUploadedGameCover(file: File) {
  return saveUploadedPublicImage(file, "game-cover");
}

export async function saveUploadedConsoleImage(file: File) {
  return saveUploadedPublicImage(file, "console-image");
}

function isDefaultImage(imageUrl: string) {
  const normalized = imageUrl.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "no-image.png" ||
    normalized === "/imgs/no-cover.png"
  );
}

function isLocalImage(imageUrl: string) {
  return imageUrl.startsWith("/imgs/");
}

function isBlobImage(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    return url.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function deleteReplacedImage(imageUrl: string) {
  if (isDefaultImage(imageUrl)) {
    return;
  }

  if (isBlobImage(imageUrl) && blobToken) {
    await del(imageUrl, { token: blobToken });
    return;
  }

  if (isLocalImage(imageUrl)) {
    const relativePath = imageUrl.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);

    try {
      await unlink(absolutePath);
    } catch (error: any) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }
  }
}
