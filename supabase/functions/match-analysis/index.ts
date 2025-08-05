
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TeamStats {
  name: string;
  form: string;
  goals_for: number;
  goals_against: number;
  wins: number;
  draws: number;
  losses: number;
  played: number;
  average_goals_for: number;
  average_goals_against: number;
}

interface MatchAnalysis {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  headToHead: any[];
  prediction: {
    winner: string;
    confidence: number;
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    reasons: string[];
  };
}

function calculateProbabilities(homeStats: TeamStats, awayStats: TeamStats): any {
  // Algoritmo simples de cálculo baseado em estatísticas
  const homeAdvantage = 0.1; // 10% vantagem do mandante
  
  // Força dos times baseada em média de gols e vitórias
  const homeStrength = (homeStats.average_goals_for * 0.4) + 
                      (homeStats.wins / homeStats.played * 0.6) + homeAdvantage;
  const awayStrength = (awayStats.average_goals_for * 0.4) + 
                      (awayStats.wins / awayStats.played * 0.6);
  
  const totalStrength = homeStrength + awayStrength;
  
  let homeWinProb = Math.round((homeStrength / totalStrength) * 100);
  let awayWinProb = Math.round((awayStrength / totalStrength) * 100);
  let drawProb = Math.max(15, 100 - homeWinProb - awayWinProb);
  
  // Ajustar para somar 100%
  const total = homeWinProb + awayWinProb + drawProb;
  homeWinProb = Math.round((homeWinProb / total) * 100);
  awayWinProb = Math.round((awayWinProb / total) * 100);
  drawProb = 100 - homeWinProb - awayWinProb;
  
  const winner = homeWinProb > awayWinProb ? homeStats.name : awayStats.name;
  const confidence = Math.abs(homeWinProb - awayWinProb) + 50;
  
  const reasons = [];
  if (homeWinProb > awayWinProb) {
    reasons.push(`${homeStats.name} jogando em casa (vantagem do mandante)`);
    if (homeStats.average_goals_for > awayStats.average_goals_for) {
      reasons.push(`${homeStats.name} tem melhor média de gols marcados`);
    }
    if (homeStats.wins > awayStats.wins) {
      reasons.push(`${homeStats.name} tem mais vitórias na temporada`);
    }
  } else {
    if (awayStats.average_goals_for > homeStats.average_goals_for) {
      reasons.push(`${awayStats.name} tem melhor média de gols marcados`);
    }
    if (awayStats.wins > homeStats.wins) {
      reasons.push(`${awayStats.name} tem mais vitórias na temporada`);
    }
  }
  
  return {
    winner,
    confidence: Math.min(confidence, 95),
    homeWinProb,
    drawProb,
    awayWinProb,
    reasons
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { league, homeTeam, awayTeam } = await req.json();
    const footballApiKey = Deno.env.get('FOOTBALL_API_KEY');
    
    if (!footballApiKey) {
      throw new Error('Football API key not configured');
    }

    console.log('Analyzing match:', { league, homeTeam, awayTeam });

    // Para demonstração, vou simular dados realistas
    const mockHomeStats: TeamStats = {
      name: homeTeam,
      form: "WWDWL",
      goals_for: 45,
      goals_against: 23,
      wins: 12,
      draws: 4,
      losses: 2,
      played: 18,
      average_goals_for: 2.5,
      average_goals_against: 1.3
    };

    const mockAwayStats: TeamStats = {
      name: awayTeam,
      form: "WLWDW",
      goals_for: 38,
      goals_against: 28,
      wins: 10,
      draws: 5,
      losses: 3,
      played: 18,
      average_goals_for: 2.1,
      average_goals_against: 1.6
    };

    const prediction = calculateProbabilities(mockHomeStats, mockAwayStats);

    const analysis: MatchAnalysis = {
      homeTeam: mockHomeStats,
      awayTeam: mockAwayStats,
      headToHead: [
        { date: "2023-12-15", homeGoals: 2, awayGoals: 1 },
        { date: "2023-08-20", homeGoals: 1, awayGoals: 3 },
        { date: "2023-04-10", homeGoals: 2, awayGoals: 2 },
        { date: "2022-11-25", homeGoals: 3, awayGoals: 0 },
        { date: "2022-07-30", homeGoals: 1, awayGoals: 2 }
      ],
      prediction
    };

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in match analysis:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
})
