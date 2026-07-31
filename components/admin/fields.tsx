"use client";

import { type FieldPath, useFormContext } from "react-hook-form";
import type { SiteContent } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Name = FieldPath<SiteContent>;

export function TextField({ name, label }: { name: string; label: string }) {
  const { register } = useFormContext<SiteContent>();
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input {...register(name as Name)} />
    </div>
  );
}

export function AreaField({ name, label, rows = 3 }: { name: string; label: string; rows?: number }) {
  const { register } = useFormContext<SiteContent>();
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Textarea rows={rows} {...register(name as Name)} />
    </div>
  );
}
