
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DetailedStatsProps {
  homeTeam: {
    name: string;
    position: number;
    homeWins: number;
    homeGoals: number;
    corners: number;
    yellowCards: number;
    redCards: number;
  };
  awayTeam: {
    name: string;
    position: number;
    awayWins: number;
    awayGoals: number;
    corners: number;
    yellowCards: number;
    redCards: number;
  };
  headToHead: {
    homeWins: number;
    awayWins: number;
    draws: number;
  };
}

export function DetailedStats({ homeTeam, awayTeam, headToHead }: DetailedStatsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            🏠 {homeTeam.name} (Casa)
          </CardTitle>
          <CardDescription className="text-center">
            Posição na tabela: {homeTeam.position}º
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">🏆 Vitórias em Casa</p>
              <p className="text-2xl font-bold text-primary">{homeTeam.homeWins}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">⚽ Gols em Casa</p>
              <p className="text-2xl font-bold text-foreground">{homeTeam.homeGoals}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">🏴 Escanteios</p>
              <p className="text-2xl font-bold text-foreground">{homeTeam.corners}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">🟨 Cartões Amarelos</p>
              <p className="text-2xl font-bold text-warning">{homeTeam.yellowCards}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center col-span-2">
              <p className="text-sm text-muted-foreground">🟥 Cartões Vermelhos</p>
              <p className="text-2xl font-bold text-destructive">{homeTeam.redCards}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            ✈️ {awayTeam.name} (Fora)
          </CardTitle>
          <CardDescription className="text-center">
            Posição na tabela: {awayTeam.position}º
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-chart-2/20 border border-chart-2/30 text-center">
              <p className="text-sm text-muted-foreground">✈️ Vitórias Fora</p>
              <p className="text-2xl font-bold text-chart-2">{awayTeam.awayWins}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">⚽ Gols Fora</p>
              <p className="text-2xl font-bold text-foreground">{awayTeam.awayGoals}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">🏴 Escanteios</p>
              <p className="text-2xl font-bold text-foreground">{awayTeam.corners}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">🟨 Cartões Amarelos</p>
              <p className="text-2xl font-bold text-warning">{awayTeam.yellowCards}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center col-span-2">
              <p className="text-sm text-muted-foreground">🟥 Cartões Vermelhos</p>
              <p className="text-2xl font-bold text-destructive">{awayTeam.redCards}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border md:col-span-2">
        <CardHeader>
          <CardTitle className="text-center">📊 Últimos 5 Confrontos Diretos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="text-primary border-primary">
                {homeTeam.name}
              </Badge>
              <p className="text-3xl font-bold text-primary">{headToHead.homeWins}</p>
              <p className="text-sm text-muted-foreground">vitórias</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                Empates
              </Badge>
              <p className="text-3xl font-bold text-muted-foreground">{headToHead.draws}</p>
              <p className="text-sm text-muted-foreground">empates</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-chart-2 border-chart-2">
                {awayTeam.name}
              </Badge>
              <p className="text-3xl font-bold text-chart-2">{headToHead.awayWins}</p>
              <p className="text-sm text-muted-foreground">vitórias</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
