import Image from "next/image";
import { Star } from "lucide-react";
import type { SiteContent } from "@/lib/schema";

export function Founder({ founder }: { founder: SiteContent["founder"] }) {
  return (
    <div className="bg-[#f7f6f4] flex items-center justify-center p-6 md:p-8 py-16 md:py-24 font-body relative overflow-hidden">
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-3 bg-[#00aaff] rounded-full rotate-45 hidden lg:block" />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#7e57c2] rounded-full hidden lg:block" />

      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-sm flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 h-[400px] md:h-auto relative min-h-[400px]">
          <Image src={founder.image} alt={founder.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>

        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
          <div className="absolute -left-6 top-10 w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100 hidden md:flex">
            <Star className="w-6 h-6 text-brand-dark" />
          </div>

          <div className="space-y-1 mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight uppercase">
              {founder.name}
            </h2>
            <p className="text-brand-muted text-lg">{founder.role}</p>
            <p className="text-brand-muted text-lg">{founder.credential}</p>
          </div>

          <blockquote className="italic text-brand-muted text-xl leading-relaxed mb-10">
            &ldquo;{founder.quote}&rdquo;
          </blockquote>

          <div className="text-gray-700 leading-relaxed text-lg">
            <p>{founder.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
