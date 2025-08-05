
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Trophy, Target, CheckCircle } from "lucide-react";

interface MatchPredictionProps {
  analysis: {
    homeTeam: {
      name: string;
      form: string;
      wins: number;
      draws: number;
      losses: number;
      average_goals_for: number;
      average_goals_against: number;
    };
    awayTeam: {
      name: string;
      form: string;
      wins: number;
      draws: number;
      losses: number;
      average_goals_for: number;
      average_goals_against: number;
    };
    prediction: {
      winner: string;
      confidence: number;
      homeWinProb: number;
      drawProb: number;
      awayWinProb: number;
      reasons: string[];
    };
  };
}

export function MatchPrediction({ analysis }: MatchPredictionProps) {
  const { homeTeam, awayTeam, prediction } = analysis;

  return (
    <div className="space-y-6">
      {/* Recomendação Final */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Recomendação Final</span>
          </CardTitle>
          <CardDescription>Baseada em análise estatística avançada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary">{prediction.winner}</h3>
            </div>
            <p className="text-muted-foreground">tem maior probabilidade de vitória</p>
            <Badge variant="outline" className="mt-2 text-primary border-primary">
              {prediction.confidence}% de confiança
            </Badge>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Probabilidades
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{homeTeam.name} (Casa)</span>
                <div className="flex items-center space-x-2">
                  <Progress value={prediction.homeWinProb} className="w-20" />
                  <span className="text-sm font-mono">{prediction.homeWinProb}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Empate</span>
                <div className="flex items-center space-x-2">
                  <Progress value={prediction.drawProb} className="w-20" />
                  <span className="text-sm font-mono">{prediction.drawProb}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{awayTeam.name} (Fora)</span>
                <div className="flex items-center space-x-2">
                  <Progress value={prediction.awayWinProb} className="w-20" />
                  <span className="text-sm font-mono">{prediction.awayWinProb}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Justificativas
            </h4>
            <ul className="space-y-2">
              {prediction.reasons.map((reason, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas dos Times */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-center">{homeTeam.name} (Casa)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Forma recente</span>
              <span className="font-mono text-sm">{homeTeam.form}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vitórias</span>
              <span className="font-mono text-sm">{homeTeam.wins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Empates</span>
              <span className="font-mono text-sm">{homeTeam.draws}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Derrotas</span>
              <span className="font-mono text-sm">{homeTeam.losses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média gols/jogo</span>
              <span className="font-mono text-sm">{homeTeam.average_goals_for.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média sofridos/jogo</span>
              <span className="font-mono text-sm">{homeTeam.average_goals_against.toFixed(1)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-center">{awayTeam.name} (Fora)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Forma recente</span>
              <span className="font-mono text-sm">{awayTeam.form}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vitórias</span>
              <span className="font-mono text-sm">{awayTeam.wins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Empates</span>
              <span className="font-mono text-sm">{awayTeam.draws}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Derrotas</span>
              <span className="font-mono text-sm">{awayTeam.losses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média gols/jogo</span>
              <span className="font-mono text-sm">{awayTeam.average_goals_for.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média sofridos/jogo</span>
              <span className="font-mono text-sm">{awayTeam.average_goals_against.toFixed(1)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
