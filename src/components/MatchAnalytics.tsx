import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Activity, Target, Users } from "lucide-react";

export function MatchAnalytics() {
  // Mock data for detailed analytics
  const formData = [
    { team: "Flamengo", wins: 8, draws: 1, losses: 1, points: 25 },
    { team: "Palmeiras", wins: 7, draws: 2, losses: 1, points: 23 },
  ];

  const goalsData = [
    { game: "Jogo 1", flamengo: 2, palmeiras: 1 },
    { game: "Jogo 2", flamengo: 3, palmeiras: 0 },
    { game: "Jogo 3", flamengo: 1, palmeiras: 2 },
    { game: "Jogo 4", flamengo: 2, palmeiras: 2 },
    { game: "Jogo 5", flamengo: 4, palmeiras: 1 },
  ];

  const recentStats = [
    { stat: "Gols marcados (média)", flamengo: 2.4, palmeiras: 1.8 },
    { stat: "Gols sofridos (média)", flamengo: 0.8, palmeiras: 1.1 },
    { stat: "Posse de bola (%)", flamengo: 58, palmeiras: 52 },
    { stat: "Finalizações por jogo", flamengo: 14.2, palmeiras: 11.8 },
    { stat: "Cartões amarelos", flamengo: 2.1, palmeiras: 2.5 },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Análises Detalhadas</h2>
        <p className="text-muted-foreground">Estatísticas completas e histórico de confrontos</p>
      </div>

      {/* Form Comparison */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Forma Atual</span>
            </CardTitle>
            <CardDescription>Últimos 10 jogos de cada equipe</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="team" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="wins" fill="hsl(var(--chart-1))" name="Vitórias" />
                <Bar dataKey="draws" fill="hsl(var(--chart-3))" name="Empates" />
                <Bar dataKey="losses" fill="hsl(var(--chart-2))" name="Derrotas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Histórico de Gols</span>
            </CardTitle>
            <CardDescription>Confrontos diretos recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="game" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="flamengo" stroke="hsl(var(--chart-1))" strokeWidth={3} name="Flamengo" />
                <Line type="monotone" dataKey="palmeiras" stroke="hsl(var(--chart-2))" strokeWidth={3} name="Palmeiras" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Estatísticas Comparativas</span>
          </CardTitle>
          <CardDescription>Métricas detalhadas dos últimos jogos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{stat.stat}</span>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-chart-1 border-chart-1">
                      Flamengo: {stat.flamengo}
                    </Badge>
                    <Badge variant="outline" className="text-chart-2 border-chart-2">
                      Palmeiras: {stat.palmeiras}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Progress 
                    value={(stat.flamengo / Math.max(stat.flamengo, stat.palmeiras)) * 100} 
                    className="h-2"
                  />
                  <Progress 
                    value={(stat.palmeiras / Math.max(stat.flamengo, stat.palmeiras)) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Insights da IA</span>
          </CardTitle>
          <CardDescription>Análise baseada em machine learning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Tendência Ofensiva</h4>
            <p className="text-sm text-muted-foreground">
              Flamengo apresenta 23% mais finalizações no terço final nas últimas 5 partidas. 
              Recomenda-se apostas em "Over de gols" com confiança de 78%.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-semibold text-warning mb-2">Padrão Defensivo</h4>
            <p className="text-sm text-muted-foreground">
              Palmeiras sofreu gols nos últimos 3 jogos consecutivos. 
              Probabilidade de "Ambos marcam" aumentou para 82%.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-2">Fator Casa</h4>
            <p className="text-sm text-muted-foreground">
              Flamengo tem 85% de aproveitamento em casa contra top-5. 
              Vantagem significativa no primeiro tempo (65% de confiança).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}