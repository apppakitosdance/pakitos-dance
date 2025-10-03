"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, BookOpen, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "adminpakitos") {
      setError("")
      setOpen(false)
      router.push("/manual")
    } else {
      setError("Senha incorreta. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Academia Pakitos Dance</h1>
          <p className="text-muted-foreground">Sua jornada fitness começa aqui</p>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Manual de Exercícios - Protected */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-auto py-6 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all bg-transparent"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg text-foreground">Manual de Exercícios</h3>
                    <p className="text-sm text-muted-foreground">Acesso restrito</p>
                  </div>
                  <Lock className="h-5 w-5 text-primary" />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Acesso Restrito</DialogTitle>
                <DialogDescription>Digite a senha para acessar o Manual de Exercícios</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    className="w-full"
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Acessar
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Calculadora de IMC e TMB */}
          <Link href="/calculadoras" className="block">
            <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-2 border-primary/50 hover:border-primary cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/20 rounded-full border border-primary/30">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-primary">Calculadora de IMC e TMB</CardTitle>
                    <CardDescription className="text-base">Calcule seu IMC e Taxa Metabólica Basal</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitore sua composição corporal e necessidades calóricas com precisão
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground pt-8">
          <p className="text-sm">© 2025 Academia Pakitos Dance</p>
          <p className="text-xs mt-1">Desenvolvido por Rafael Nunes Gasperini</p>
        </footer>
      </div>
    </div>
  )
}
