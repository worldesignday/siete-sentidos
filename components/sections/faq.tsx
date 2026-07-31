import type { SiteContent } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ faq }: { faq: SiteContent["faq"] }) {
  return (
    <div id="faq" className="bg-white font-body text-slate-700 py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-4 inline-block">
            {faq.eyebrow}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-slate-800 font-bold leading-tight">{faq.title}</h2>
        </div>

        <Accordion className="space-y-4">
          {faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-stone-50 rounded-2xl border border-stone-100 px-6"
            >
              <AccordionTrigger className="font-display font-semibold text-slate-800 text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
