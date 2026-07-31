import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/schema";

export function Footer({ footer }: { footer: SiteContent["footer"] }) {
  return (
    <div className="bg-white px-6 py-12 font-body text-gray-700">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-display text-lg text-black font-semibold leading-tight mb-1">Hablemos</h3>
            <ul className="text-sm space-y-0.5 opacity-80">
              {footer.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MessageCircle className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-display text-lg text-black font-semibold leading-tight mb-1">Consulta con un asesor</h3>
            <p className="text-sm opacity-80">
              +57 <span className="underline underline-offset-2">{footer.advisorPhone}</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-display text-lg text-black font-semibold leading-tight mb-1">¿Dónde estamos?</h3>
            <p className="text-sm opacity-80">{footer.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-display text-lg text-black font-semibold leading-tight mb-1">Escríbenos</h3>
            <p className="text-sm opacity-80">{footer.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">{footer.copyright}</p>
      </div>
    </div>
  );
}
