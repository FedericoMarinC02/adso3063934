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
    throw new Error("Falta configurar DATABASE_URL para leer los juegos desde Prisma.");
  }

  const games = await prisma.games.findMany({
    select: {
      id: true,
      title: true,
      cover: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  for (const game of games) {
    if (!game.cover || isDefaultImage(game.cover) || !isLocalImage(game.cover)) {
      continue;
    }

    const relativePath = game.cover.replace(/^\/+/, "");
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const fileName = path.basename(relativePath);

    try {
      const fileBuffer = await readFile(absolutePath);
      const blob = await put(`imgs/${fileName}`, fileBuffer, {
        access: "public",
        addRandomSuffix: true,
        token: blobToken,
      });

      await prisma.games.update({
        where: { id: game.id },
        data: { cover: blob.url },
      });

      console.log(`Migrado juego ${game.id}: ${game.title} -> ${blob.url}`);
    } catch (error) {
      console.error(`Error migrando juego ${game.id}: ${game.title}`, error);
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
