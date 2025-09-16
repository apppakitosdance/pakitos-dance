"use client"

import { useState } from "react"
import { Activity, ArrowLeft, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface BodyCompositionResult {
  bodyFat: number
  tmb: number
  leanMass: number
  fatMass: number
  dailyCalories: {
    sedentary: number
    light: number
    moderate: number
    intense: number
    veryIntense: number
  }
  bodyFatCategory: string
  bodyFatColor: string
}

export default function GorduraTMBPage() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [result, setResult] = useState<BodyCompositionResult | null>(null)

  const calculateBodyComposition = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)
    const ageNum = Number.parseInt(age)

    if (!weightNum || !heightNum || !ageNum || !gender) {
      return
    }

    // Calculate TMB using Mifflin-St Jeor Equation
    let tmb = 0
    if (gender === "male") {
      tmb = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      tmb = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    setResult({
      bodyFat: 0,
      tmb: Math.round(tmb),
      leanMass: 0,
      fatMass: 0,
      dailyCalories: {
        sedentary: Math.round(tmb * 1.2),
        light: Math.round(tmb * 1.375),
        moderate: Math.round(tmb * 1.55),
        intense: Math.round(tmb * 1.725),
        veryIntense: Math.round(tmb * 1.9),
      },
      bodyFatCategory: "",
      bodyFatColor: "",
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("")
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
              <Activity className="h-6 w-6 text-secondary" />
              <h1 className="text-2xl font-bold text-foreground">Calculadora de TMB</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Calculator Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Calcule sua Taxa Metabólica Basal</CardTitle>
              <CardDescription>
                Insira suas informações para descobrir sua Taxa Metabólica Basal e necessidades calóricas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Ex: 30"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sexo</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculateBodyComposition}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                  disabled={!weight || !height || !age || !gender}
                >
                  Calcular
                </Button>
                <Button onClick={resetCalculator} variant="outline" disabled={!result}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Seus Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">{result.tmb}</div>
                    <div className="text-lg font-semibold text-foreground mb-2">Calorias/dia</div>
                    <p className="text-sm text-muted-foreground">Taxa Metabólica Basal</p>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Calories */}
              <Card>
                <CardHeader>
                  <CardTitle>Calorias Diárias por Nível de Atividade</CardTitle>
                  <CardDescription>Baseado na sua TMB e diferentes níveis de atividade física</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-semibold">Sedentário</span>
                        <p className="text-sm text-muted-foreground">Pouco ou nenhum exercício</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{result.dailyCalories.sedentary} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-semibold">Levemente ativo</span>
                        <p className="text-sm text-muted-foreground">Exercício leve 1-3 dias/semana</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{result.dailyCalories.light} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-semibold">Moderadamente ativo</span>
                        <p className="text-sm text-muted-foreground">Exercício moderado 3-5 dias/semana</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{result.dailyCalories.moderate} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-semibold">Muito ativo</span>
                        <p className="text-sm text-muted-foreground">Exercício intenso 6-7 dias/semana</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{result.dailyCalories.intense} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <span className="font-semibold">Extremamente ativo</span>
                        <p className="text-sm text-muted-foreground">Exercício muito intenso, trabalho físico</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{result.dailyCalories.veryIntense} cal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Info Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Sobre os Cálculos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">TMB (Equação de Mifflin-St Jeor)</h4>
                  <p className="text-sm text-muted-foreground">
                    Calcula a quantidade mínima de energia que seu corpo precisa para funcionar em repouso.
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Este cálculo é uma estimativa baseada em fórmulas científicas. Para avaliações mais precisas,
                    consulte um profissional de saúde ou nutricionista.
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
