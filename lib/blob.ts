import "server-only";
import { list, put } from "@vercel/blob";

/** Ruta estable del documento de contenido dentro del Blob store. */
export const CONTENT_PATHNAME = "content/site-content.json";

export function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/**
 * Resuelve la URL pública del content.json en Blob.
 * Añade un cache-buster por-request (`Date.now()`) para saltar la caché del CDN
 * de Blob y garantizar que tras guardar en el admin se lea siempre la versión
 * más reciente (no dependemos del `uploadedAt` de list(), que es de
 * consistencia eventual y puede llegar desfasado tras un overwrite).
 * Devuelve null si no hay Blob configurado (se usará el seed local).
 */
export async function getContentBlobUrl(): Promise<string | null> {
  if (!hasBlobToken()) return null;
  const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
  const blob = blobs[0];
  if (!blob) return null;
  return `${blob.url}?t=${Date.now()}`;
}

/** Guarda (sobrescribe) el content.json en Blob. */
export async function putContent(data: unknown) {
  const body = JSON.stringify(data, null, 2);
  return put(CONTENT_PATHNAME, body, {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0, // sin caché de CDN: lecturas siempre frescas tras editar
  });
}
