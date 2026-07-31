import "server-only";
import { cache } from "react";
import { contentSchema, type SiteContent } from "./schema";
import { getContentBlobUrl } from "./blob";
import seed from "@/content/seed-content.json";

/** Contenido de respaldo (seed local) validado una sola vez. */
export const seedContent: SiteContent = contentSchema.parse(seed);

async function loadContent(): Promise<SiteContent> {
  try {
    const url = await getContentBlobUrl();
    if (url) {
      // Lectura siempre fresca: los cambios del admin se reflejan de inmediato.
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        return contentSchema.parse(await res.json());
      }
    }
  } catch (error) {
    console.error("[content] fallo leyendo desde Blob, usando seed local:", error);
  }
  return seedContent;
}

/**
 * Lee el contenido del sitio desde Vercel Blob (o el seed local como respaldo).
 * `cache()` deduplica la lectura dentro de un mismo render de servidor.
 */
export const getContent = cache(loadContent);
