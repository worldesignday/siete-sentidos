/**
 * Autenticación mínima del panel admin: una contraseña compartida
 * (ADMIN_PASSWORD) que emite una cookie de sesión firmada por HMAC.
 * Usa Web Crypto para funcionar igual en Node y en el middleware (edge).
 */

export const SESSION_COOKIE = "ss_admin";
const SESSION_SUBJECT = "siete-sentidos-admin";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

async function hmacHex(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token determinista de sesión (dado el secreto). */
export async function sessionToken(): Promise<string> {
  return hmacHex(SESSION_SUBJECT);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await sessionToken();
  // comparación de tiempo aproximadamente constante
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
