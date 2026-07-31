import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function MobileCta({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 p-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <a
          href="#reserva"
          className="flex-1 text-center bg-brand-orange text-white font-display font-semibold py-3 rounded-full text-sm shadow-md"
        >
          Reservar cupo
        </a>
        <a
          href={waLink(whatsappNumber, "Hola, quiero información del Campo de Verano Siete Sentidos 2026")}
          target="_blank"
          rel="noopener"
          className="flex-1 text-center bg-whatsapp-green text-white font-display font-semibold py-3 rounded-full text-sm shadow-md flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
      <div className="lg:hidden h-20" />
    </>
  );
}
