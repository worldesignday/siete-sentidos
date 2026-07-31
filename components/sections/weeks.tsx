import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { SiteContent } from "@/lib/schema";
import { Reveal } from "@/components/reveal";

export function Weeks({ weeks }: { weeks: SiteContent["weeks"] }) {
  return (
    <div
      id="semanas"
      className="bg-primary-purple font-body text-white pb-20"
    >
      <header className="pt-12 pb-16 text-center px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 max-w-6xl mx-auto">{weeks.title}</h2>
        <p className="text-white text-lg">{weeks.subtitle}</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weeks.items.map((week, i) => (
          <Reveal key={i} delay={(i % 3) * 0.1}>
            <div className="bg-white/5 rounded-[20px] overflow-hidden border border-white/10 flex flex-col h-full">
              <div className="relative w-full h-48">
                <Image src={week.image} alt={week.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6 grow flex flex-col gap-2">
                <span className="inline-block w-fit px-4 py-1 border border-white/40 rounded-full font-medium bg-white/10 text-xs">
                  {week.badge}
                </span>
                <h3 className={`font-display text-xl font-bold ${week.accentClass}`}>{week.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{week.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </main>

      <div className="text-center mt-12">
        <a
          href="#reserva"
          className="inline-flex items-center gap-2 bg-whatsapp-green hover:bg-green-500 transition-colors px-8 py-4 rounded-full font-semibold text-white shadow-lg text-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {weeks.ctaLabel}
        </a>
      </div>
    </div>
  );
}
