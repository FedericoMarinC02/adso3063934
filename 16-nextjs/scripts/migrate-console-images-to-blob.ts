import "dotenv/config";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.games_READ_WRITE_TOKEN;
const databaseUrl = process.env.DATABASE_URL;
const prisma = new PrismaClient(
  {
    adapter: new PrismaNeon(
      new Pool({
        connectionString: databaseUrl,
      }),
    ),
  } as any,
);

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

async function main() {
  if (!blobToken) {
    throw new Error("Falta configurar BLOB_READ_WRITE_TOKEN para subir imagenes a Vercel Blob.");
  }

  if (!databaseUrl) {
    throw new Error("Falta configurar DATABASE_URL para leer las consolas desde Prisma.");
  }

  const consoles = await prisma.console.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  for (const consoleItem of consoles) {
    if (!consoleItem.image || isDefaultImage(consoleItem.image) || !isLocalImage(consoleItem.image)) {
      continue;
    }

    const relativePath = consoleItem.image.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const fileName = path.basename(relativePath);

    try {
      const fileBuffer = await readFile(absolutePath);
      const blob = await put(`imgs/${fileName}`, fileBuffer, {
        access: "public",
        addRandomSuffix: true,
        token: blobToken,
      });

      await prisma.console.update({
        where: { id: consoleItem.id },
        data: { image: blob.url },
      });

      console.log(`Migrada consola ${consoleItem.id}: ${consoleItem.name} -> ${blob.url}`);
    } catch (error) {
      console.error(`Error migrando consola ${consoleItem.id}: ${consoleItem.name}`, error);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
