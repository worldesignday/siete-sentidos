import { z } from "zod";

/**
 * Esquema único de todo el contenido editable de la landing.
 * Es la fuente de verdad: valida el content.json guardado en Vercel Blob
 * y de él se derivan los tipos de TypeScript usados en toda la app.
 */

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const contentSchema = z.object({
  site: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogTitle: z.string(),
    ogDescription: z.string(),
    ogImage: z.string(),
    canonicalUrl: z.string(),
    whatsappNumber: z.string(), // solo dígitos, formato internacional, p.ej. 573026016560
    nav: z.array(navItemSchema),
  }),

  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    dateLocation: z.string(),
    primaryCta: z.string(),
    secondaryCta: ctaSchema,
    discountNote: z.string(),
    backgroundImage: z.string(),
  }),

  pain: z.object({
    eyebrow: z.string(),
    title: z.string(),
    cards: z.array(z.string()),
    closing: z.string(),
  }),

  methodology: z.object({
    title: z.string(),
    subtitle: z.string(),
    imageLeft: z.string(),
    imageRight: z.string(),
    cardEyebrow: z.string(),
    cardTitle: z.string(),
    cardParagraphs: z.array(z.string()),
    sensesTitle: z.string(),
    sensesSubtitle: z.string(),
    senses: z.array(
      z.object({
        label: z.string(),
        className: z.string(), // clases Tailwind para el chip
      })
    ),
  }),

  daySchedule: z.object({
    title: z.string(),
    logo: z.string(),
    items: z.array(
      z.object({
        icon: z.string(),
        time: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),

  weeks: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaLabel: z.string(),
    items: z.array(
      z.object({
        image: z.string(),
        badge: z.string(),
        title: z.string(),
        description: z.string(),
        accentClass: z.string(), // clase de color para el título
      })
    ),
  }),

  testimonials: z.object({
    eyebrow: z.string(),
    title: z.string(),
    items: z.array(
      z.object({
        image: z.string(),
        quote: z.string(),
        author: z.string(),
        tilt: z.enum(["left", "right"]),
      })
    ),
  }),

  founder: z.object({
    image: z.string(),
    name: z.string(),
    role: z.string(),
    credential: z.string(),
    quote: z.string(),
    bio: z.string(),
  }),

  pricing: z.object({
    eyebrow: z.string(),
    title: z.string(),
    discountNotes: z.array(z.string()),
    footnote: z.string(),
    plans: z.array(
      z.object({
        badge: z.string().optional(),
        label: z.string(),
        price: z.string(),
        schedule: z.string(),
        highlighted: z.boolean(),
        features: z.array(
          z.object({
            text: z.string(),
            muted: z.boolean(),
          })
        ),
        ctaLabel: z.string(),
        whatsappMessage: z.string(),
      })
    ),
  }),

  faq: z.object({
    eyebrow: z.string(),
    title: z.string(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),

  reservation: z.object({
    backgroundImage: z.string(),
    title: z.string(),
    intro: z.string(),
    info: z.array(
      z.object({
        icon: z.string(),
        text: z.string(),
      })
    ),
    weekOptions: z.array(z.string()),
    submitLabel: z.string(),
    whatsappLabel: z.string(),
    whatsappMessage: z.string(),
  }),

  footer: z.object({
    phones: z.array(z.string()),
    advisorPhone: z.string(),
    address: z.string(),
    email: z.string(),
    copyright: z.string(),
  }),
});

export type SiteContent = z.infer<typeof contentSchema>;
