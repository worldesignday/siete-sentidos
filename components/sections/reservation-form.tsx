"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Clock, Calendar, MessageCircle, type LucideIcon } from "lucide-react";
import type { SiteContent } from "@/lib/schema";
import { waLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  clock: Clock,
  calendar: Calendar,
};

export function ReservationForm({
  reservation,
  whatsappNumber,
}: {
  reservation: SiteContent["reservation"];
  whatsappNumber: string;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [week, setWeek] = useState(reservation.weekOptions[0] ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message =
      `Hola, quiero reservar el cupo del Campo de Verano Siete Sentidos 2026.` +
      `\n- Acudiente: ${name || "(sin nombre)"}` +
      `\n- Edad del niño: ${age || "(sin edad)"}` +
      `\n- Teléfono: ${phone || "(sin teléfono)"}` +
      `\n- Semana de interés: ${week}`;
    window.open(waLink(whatsappNumber, message), "_blank", "noopener");
  }

  return (
    <div
      id="reserva"
      className="bg-cover bg-center flex items-center justify-center p-4 md:p-8 py-16"
      style={{ backgroundImage: `url('${reservation.backgroundImage}')` }}
    >
      <div className="max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        {/* Info */}
        <div className="lg:w-1/2 relative min-h-[400px] bg-black/45">
          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-center text-white">
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">{reservation.title}</h2>
            <p className="font-body text-lg mb-10 opacity-90 leading-relaxed max-w-md">{reservation.intro}</p>

            <div className="space-y-6 font-body">
              {reservation.info.map((row, i) => {
                const Icon = ICONS[row.icon] ?? MapPin;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm md:text-base">{row.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre del acudiente</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Edad del niño</Label>
                <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ej: 7" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Semana(s) de interés</Label>
              <Select value={week} onValueChange={(v) => setWeek(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reservation.weekOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-display font-semibold py-6 rounded-full shadow-lg"
            >
              {reservation.submitLabel}
            </Button>

            <a
              href={waLink(whatsappNumber, reservation.whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="w-full flex items-center justify-center gap-2 border-2 border-whatsapp-green text-whatsapp-green font-bold py-3.5 rounded-full hover:bg-whatsapp-green hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {reservation.whatsappLabel}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
