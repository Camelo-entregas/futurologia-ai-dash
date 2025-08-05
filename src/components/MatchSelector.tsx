
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Target } from "lucide-react";

const leagues = {
  "Brasileirão Série A": ["Flamengo", "Palmeiras", "São Paulo"],
  "Premier League": ["Arsenal", "Man City", "Liverpool"]
};

interface MatchSelectorProps {
  onAnalyze: (league: string, team: string) => void;
}

export function MatchSelector({ onAnalyze }: MatchSelectorProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);

  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
    setAvailableTeams(leagues[league as keyof typeof leagues] || []);
    setSelectedTeam(""); // Reset team selection when league changes
  };

  const handleAnalyze = () => {
    if (selectedLeague && selectedTeam) {
      onAnalyze(selectedLeague, selectedTeam);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <span>Seleção de Jogo</span>
        </CardTitle>
        <CardDescription>
          Escolha o campeonato e time para análise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Campeonato</label>
          <Select value={selectedLeague} onValueChange={handleLeagueChange}>
            <SelectTrigger id="campeonato-selector" className="bg-background border-border">
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time</label>
          <Select 
            value={selectedTeam} 
            onValueChange={setSelectedTeam}
            disabled={!selectedLeague}
          >
            <SelectTrigger id="time-selector" className="bg-background border-border">
              <SelectValue placeholder="Selecione o time" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              {availableTeams.map((team) => (
                <SelectItem key={team} value={team} className="hover:bg-accent">
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={!selectedLeague || !selectedTeam}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Activity className="h-4 w-4 mr-2" />
          Analisar Jogo
        </Button>
      </CardContent>
    </Card>
  );
}
