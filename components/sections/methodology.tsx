import Image from "next/image";
import type { SiteContent } from "@/lib/schema";
import { Reveal } from "@/components/reveal";

// Colores del diseño (Tailwind Play o5SnznAdGl), fijos por índice.
const PAIN_CARD_BG = ["bg-[#efeef6]", "bg-[#fff8e1]", "bg-[#e6f4f1]"];

const SENSE_CHIP = [
  "bg-[#f0edf7] text-brand-purple",
  "bg-[#e3f4f9] text-[#00acc1]",
  "bg-[#fef4eb] text-[#f4511e]",
  "bg-[#e8f4ef] text-[#43a047]",
  "bg-[#feeef2] text-[#e91e63]",
  "bg-[#effaf6] text-[#00897b]",
  "bg-[#fff8e1] text-[#fbc02d]",
  "bg-[#f0f4f9] text-[#546e7a]",
];

export function Methodology({
  pain,
  methodology,
}: {
  pain: SiteContent["pain"];
  methodology: SiteContent["methodology"];
}) {
  return (
    <div
      id="metodologia"
      className="bg-white font-body text-slate-700 py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Top: imagen + identificación ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Reveal>
            <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src={methodology.imageLeft}
                alt="Experiencias siete sentidos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-6">
            <div>
              <span className="inline-block bg-red-50 text-red-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-3">
                {pain.eyebrow}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d4031] leading-tight">
                {pain.title}
              </h2>
            </div>

            <div className="space-y-4">
              {pain.cards.map((card, i) => (
                <div key={i} className={`p-5 rounded-2xl ${PAIN_CARD_BG[i % PAIN_CARD_BG.length]}`}>
                  <p className="text-sm leading-relaxed text-slate-600">{card}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Texto central ── */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#5d7d8b] text-lg leading-relaxed">{pain.closing}</p>
        </div>

        {/* ── Burbuja morada ── */}
        <Reveal>
          <div className="relative max-w-5xl mx-auto mb-20">
            <div className="bg-[#5e4992] text-white p-8 md:p-12 rounded-[40px] relative z-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
                {methodology.title}
              </h2>
              <div className="space-y-6 text-purple-100 font-light max-w-4xl">
                {methodology.cardParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            {/* Colita del bocadillo */}
            <div className="absolute bottom-[-20px] right-24 w-12 h-12 bg-[#5e4992] rotate-45 z-0 hidden md:block" />
          </div>
        </Reveal>

        {/* ── Los 7 sentidos ── */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#2d4031] mb-2">
            {methodology.sensesTitle}
          </h2>
          <p className="text-slate-500 mb-10">{methodology.sensesSubtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {methodology.senses.map((sense, i) => (
              <div
                key={sense.label}
                className={`py-3 px-6 rounded-full font-medium text-sm ${SENSE_CHIP[i % SENSE_CHIP.length]}`}
              >
                {sense.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
