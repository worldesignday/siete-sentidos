"use client";

import { useState, type ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFieldArray,
  useFormContext,
  type FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentSchema, type SiteContent } from "@/lib/schema";
import { saveContentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextField, AreaField } from "./fields";

type Name = FieldPath<SiteContent>;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group bg-card border rounded-xl px-5 py-4 open:shadow-sm" open>
      <summary className="cursor-pointer font-display font-semibold text-lg list-none flex items-center justify-between">
        {title}
        <span className="text-muted-foreground text-sm group-open:rotate-90 transition-transform">›</span>
      </summary>
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}

function ItemCard({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return (
    <div className="relative border rounded-lg p-4 space-y-3 bg-muted/30">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      {children}
    </div>
  );
}

/** Editor de un array de strings simples. */
function StringArray({ name, label, itemLabel }: { name: string; label: string; itemLabel: string }) {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: name as never });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => append("" as never)}>
          <Plus className="w-4 h-4 mr-1" /> Añadir
        </Button>
      </div>
      {fields.map((f, i) => (
        <div key={f.id} className="flex gap-2 items-center">
          <Input placeholder={itemLabel} {...register(`${name}.${i}` as Name)} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => remove(i)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <Plus className="w-4 h-4 mr-1" /> {label}
    </Button>
  );
}

/** Sub-editor de las características de un plan de precios (array anidado). */
function PlanFeatures({ planIndex }: { planIndex: number }) {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `pricing.plans.${planIndex}.features` as never,
  });
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-muted-foreground">Características</Label>
        <AddButton label="Añadir" onClick={() => append({ text: "", muted: false } as never)} />
      </div>
      {fields.map((f, j) => (
        <div key={f.id} className="flex gap-2 items-center">
          <Input {...register(`pricing.plans.${planIndex}.features.${j}.text` as Name)} />
          <label className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <input type="checkbox" {...register(`pricing.plans.${planIndex}.features.${j}.muted` as Name)} />
            atenuado
          </label>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => remove(j)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function NavEditor() {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "site.nav" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Navegación</Label>
        <AddButton label="Añadir enlace" onClick={() => append({ label: "", href: "#" })} />
      </div>
      {fields.map((f, i) => (
        <div key={f.id} className="flex gap-2">
          <Input placeholder="Etiqueta" {...register(`site.nav.${i}.label` as Name)} />
          <Input placeholder="#ancla" {...register(`site.nav.${i}.href` as Name)} />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function SensesEditor() {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "methodology.senses" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Sentidos</Label>
        <AddButton label="Añadir" onClick={() => append({ label: "", className: "bg-slate-100 text-slate-600" })} />
      </div>
      {fields.map((f, i) => (
        <div key={f.id} className="flex gap-2">
          <Input placeholder="Nombre" {...register(`methodology.senses.${i}.label` as Name)} />
          <Input placeholder="Clases Tailwind" {...register(`methodology.senses.${i}.className` as Name)} />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function ScheduleEditor() {
  const { control } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "daySchedule.items" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Momentos del día</Label>
        <AddButton
          label="Añadir"
          onClick={() => append({ icon: "/images/icon-8am.svg", time: "", title: "", description: "" })}
        />
      </div>
      {fields.map((f, i) => (
        <ItemCard key={f.id} onRemove={() => remove(i)}>
          <div className="grid grid-cols-2 gap-3">
            <TextField name={`daySchedule.items.${i}.time`} label="Hora" />
            <TextField name={`daySchedule.items.${i}.title`} label="Título" />
          </div>
          <TextField name={`daySchedule.items.${i}.icon`} label="Ícono (ruta)" />
          <AreaField name={`daySchedule.items.${i}.description`} label="Descripción" />
        </ItemCard>
      ))}
    </div>
  );
}

function WeeksEditor() {
  const { control } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "weeks.items" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Universos / Semanas</Label>
        <AddButton
          label="Añadir semana"
          onClick={() =>
            append({ image: "/images/semana1.webp", badge: "", title: "", description: "", accentClass: "text-yellow-400" })
          }
        />
      </div>
      {fields.map((f, i) => (
        <ItemCard key={f.id} onRemove={() => remove(i)}>
          <TextField name={`weeks.items.${i}.title`} label="Título" />
          <TextField name={`weeks.items.${i}.badge`} label="Etiqueta (semana · fechas)" />
          <AreaField name={`weeks.items.${i}.description`} label="Descripción" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name={`weeks.items.${i}.image`} label="Imagen (ruta)" />
            <TextField name={`weeks.items.${i}.accentClass`} label="Color del título (clase)" />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}

function TestimonialsEditor() {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "testimonials.items" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Testimonios</Label>
        <AddButton
          label="Añadir"
          onClick={() => append({ image: "/images/dia1.png", quote: "", author: "", tilt: "left" })}
        />
      </div>
      {fields.map((f, i) => (
        <ItemCard key={f.id} onRemove={() => remove(i)}>
          <AreaField name={`testimonials.items.${i}.quote`} label="Cita" />
          <div className="grid grid-cols-2 gap-3 items-end">
            <TextField name={`testimonials.items.${i}.author`} label="Autor" />
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Inclinación</Label>
              <select
                className="w-full border rounded-md h-9 px-2 text-sm bg-transparent"
                {...register(`testimonials.items.${i}.tilt` as Name)}
              >
                <option value="left">Izquierda</option>
                <option value="right">Derecha</option>
              </select>
            </div>
          </div>
          <TextField name={`testimonials.items.${i}.image`} label="Imagen (ruta)" />
        </ItemCard>
      ))}
    </div>
  );
}

function PlansEditor() {
  const { control, register } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "pricing.plans" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Planes</Label>
        <AddButton
          label="Añadir plan"
          onClick={() =>
            append({
              label: "",
              price: "",
              schedule: "",
              highlighted: false,
              features: [],
              ctaLabel: "Hablar con un asesor",
              whatsappMessage: "",
            })
          }
        />
      </div>
      {fields.map((f, i) => (
        <ItemCard key={f.id} onRemove={() => remove(i)}>
          <div className="grid grid-cols-2 gap-3">
            <TextField name={`pricing.plans.${i}.label`} label="Etiqueta" />
            <TextField name={`pricing.plans.${i}.price`} label="Precio" />
          </div>
          <TextField name={`pricing.plans.${i}.schedule`} label="Horario" />
          <div className="grid grid-cols-2 gap-3 items-end">
            <TextField name={`pricing.plans.${i}.badge`} label="Badge (opcional)" />
            <label className="flex items-center gap-2 text-sm h-9">
              <input type="checkbox" {...register(`pricing.plans.${i}.highlighted` as Name)} />
              Destacado
            </label>
          </div>
          <PlanFeatures planIndex={i} />
          <div className="grid grid-cols-2 gap-3">
            <TextField name={`pricing.plans.${i}.ctaLabel`} label="Texto del botón" />
            <TextField name={`pricing.plans.${i}.whatsappMessage`} label="Mensaje WhatsApp" />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}

function FaqEditor() {
  const { control } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "faq.items" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Preguntas</Label>
        <AddButton label="Añadir pregunta" onClick={() => append({ question: "", answer: "" })} />
      </div>
      {fields.map((f, i) => (
        <ItemCard key={f.id} onRemove={() => remove(i)}>
          <TextField name={`faq.items.${i}.question`} label="Pregunta" />
          <AreaField name={`faq.items.${i}.answer`} label="Respuesta" />
        </ItemCard>
      ))}
    </div>
  );
}

function InfoEditor() {
  const { control } = useFormContext<SiteContent>();
  const { fields, append, remove } = useFieldArray({ control, name: "reservation.info" });
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Datos del formulario (info)</Label>
        <AddButton label="Añadir" onClick={() => append({ icon: "map-pin", text: "" })} />
      </div>
      {fields.map((f, i) => (
        <div key={f.id} className="grid grid-cols-[160px_1fr_auto] gap-2 items-center">
          <TextField name={`reservation.info.${i}.icon`} label="Ícono (map-pin/clock/calendar)" />
          <TextField name={`reservation.info.${i}.text`} label="Texto" />
        </div>
      ))}
    </div>
  );
}

export function AdminEditor({ initial }: { initial: SiteContent }) {
  const [saving, setSaving] = useState(false);
  const methods = useForm<SiteContent>({
    defaultValues: initial,
    resolver: zodResolver(contentSchema),
  });

  async function onSubmit(data: SiteContent) {
    setSaving(true);
    const res = await saveContentAction(data);
    setSaving(false);
    if (res.ok) toast.success("Contenido guardado y publicado.");
    else toast.error(res.error ?? "Error al guardar.");
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5 pb-32">
        <Section title="Sitio y SEO">
          <TextField name="site.seoTitle" label="Título SEO" />
          <AreaField name="site.seoDescription" label="Descripción SEO" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="site.ogTitle" label="OG título" />
            <TextField name="site.whatsappNumber" label="Número WhatsApp (solo dígitos)" />
          </div>
          <AreaField name="site.ogDescription" label="OG descripción" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="site.ogImage" label="OG imagen (URL)" />
            <TextField name="site.canonicalUrl" label="URL canónica" />
          </div>
          <NavEditor />
        </Section>

        <Section title="Hero">
          <TextField name="hero.badge" label="Badge" />
          <AreaField name="hero.title" label="Título" />
          <AreaField name="hero.subtitle" label="Subtítulo" />
          <TextField name="hero.dateLocation" label="Fecha y lugar" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="hero.primaryCta" label="CTA principal" />
            <TextField name="hero.secondaryCta.label" label="CTA secundario (texto)" />
          </div>
          <AreaField name="hero.discountNote" label="Nota de descuentos" />
          <TextField name="hero.backgroundImage" label="Imagen de fondo (ruta)" />
        </Section>

        <Section title="Dolor / Identificación">
          <TextField name="pain.eyebrow" label="Eyebrow" />
          <AreaField name="pain.title" label="Título" />
          <StringArray name="pain.cards" label="Tarjetas" itemLabel="Texto de la tarjeta" />
          <AreaField name="pain.closing" label="Cierre" />
        </Section>

        <Section title="Metodología">
          <AreaField name="methodology.title" label="Título" />
          <AreaField name="methodology.subtitle" label="Subtítulo" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="methodology.imageLeft" label="Imagen izquierda" />
            <TextField name="methodology.imageRight" label="Imagen derecha" />
          </div>
          <TextField name="methodology.cardEyebrow" label="Tarjeta: eyebrow" />
          <TextField name="methodology.cardTitle" label="Tarjeta: título" />
          <StringArray name="methodology.cardParagraphs" label="Tarjeta: párrafos" itemLabel="Párrafo" />
          <TextField name="methodology.sensesTitle" label="Sentidos: título" />
          <TextField name="methodology.sensesSubtitle" label="Sentidos: subtítulo" />
          <SensesEditor />
        </Section>

        <Section title="Un día en...">
          <TextField name="daySchedule.title" label="Título" />
          <ScheduleEditor />
        </Section>

        <Section title="Universos / Semanas">
          <TextField name="weeks.title" label="Título" />
          <AreaField name="weeks.subtitle" label="Subtítulo" />
          <TextField name="weeks.ctaLabel" label="Texto del CTA" />
          <WeeksEditor />
        </Section>

        <Section title="Testimonios">
          <TextField name="testimonials.eyebrow" label="Eyebrow" />
          <TextField name="testimonials.title" label="Título" />
          <TestimonialsEditor />
        </Section>

        <Section title="Fundadora">
          <TextField name="founder.image" label="Imagen (URL)" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="founder.name" label="Nombre" />
            <TextField name="founder.role" label="Rol" />
          </div>
          <TextField name="founder.credential" label="Credencial" />
          <AreaField name="founder.quote" label="Cita" />
          <AreaField name="founder.bio" label="Biografía" rows={4} />
        </Section>

        <Section title="Precios">
          <TextField name="pricing.eyebrow" label="Eyebrow" />
          <TextField name="pricing.title" label="Título" />
          <StringArray name="pricing.discountNotes" label="Notas de descuento" itemLabel="Nota" />
          <TextField name="pricing.footnote" label="Nota al pie" />
          <PlansEditor />
        </Section>

        <Section title="Preguntas frecuentes">
          <TextField name="faq.eyebrow" label="Eyebrow" />
          <TextField name="faq.title" label="Título" />
          <FaqEditor />
        </Section>

        <Section title="Formulario de reserva">
          <TextField name="reservation.backgroundImage" label="Imagen de fondo (ruta)" />
          <AreaField name="reservation.title" label="Título" />
          <AreaField name="reservation.intro" label="Introducción" />
          <InfoEditor />
          <StringArray name="reservation.weekOptions" label="Opciones de semana" itemLabel="Opción" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="reservation.submitLabel" label="Texto del botón enviar" />
            <TextField name="reservation.whatsappLabel" label="Texto del botón WhatsApp" />
          </div>
          <TextField name="reservation.whatsappMessage" label="Mensaje WhatsApp" />
        </Section>

        <Section title="Footer">
          <StringArray name="footer.phones" label="Teléfonos" itemLabel="Teléfono" />
          <div className="grid grid-cols-2 gap-3">
            <TextField name="footer.advisorPhone" label="Teléfono asesor" />
            <TextField name="footer.email" label="Email" />
          </div>
          <TextField name="footer.address" label="Dirección" />
          <TextField name="footer.copyright" label="Copyright" />
        </Section>

        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 z-50">
          <div className="max-w-4xl mx-auto flex justify-end">
            <Button type="submit" size="lg" disabled={saving}>
              {saving ? "Guardando…" : "Guardar y publicar"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
