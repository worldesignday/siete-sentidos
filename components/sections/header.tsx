import Image from "next/image";
import type { SiteContent } from "@/lib/schema";

export function Header({ site }: { site: SiteContent["site"] }) {
  return (
    <header className="bg-brand-purple text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative w-40 sm:w-50 h-10 flex items-center">
          <Image
            src="/images/logo-header-siete-sentidos.svg"
            alt="Logo Siete Sentidos"
            width={200}
            height={40}
            priority
            className="scale-105"
          />
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {site.nav.map((item) => (
          <a key={item.href} href={item.href} className="hover:text-brand-orange transition-colors">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="#reserva"
          className="bg-brand-orange text-white px-5 sm:px-6 py-2.5 rounded-full font-display font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          Reservar cupo
        </a>
      </div>
    </header>
  );
}
