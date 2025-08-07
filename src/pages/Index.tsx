import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Users, Target, Crown, Loader2 } from "lucide-react";
import { ProbabilityChart } from "@/components/ProbabilityChart";
import { MatchAnalytics } from "@/components/MatchAnalytics";
import { PricingPlans } from "@/components/PricingPlans";
import { MatchSelector } from "@/components/MatchSelector";
import { BettingRecommendation } from "@/components/BettingRecommendation";
import { DetailedStats } from "@/components/DetailedStats";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMatch, setSelectedMatch] = useState<{league: string, homeTeam: string, awayTeam: string} | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const matchData = {
    homeTeam: selectedMatch?.homeTeam || "Flamengo",
    awayTeam: selectedMatch?.awayTeam || "Palmeiras",
    homeWinProb: analysis?.recommendation?.homeWinProb || 48,
    drawProb: analysis?.recommendation?.drawProb || 28,
    awayWinProb: analysis?.recommendation?.awayWinProb || 24,
    confidence: analysis?.recommendation?.confidence || 82,
    homePosition: analysis?.homeTeam?.position,
    awayPosition: analysis?.awayTeam?.position
  };

  const recommendations = [
    {
      type: analysis?.recommendation?.winner ? `${analysis.recommendation.winner} vence` : "Ambos marcam (SIM)",
      confidence: analysis?.recommendation?.confidence || 82,
      reason: analysis?.recommendation?.reasons?.[0] || "Baseado em estatísticas recentes",
      odds: "1.75"
    },
    {
      type: "Over 2.5 gols",
      confidence: 78,
      reason: "Média de gols das equipes indica jogo movimentado",
      odds: "1.65"
    },
    {
      type: `${selectedMatch?.homeTeam || "Flamengo"} vence 1º tempo`,
      confidence: 65,
      reason: "Vantagem do mandante no início da partida",
      odds: "2.10"
    }
  ];

  const handleAnalyze = async (league: string, homeTeam: string, awayTeam: string) => {
    setSelectedMatch({ league, homeTeam, awayTeam });
    setIsLoading(true);
    
    try {
      console.log(`Analisando: ${league} - ${homeTeam} vs ${awayTeam}`);
      
      const { data, error } = await supabase.functions.invoke('match-analysis', {
        body: { league, homeTeam, awayTeam }
      });

      if (error) throw error;

      setAnalysis(data);
      
      toast({
        title: "Análise Concluída!",
        description: `${data.recommendation.winner} tem ${data.recommendation.confidence}% de chance de vitória`,
      });

    } catch (error) {
      console.error('Erro na análise:', error);
      toast({
        title: "Erro na Análise",
        description: "Não foi possível analisar a partida. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

            {/* Betting Recommendation - TOP OF PAGE */}
            {analysis && (
              <section>
                <BettingRecommendation recommendation={analysis.recommendation} />
              </section>
            )}

            {/* Match Selector */}
            <section className="grid lg:grid-cols-3 gap-8">
              <MatchSelector onAnalyze={handleAnalyze} />

              {/* Match Analysis Section */}
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Análise do Jogo</span>
                  </CardTitle>
                  <CardDescription>
                    {matchData.homeTeam} vs {matchData.awayTeam}
                    {selectedMatch && (
                      <span className="block text-primary text-sm mt-1">
                        {selectedMatch.league}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">Analisando...</span>
                    </div>
                  ) : (
                    <ProbabilityChart data={matchData} />
                  )}
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

            {/* Detailed Statistics */}
            {analysis && (
              <section>
                <DetailedStats 
                  homeTeam={analysis.homeTeam}
                  awayTeam={analysis.awayTeam}
                  headToHead={analysis.headToHead}
                />
              </section>
            )}

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
