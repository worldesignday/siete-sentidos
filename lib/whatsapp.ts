/** Construye un deep link de WhatsApp con mensaje prellenado (URL-encoded). */
export function waLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
