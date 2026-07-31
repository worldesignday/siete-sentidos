import Image from "next/image";
import type { SiteContent } from "@/lib/schema";
import { Reveal } from "@/components/reveal";

export function Testimonials({ testimonials }: { testimonials: SiteContent["testimonials"] }) {
  return (
    <div id="testimonios" className="bg-white font-body text-slate-700 py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-4 inline-block">
          {testimonials.eyebrow}
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-slate-800 font-bold leading-tight">
          {testimonials.title}
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.items.map((t, i) => (
          <Reveal key={i} delay={(i % 4) * 0.08}>
            <div className="relative group">
              <div
                className={`bg-white transition-transform group-hover:rotate-0 rounded-xl overflow-hidden shadow-sm ${
                  t.tilt === "left" ? "-rotate-1" : "rotate-1"
                }`}
              >
                <Image src={t.image} alt={t.author} width={400} height={400} className="w-full h-auto" />
              </div>
              <div className="mt-6 px-2">
                <span className="text-brand-green text-4xl font-serif leading-none block h-6">&ldquo;</span>
                <p className="text-sm leading-relaxed text-slate-600 italic">{t.quote}</p>
                <p className="text-xs font-bold text-slate-400 mt-2">{t.author}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
