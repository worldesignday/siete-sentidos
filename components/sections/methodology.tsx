import Image from "next/image";
import { Heart } from "lucide-react";
import type { SiteContent } from "@/lib/schema";

export function Methodology({ methodology }: { methodology: SiteContent["methodology"] }) {
  return (
    <div id="metodologia" className="bg-white font-body text-slate-700">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10 md:left-20 shape-blue opacity-90 hidden sm:block" />
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-brand-purple rounded-full hidden sm:block" />

        <header className="text-center mb-16 relative z-10">
          <h2 className="font-display font-semibold text-4xl md:text-6xl text-emerald-600 leading-tight mb-6 max-w-5xl mx-auto tracking-tight">
            {methodology.title}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {methodology.subtitle}
          </p>
        </header>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="overflow-hidden rounded-[20px] transform transition hover:scale-[1.02] duration-300">
              <Image
                src={methodology.imageLeft}
                alt="Experiencias siete sentidos"
                width={800}
                height={600}
                className="w-full object-cover min-h-[400px]"
              />
            </div>

            <div className="bg-stone-50 rounded-[20px] p-10 md:p-12 flex flex-col items-center text-center justify-center shadow-sm border border-stone-100">
              <div className="mb-4">
                <Heart className="w-6 h-6 text-brand-red opacity-80" />
              </div>

              <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-4">
                {methodology.cardEyebrow}
              </span>

              <h3 className="font-display text-[22px] md:text-[26px] text-slate-800 leading-tight mb-8">
                {methodology.cardTitle}
              </h3>

              <div className="space-y-6 text-slate-600 leading-relaxed text-base">
                {methodology.cardParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[20px] transform transition hover:scale-[1.02] duration-300">
              <Image
                src={methodology.imageRight}
                alt="Experiencias siete sentidos"
                width={800}
                height={600}
                className="w-full object-cover min-h-[400px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-4xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {methodology.sensesTitle}
          </h3>
          <p className="text-slate-500 text-lg mb-10">{methodology.sensesSubtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-medium">
            {methodology.senses.map((sense) => (
              <span key={sense.label} className={`rounded-full px-4 py-3 ${sense.className}`}>
                {sense.label}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
