/**
 * Sube el content/seed-content.json a Vercel Blob (una sola vez, o para
 * restablecer el contenido). Requiere BLOB_READ_WRITE_TOKEN en el entorno.
 *
 *   pnpm seed
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";
import { put } from "@vercel/blob";
import { contentSchema } from "../lib/schema";

// Carga variables locales: .env.local tiene prioridad sobre .env
loadEnv({ path: ".env.local" });
loadEnv();

const CONTENT_PATHNAME = "content/site-content.json";

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "✗ Falta BLOB_READ_WRITE_TOKEN. Ejecuta `vercel link` y `vercel env pull .env.local`,\n" +
        "  o crea un Blob store en el dashboard de Vercel y exporta el token."
    );
    process.exit(1);
  }

  const raw = readFileSync(resolve(process.cwd(), "content/seed-content.json"), "utf-8");
  const data = contentSchema.parse(JSON.parse(raw));

  const blob = await put(CONTENT_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });

  console.log("✓ Contenido subido a Blob:");
  console.log("  " + blob.url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
