import Image from "next/image";
import type { SiteContent } from "@/lib/schema";
import { Reveal } from "@/components/reveal";

export function DaySchedule({ daySchedule }: { daySchedule: SiteContent["daySchedule"] }) {
  return (
    <div className="bg-bg-light font-body text-slate-700 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="font-display text-3xl md:text-5xl text-brand-green font-bold leading-tight mb-4">
          {daySchedule.title}
        </h2>
        <Image
          src={daySchedule.logo}
          alt="Siete Sentidos"
          width={180}
          height={64}
          className="mx-auto h-16 w-auto mt-6"
        />
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {daySchedule.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green flex items-center justify-center shadow-lg mb-4">
                <Image src={item.icon} alt="" width={24} height={24} className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800">{item.time}</p>
              <p className="text-xs text-slate-500 mb-2">{item.title}</p>
              <p className="text-xs text-slate-600 leading-tight">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
