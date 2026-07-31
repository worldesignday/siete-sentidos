import { Check, MessageCircle } from "lucide-react";
import type { SiteContent } from "@/lib/schema";
import { waLink } from "@/lib/whatsapp";

export function Pricing({
  pricing,
  whatsappNumber,
}: {
  pricing: SiteContent["pricing"];
  whatsappNumber: string;
}) {
  return (
    <div id="precios" className="bg-primary-purple font-body text-white pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
        <span className="text-yellow-300 font-bold text-xs tracking-widest uppercase">{pricing.eyebrow}</span>
        <h2 className="font-display text-4xl font-bold">{pricing.title}</h2>
        {pricing.discountNotes.map((note, i) => (
          <p key={i} className="text-white/90 text-lg">
            {note}
          </p>
        ))}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {pricing.plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-8 flex flex-col text-slate-800 shadow-xl relative ${
              plan.highlighted ? "border-4 border-whatsapp-green/20" : "border border-white/20"
            }`}
          >
            {plan.badge ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-full shadow-md">
                {plan.badge}
              </span>
            ) : null}
            <div className="text-center mb-6">
              <span className="text-sm font-medium bg-slate-100 px-4 py-1 rounded-full text-slate-600">
                {plan.label}
              </span>
              <div className="text-4xl font-bold mt-4 text-slate-900">{plan.price}</div>
              <div className="text-slate-400 text-sm mt-1">{plan.schedule}</div>
            </div>
            <div className="grow space-y-4 my-6 border-t border-slate-100 pt-6">
              {plan.features.map((feature, j) => (
                <div
                  key={j}
                  className={`flex items-center gap-3 text-sm ${feature.muted ? "text-slate-400" : ""}`}
                >
                  <Check className={`w-5 h-5 shrink-0 ${feature.muted ? "text-slate-300" : "text-whatsapp-green"}`} />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            <a
              href={waLink(whatsappNumber, plan.whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="w-full flex justify-center items-center gap-2 bg-whatsapp-green py-3 rounded-full font-bold text-white hover:opacity-90 transition-opacity"
            >
              {plan.ctaLabel}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-white/90 text-md">{pricing.footnote}</p>
      </div>
    </div>
  );
}
