import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Users, Target, Crown } from "lucide-react";
import { ProbabilityChart } from "@/components/ProbabilityChart";
import { MatchAnalytics } from "@/components/MatchAnalytics";
import { PricingPlans } from "@/components/PricingPlans";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const matchData = {
    homeTeam: "Flamengo",
    awayTeam: "Palmeiras",
    homeWinProb: 48,
    drawProb: 28,
    awayWinProb: 24,
    confidence: 82
  };

  const recommendations = [
    {
      type: "Ambos marcam (SIM)",
      confidence: 82,
      reason: "Últimos 10 jogos entre as equipes",
      odds: "1.75"
    },
    {
      type: "Over 2.5 gols",
      confidence: 78,
      reason: "Média de 3.2 gols nos últimos confrontos",
      odds: "1.65"
    },
    {
      type: "Flamengo vence 1º tempo",
      confidence: 65,
      reason: "85% de aproveitamento em casa",
      odds: "2.10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              FuturoLogia <span className="text-primary">IA</span>
            </h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "analytics" ? "default" : "ghost"}
              onClick={() => setActiveTab("analytics")}
            >
              Análises
            </Button>
            <Button 
              variant={activeTab === "pricing" ? "default" : "ghost"}
              onClick={() => setActiveTab("pricing")}
            >
              Planos
            </Button>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Crown className="h-4 w-4 mr-2" />
              Assinar Premium
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Análise Estatística Avançada de Futebol
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Utilize inteligência artificial para tomar decisões mais assertivas em suas apostas esportivas
              </p>
            </section>

            {/* Match Analysis Section */}
            <section className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Análise do Jogo</span>
                  </CardTitle>
                  <CardDescription>
                    {matchData.homeTeam} vs {matchData.awayTeam}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProbabilityChart data={matchData} />
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Recomendações IA</span>
                  </CardTitle>
                  <CardDescription>
                    Sugestões baseadas em análise estatística avançada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{rec.type}</h4>
                        <Badge variant="outline" className="text-primary border-primary">
                          {rec.confidence}% confiança
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <Progress value={rec.confidence} className="flex-1 mr-4" />
                        <span className="text-sm font-mono text-primary">Odd: {rec.odds}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Stats Cards */}
            <section className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de Acerto</p>
                      <p className="text-2xl font-bold text-primary">85.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                      <p className="text-2xl font-bold text-foreground">12.5K+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Análises Hoje</p>
                      <p className="text-2xl font-bold text-foreground">247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Pronto para começar?
              </h3>
              <p className="text-muted-foreground mb-6">
                Junte-se a milhares de apostadores que já aumentaram sua taxa de acerto
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Começar Teste Grátis
              </Button>
            </section>
          </div>
        )}

        {activeTab === "analytics" && <MatchAnalytics />}
        {activeTab === "pricing" && <PricingPlans />}
      </main>
    </div>
  );
};

export default Index;