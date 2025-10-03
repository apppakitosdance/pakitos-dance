import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Manual de Exercícios</h1>
              <p className="text-sm text-muted-foreground">Academia Pakitos Dance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit border border-primary/30">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Manual de Exercícios</h2>
            <p className="text-muted-foreground">
              Conteúdo em desenvolvimento. Em breve você terá acesso a um guia completo de exercícios.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
