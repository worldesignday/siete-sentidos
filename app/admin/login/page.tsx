"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null as { error?: string } | null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form
        action={formAction}
        className="w-full max-w-sm bg-card border rounded-2xl p-8 shadow-sm space-y-6"
      >
        <div className="space-y-1 text-center">
          <h1 className="font-display text-2xl font-bold">Panel de contenido</h1>
          <p className="text-sm text-muted-foreground">Siete Sentidos</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" autoFocus required />
        </div>

        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
