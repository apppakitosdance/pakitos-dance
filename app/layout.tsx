import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Calculadora Academia Pakitos Dance",
  description: "Calculadoras de IMC, Gordura Corporal e TMB - Academia Pakitos Dance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}

