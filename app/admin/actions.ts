"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, sessionToken, SESSION_COOKIE } from "@/lib/auth";
import { putContent } from "@/lib/blob";
import { contentSchema } from "@/lib/schema";

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Contraseña incorrecta." };
  }
  const store = await cookies();
  store.set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type SaveResult = { ok: boolean; error?: string };

export async function saveContentAction(data: unknown): Promise<SaveResult> {
  const parsed = contentSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "El contenido no cumple el esquema: " + parsed.error.issues[0]?.message };
  }
  try {
    await putContent(parsed.data);
    return { ok: true };
  } catch (error) {
    console.error("[admin] error guardando en Blob:", error);
    return { ok: false, error: "No se pudo guardar en Blob. ¿Está configurado BLOB_READ_WRITE_TOKEN?" };
  }
}
