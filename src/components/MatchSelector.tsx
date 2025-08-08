
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Monitor } from "lucide-react";

const leagues = [
  "Brasileirão Série A",
  "Brasileirão Série B",
  "Copa Libertadores",
  "Copa Sul-Americana",
  "Copa do Brasil",
  "Campeonato Paulista",
  "Campeonato Carioca",
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1"
];

const teams = {
  "Brasileirão Série A": [
    "Flamengo", "Palmeiras", "Corinthians", "São Paulo", "Santos", "Grêmio",
    "Internacional", "Atlético-MG", "Cruzeiro", "Botafogo", "Vasco da Gama",
    "Fluminense", "Athletico-PR", "Coritiba", "Bahia", "Goiás", "Ceará",
    "Fortaleza", "Bragantino", "Cuiabá"
  ],
  "Premier League": [
    "Manchester City", "Arsenal", "Manchester United", "Liverpool", "Chelsea",
    "Newcastle", "Brighton", "Aston Villa", "Tottenham", "West Ham"
  ]
};

interface MatchSelectorProps {
  onAnalyze: (homeTeam: string, awayTeam: string, league: string) => void;
}

const MatchSelector = ({ onAnalyze }: MatchSelectorProps) => {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");

  const availableTeams = selectedLeague ? teams[selectedLeague as keyof typeof teams] || [] : [];

  const handleAnalyze = () => {
    if (homeTeam && awayTeam && selectedLeague) {
      onAnalyze(homeTeam, awayTeam, selectedLeague);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        {/* Device compatibility indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-primary/10 rounded-lg">
          <Monitor className="h-4 w-4 text-primary" />
          <Smartphone className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Compatível com Desktop e Mobile
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* League Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Competição
            </label>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Selecionar competição" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {leagues.map((league) => (
                  <SelectItem key={league} value={league} className="text-sm">
                    {league}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Home Team */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Time da Casa
            </label>
            <Select 
              value={homeTeam} 
              onValueChange={setHomeTeam}
              disabled={!selectedLeague}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Time da casa" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {availableTeams.map((team) => (
                  <SelectItem key={team} value={team} className="text-sm">
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Away Team */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Time Visitante
            </label>
            <Select 
              value={awayTeam} 
              onValueChange={setAwayTeam}
              disabled={!selectedLeague}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Time visitante" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {availableTeams
                  .filter(team => team !== homeTeam)
                  .map((team) => (
                    <SelectItem key={team} value={team} className="text-sm">
                      {team}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleAnalyze}
            disabled={!homeTeam || !awayTeam || !selectedLeague}
            className="w-full sm:w-auto px-8 py-3 text-base font-medium"
            size="lg"
          >
            Analisar Partida
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchSelector;
