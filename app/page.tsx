import { Calculator, Dumbbell, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Calculadora Academia Pakitos Dance</h1>
            <p className="text-muted-foreground text-lg">Monitore sua jornada fitness com precisão</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* IMC Calculator Card */}
          <Card className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-2 hover:border-primary/50 bg-card">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/20 rounded-full w-fit">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">Calculadora de IMC</CardTitle>
              <CardDescription className="text-base text-card-foreground">
                Calcule seu Índice de Massa Corporal e descubra se está no peso ideal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-card-foreground">O que você vai descobrir:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Seu IMC atual</li>
                  <li>• Classificação do peso (baixo, normal, sobrepeso, obesidade)</li>
                  <li>• Faixa de peso saudável para sua altura</li>
                </ul>
              </div>
              <Link href="/imc" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-colors">
                  Calcular IMC
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Body Fat & TMB Calculator Card */}
          <Card className="hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 border-2 hover:border-secondary/50 bg-card">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/20 rounded-full w-fit">
                <Activity className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl font-bold text-secondary">Gordura Corporal & TMB</CardTitle>
              <CardDescription className="text-base text-card-foreground">
                Calcule seu percentual de gordura corporal e Taxa Metabólica Basal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-card-foreground">O que você vai descobrir:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Percentual de gordura corporal</li>
                  <li>• Taxa Metabólica Basal (TMB)</li>
                  <li>• Calorias necessárias por dia</li>
                  <li>• Massa magra e massa gorda</li>
                </ul>
              </div>
              <Link href="/gordura-tmb" className="block">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-3 transition-colors">
                  Calcular Gordura & TMB
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">Por que usar nossas calculadoras?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="mx-auto mb-3 p-2 bg-primary/20 rounded-full w-fit">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Precisão</h3>
              <p className="text-sm text-muted-foreground">
                Fórmulas cientificamente validadas para resultados confiáveis
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 p-2 bg-secondary/20 rounded-full w-fit">
                <Calculator className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Facilidade</h3>
              <p className="text-sm text-muted-foreground">Interface simples e intuitiva para uso rápido</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 p-2 bg-primary/20 rounded-full w-fit">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Completo</h3>
              <p className="text-sm text-muted-foreground">Múltiplas métricas para um acompanhamento completo</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">© 2024 Academia Pakitos Dance. Desenvolvido por Rafael Nunes Gasperini.</p>
            <p className="text-xs mt-2">Consulte sempre um profissional de saúde para orientações personalizadas.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
