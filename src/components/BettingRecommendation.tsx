
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target } from "lucide-react";

interface BettingRecommendationProps {
  recommendation: {
    winner: string;
    confidence: number;
    betRecommendation: string;
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
  };
}

export function BettingRecommendation({ recommendation }: BettingRecommendationProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Trophy className="h-6 w-6 text-primary" />
          <span>🎯 Recomendação de Aposta</span>
        </CardTitle>
        <CardDescription className="text-lg">
          Análise baseada em dados estatísticos avançados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
            <h3 className="text-3xl font-bold text-primary mb-2">
              {recommendation.winner}
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              {recommendation.betRecommendation}
            </p>
            <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              {recommendation.confidence}% de Confiança
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-sm text-muted-foreground">Vitória Casa</p>
              <p className="text-2xl font-bold text-chart-1">{recommendation.homeWinProb}%</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-sm text-muted-foreground">Empate</p>
              <p className="text-2xl font-bold text-chart-3">{recommendation.drawProb}%</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-sm text-muted-foreground">Vitória Fora</p>
              <p className="text-2xl font-bold text-chart-2">{recommendation.awayWinProb}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
