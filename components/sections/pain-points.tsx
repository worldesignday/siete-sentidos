import type { SiteContent } from "@/lib/schema";
import { Reveal } from "@/components/reveal";

export function PainPoints({ pain }: { pain: SiteContent["pain"] }) {
  return (
    <div className="bg-white font-body text-slate-700">
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
        <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-4 inline-block">
          {pain.eyebrow}
        </span>
        <h2 className="font-display font-semibold text-3xl md:text-5xl text-slate-800 leading-tight mb-10 max-w-3xl mx-auto">
          {pain.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {pain.cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 h-full">
                <p className="text-slate-600 leading-relaxed">{card}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{pain.closing}</p>
      </main>
    </div>
  );
}
