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
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [result, setResult] = useState<BodyCompositionResult | null>(null)

  const calculateBodyComposition = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)
    const ageNum = Number.parseInt(age)
    const neckNum = Number.parseFloat(neck)
    const waistNum = Number.parseFloat(waist)
    const hipNum = Number.parseFloat(hip)

    if (!weightNum || !heightNum || !ageNum || !gender || !neckNum || !waistNum) {
      return
    }

    if (gender === "female" && !hipNum) {
      return
    }

    // Calculate Body Fat using US Navy Method
    let bodyFat = 0
    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450
    } else {
      bodyFat =
        495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.221 * Math.log10(heightNum)) - 450
    }

    // Calculate TMB using Mifflin-St Jeor Equation
    let tmb = 0
    if (gender === "male") {
      tmb = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      tmb = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    // Calculate body composition
    const fatMass = (weightNum * bodyFat) / 100
    const leanMass = weightNum - fatMass

    // Calculate daily calories based on activity level
    const dailyCalories = {
      sedentary: Math.round(tmb * 1.2),
      light: Math.round(tmb * 1.375),
      moderate: Math.round(tmb * 1.55),
      intense: Math.round(tmb * 1.725),
      veryIntense: Math.round(tmb * 1.9),
    }

    // Body fat categories
    let bodyFatCategory = ""
    let bodyFatColor = ""

    if (gender === "male") {
      if (bodyFat < 6) {
        bodyFatCategory = "Essencial"
        bodyFatColor = "text-blue-600"
      } else if (bodyFat < 14) {
        bodyFatCategory = "Atlético"
        bodyFatColor = "text-green-600"
      } else if (bodyFat < 18) {
        bodyFatCategory = "Fitness"
        bodyFatColor = "text-green-500"
      } else if (bodyFat < 25) {
        bodyFatCategory = "Aceitável"
        bodyFatColor = "text-yellow-600"
      } else {
        bodyFatCategory = "Obesidade"
        bodyFatColor = "text-red-600"
      }
    } else {
      if (bodyFat < 14) {
        bodyFatCategory = "Essencial"
        bodyFatColor = "text-blue-600"
      } else if (bodyFat < 21) {
        bodyFatCategory = "Atlético"
        bodyFatColor = "text-green-600"
      } else if (bodyFat < 25) {
        bodyFatCategory = "Fitness"
        bodyFatColor = "text-green-500"
      } else if (bodyFat < 32) {
        bodyFatCategory = "Aceitável"
        bodyFatColor = "text-yellow-600"
      } else {
        bodyFatCategory = "Obesidade"
        bodyFatColor = "text-red-600"
      }
    }

    setResult({
      bodyFat: Math.round(bodyFat * 10) / 10,
      tmb: Math.round(tmb),
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      dailyCalories,
      bodyFatCategory,
      bodyFatColor,
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("")
    setNeck("")
    setWaist("")
    setHip("")
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
              <h1 className="text-2xl font-bold text-foreground">Calculadora de Gordura Corporal & TMB</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Calculator Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Calcule sua Composição Corporal</CardTitle>
              <CardDescription>
                Insira suas medidas para descobrir seu percentual de gordura corporal e Taxa Metabólica Basal
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

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neck">Pescoço (cm)</Label>
                  <Input
                    id="neck"
                    type="number"
                    placeholder="Ex: 38"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Cintura (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder="Ex: 85"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    step="0.1"
                  />
                </div>
                {gender === "female" && (
                  <div className="space-y-2">
                    <Label htmlFor="hip">Quadril (cm)</Label>
                    <Input
                      id="hip"
                      type="number"
                      placeholder="Ex: 95"
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                      step="0.1"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculateBodyComposition}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                  disabled={!weight || !height || !age || !gender || !neck || !waist || (gender === "female" && !hip)}
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-secondary mb-2">{result.bodyFat}%</div>
                      <div className={`text-lg font-semibold ${result.bodyFatColor} mb-2`}>
                        {result.bodyFatCategory}
                      </div>
                      <p className="text-sm text-muted-foreground">Gordura Corporal</p>
                    </div>
                    <div className="text-center p-6 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-2">{result.tmb}</div>
                      <div className="text-lg font-semibold text-foreground mb-2">Calorias/dia</div>
                      <p className="text-sm text-muted-foreground">Taxa Metabólica Basal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Body Composition */}
              <Card>
                <CardHeader>
                  <CardTitle>Composição Corporal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card border rounded-lg">
                      <h4 className="font-semibold mb-2">Massa Magra</h4>
                      <p className="text-2xl font-bold text-green-600">{result.leanMass} kg</p>
                      <p className="text-sm text-muted-foreground">Músculos, ossos e órgãos</p>
                    </div>
                    <div className="p-4 bg-card border rounded-lg">
                      <h4 className="font-semibold mb-2">Massa Gorda</h4>
                      <p className="text-2xl font-bold text-orange-600">{result.fatMass} kg</p>
                      <p className="text-sm text-muted-foreground">Tecido adiposo</p>
                    </div>
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
                  <h4 className="font-semibold mb-2">Gordura Corporal (Método US Navy)</h4>
                  <p className="text-sm text-muted-foreground">
                    Utiliza medidas de circunferência para estimar o percentual de gordura corporal. É um método prático
                    e relativamente preciso.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">TMB (Equação de Mifflin-St Jeor)</h4>
                  <p className="text-sm text-muted-foreground">
                    Calcula a quantidade mínima de energia que seu corpo precisa para funcionar em repouso.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Como medir:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Pescoço:</strong> Na parte mais fina, abaixo do pomo de Adão
                    </li>
                    <li>
                      • <strong>Cintura:</strong> Na parte mais estreita, geralmente na altura do umbigo
                    </li>
                    <li>
                      • <strong>Quadril (mulheres):</strong> Na parte mais larga dos quadris
                    </li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Estes cálculos são estimativas baseadas em fórmulas científicas. Para avaliações mais precisas,
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
