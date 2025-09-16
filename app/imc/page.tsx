"use client"

import { useState } from "react"
import { Calculator, ArrowLeft, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface IMCResult {
  imc: number
  classification: string
  description: string
  color: string
  idealWeight: { min: number; max: number }
}

export default function IMCPage() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<IMCResult | null>(null)

  const calculateIMC = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height) / 100 // Convert cm to meters

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      return
    }

    const imc = weightNum / (heightNum * heightNum)
    const idealWeightMin = 18.5 * (heightNum * heightNum)
    const idealWeightMax = 24.9 * (heightNum * heightNum)

    let classification = ""
    let description = ""
    let color = ""

    if (imc < 18.5) {
      classification = "Abaixo do peso"
      description = "Você está abaixo do peso ideal. Considere consultar um nutricionista."
      color = "text-blue-600"
    } else if (imc >= 18.5 && imc < 25) {
      classification = "Peso normal"
      description = "Parabéns! Você está dentro do peso ideal para sua altura."
      color = "text-green-600"
    } else if (imc >= 25 && imc < 30) {
      classification = "Sobrepeso"
      description = "Você está com sobrepeso. Uma dieta equilibrada e exercícios podem ajudar."
      color = "text-yellow-600"
    } else if (imc >= 30 && imc < 35) {
      classification = "Obesidade Grau I"
      description = "Obesidade grau I. Recomenda-se acompanhamento médico e nutricional."
      color = "text-orange-600"
    } else if (imc >= 35 && imc < 40) {
      classification = "Obesidade Grau II"
      description = "Obesidade grau II. É importante buscar orientação médica especializada."
      color = "text-red-600"
    } else {
      classification = "Obesidade Grau III"
      description = "Obesidade grau III. Procure acompanhamento médico urgente."
      color = "text-red-800"
    }

    setResult({
      imc: Math.round(imc * 100) / 100,
      classification,
      description,
      color,
      idealWeight: {
        min: Math.round(idealWeightMin * 10) / 10,
        max: Math.round(idealWeightMax * 10) / 10,
      },
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Calculadora de IMC</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Calculator Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Calcule seu Índice de Massa Corporal</CardTitle>
              <CardDescription>Insira seus dados para descobrir seu IMC e classificação de peso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculateIMC}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={!weight || !height}
                >
                  Calcular IMC
                </Button>
                <Button onClick={resetCalculator} variant="outline" disabled={!result}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Seus Resultados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">{result.imc}</div>
                  <div className={`text-xl font-semibold ${result.color} mb-2`}>{result.classification}</div>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Peso Ideal</h4>
                    <p className="text-sm text-muted-foreground">
                      Entre <span className="font-semibold text-foreground">{result.idealWeight.min} kg</span> e{" "}
                      <span className="font-semibold text-foreground">{result.idealWeight.max} kg</span>
                    </p>
                  </div>
                  <div className="p-4 bg-card border rounded-lg">
                    <h4 className="font-semibold mb-2">Seu IMC</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{result.imc}</span> kg/m²
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Sobre o IMC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  O Índice de Massa Corporal (IMC) é uma medida que relaciona peso e altura para avaliar se uma pessoa
                  está dentro do peso considerado saudável.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Classificações do IMC:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Abaixo do peso:</span>
                      <span className="text-blue-600">Menor que 18,5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peso normal:</span>
                      <span className="text-green-600">18,5 - 24,9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sobrepeso:</span>
                      <span className="text-yellow-600">25,0 - 29,9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obesidade Grau I:</span>
                      <span className="text-orange-600">30,0 - 34,9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obesidade Grau II:</span>
                      <span className="text-red-600">35,0 - 39,9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obesidade Grau III:</span>
                      <span className="text-red-800">Maior que 40,0</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    O IMC é uma ferramenta de triagem e não substitui a avaliação médica. Consulte sempre um
                    profissional de saúde para orientações personalizadas.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
