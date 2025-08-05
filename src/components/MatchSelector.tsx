
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Target, Home, Plane } from "lucide-react";

const leagues = {
  "Brasileirão Série A": ["Flamengo", "Palmeiras", "São Paulo", "Corinthians", "Atlético-MG", "Internacional"],
  "Premier League": ["Arsenal", "Man City", "Liverpool", "Chelsea", "Man United", "Tottenham"],
  "La Liga": ["Real Madrid", "Barcelona", "Atlético Madrid", "Sevilla", "Valencia", "Real Sociedad"],
  "Serie A": ["Juventus", "Inter", "AC Milan", "Napoli", "Roma", "Lazio"]
};

interface MatchSelectorProps {
  onAnalyze: (league: string, homeTeam: string, awayTeam: string) => void;
}

export function MatchSelector({ onAnalyze }: MatchSelectorProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);

  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
    setAvailableTeams(leagues[league as keyof typeof leagues] || []);
    setHomeTeam("");
    setAwayTeam("");
  };

  const handleAnalyze = () => {
    if (selectedLeague && homeTeam && awayTeam && homeTeam !== awayTeam) {
      onAnalyze(selectedLeague, homeTeam, awayTeam);
    }
  };

  const canAnalyze = selectedLeague && homeTeam && awayTeam && homeTeam !== awayTeam;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <span>Seleção de Partida</span>
        </CardTitle>
        <CardDescription>
          Escolha o campeonato, time da casa e visitante para análise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Campeonato</label>
          <Select value={selectedLeague} onValueChange={handleLeagueChange}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Selecione o campeonato" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              {Object.keys(leagues).map((league) => (
                <SelectItem key={league} value={league} className="hover:bg-accent">
                  {league}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Time da Casa
            </label>
            <Select 
              value={homeTeam} 
              onValueChange={setHomeTeam}
              disabled={!selectedLeague}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Time mandante" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {availableTeams.map((team) => (
                  <SelectItem 
                    key={team} 
                    value={team} 
                    className="hover:bg-accent"
                    disabled={team === awayTeam}
                  >
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Plane className="h-4 w-4 text-muted-foreground" />
              Time Visitante
            </label>
            <Select 
              value={awayTeam} 
              onValueChange={setAwayTeam}
              disabled={!selectedLeague}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Time visitante" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {availableTeams.map((team) => (
                  <SelectItem 
                    key={team} 
                    value={team} 
                    className="hover:bg-accent"
                    disabled={team === homeTeam}
                  >
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {homeTeam && awayTeam && homeTeam === awayTeam && (
          <p className="text-sm text-destructive">
            Os times da casa e visitante devem ser diferentes
          </p>
        )}

        <Button 
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Activity className="h-4 w-4 mr-2" />
          Analisar Partida
        </Button>
      </CardContent>
    </Card>
  );
}
