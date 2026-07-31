import Image from "next/image";
import type { SiteContent } from "@/lib/schema";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden py-16 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage}
          alt="Siete Sentidos"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 bg-brand-orange/90 text-white text-xs md:text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-lg">
          {hero.badge}
        </span>

        <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight max-w-4xl mb-6 drop-shadow-md">
          {hero.title}
        </h1>

        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mb-4 drop-shadow-md">{hero.subtitle}</p>

        <p className="text-xl md:text-2xl font-display font-medium text-brand-yellow mb-10 drop-shadow-md">
          {hero.dateLocation}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#reserva"
            className="pulse-cta bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-display font-semibold text-lg transition-all shadow-2xl active:scale-95"
          >
            {hero.primaryCta}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-display font-semibold text-lg transition-all hover:bg-white hover:text-brand-purple active:scale-95"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <p className="text-sm text-white/80 mt-6">{hero.discountNote}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  );
}
