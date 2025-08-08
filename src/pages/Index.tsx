
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MatchSelector from "@/components/MatchSelector";
import MatchPrediction from "@/components/MatchPrediction";
import ProbabilityChart from "@/components/ProbabilityChart";
import DetailedStats from "@/components/DetailedStats";
import BettingRecommendation from "@/components/BettingRecommendation";
import MatchAnalytics from "@/components/MatchAnalytics";
import PricingPlans from "@/components/PricingPlans";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Activity, TrendingUp, Target, BarChart3 } from "lucide-react";

interface Team {
  name: string;
  position?: number;
}

interface MatchData {
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  predictions: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  detailedStats: any;
  bettingRecommendations: any;
  analytics: any;
}

const Index = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  const handleAnalyzeMatch = async (homeTeam: string, awayTeam: string, league: string) => {
    if (!homeTeam || !awayTeam) {
      toast({
        title: "Erro",
        description: "Por favor, selecione ambos os times",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    console.log("Iniciando análise:", { homeTeam, awayTeam, league });

    try {
      const { data, error } = await supabase.functions.invoke('match-analysis', {
        body: { homeTeam, awayTeam, league }
      });

      if (error) {
        console.error("Erro na função:", error);
        throw error;
      }

      console.log("Resposta da análise:", data);

      const formattedData: MatchData = {
        homeTeam: { 
          name: homeTeam,
          position: data?.homeTeam?.position 
        },
        awayTeam: { 
          name: awayTeam,
          position: data?.awayTeam?.position 
        },
        league,
        predictions: data?.predictions || {
          homeWin: 45,
          draw: 25,
          awayWin: 30
        },
        detailedStats: data?.detailedStats || {},
        bettingRecommendations: data?.bettingRecommendations || [],
        analytics: data?.analytics || {}
      };

      setMatchData(formattedData);

      toast({
        title: "Análise concluída!",
        description: "Os dados da partida foram analisados com sucesso.",
      });

    } catch (error) {
      console.error("Erro ao analisar partida:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar a partida. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header mobile-friendly */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              FuturoLogia IA
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Análise Inteligente de Futebol com IA
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Match Selection - Mobile optimized */}
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Activity className="h-5 w-5 text-primary" />
              Seleção de Partida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MatchSelector onAnalyze={handleAnalyzeMatch} />
            {isAnalyzing && (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground text-center">
                    Analisando dados dos times...
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section - Mobile responsive grid */}
        {matchData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Match Prediction */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Previsão da Partida
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MatchPrediction 
                    homeTeam={matchData.homeTeam.name}
                    awayTeam={matchData.awayTeam.name}
                    predictions={matchData.predictions}
                  />
                </CardContent>
              </Card>

              {/* Probability Chart */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Gráfico de Probabilidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProbabilityChart 
                    homeTeam={matchData.homeTeam.name}
                    awayTeam={matchData.awayTeam.name}
                    homePosition={matchData.homeTeam.position}
                    awayPosition={matchData.awayTeam.position}
                    predictions={matchData.predictions}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Detailed Stats */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Activity className="h-5 w-5 text-primary" />
                    Estatísticas Detalhadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DetailedStats stats={matchData.detailedStats} />
                </CardContent>
              </Card>

              {/* Betting Recommendations */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Target className="h-5 w-5 text-primary" />
                    Recomendações de Apostas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BettingRecommendation recommendations={matchData.bettingRecommendations} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Analytics Section - Full width on mobile */}
        {matchData && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BarChart3 className="h-5 w-5 text-primary" />
                Análises Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MatchAnalytics analytics={matchData.analytics} />
            </CardContent>
          </Card>
        )}

        {/* Pricing Plans */}
        <PricingPlans />
      </div>
    </div>
  );
};

export default Index;
