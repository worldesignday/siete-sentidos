import { getContent } from "@/lib/content";
import { AdminEditor } from "@/components/admin/admin-editor";
import { logoutAction } from "./actions";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">Editor de contenido</h1>
            <p className="text-xs text-muted-foreground">Siete Sentidos · Campo de Verano 2026</p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              Salir
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-6">
        <AdminEditor initial={content} />
      </main>
    </div>
  );
}
