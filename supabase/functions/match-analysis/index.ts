
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DetailedStats {
  homeWins: number;
  awayWins: number;
  homeGoals: number;
  awayGoals: number;
  corners: number;
  yellowCards: number;
  redCards: number;
  tablePosition: {
    home: number;
    away: number;
  };
}

interface EnhancedAnalysis {
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
    lastFiveResults: any[];
  };
  recommendation: {
    winner: string;
    confidence: number;
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    reasons: string[];
    betRecommendation: string;
  };
  detailedStats: DetailedStats;
}

async function fetchTeamStats(teamName: string, footballApiKey: string): Promise<any> {
  try {
    // Simular dados realistas baseados no time
    const mockStats = {
      position: teamName.includes('Flamengo') ? 3 : teamName.includes('Palmeiras') ? 1 : Math.floor(Math.random() * 10) + 1,
      homeWins: Math.floor(Math.random() * 8) + 2,
      awayWins: Math.floor(Math.random() * 6) + 1,
      homeGoals: Math.floor(Math.random() * 20) + 15,
      awayGoals: Math.floor(Math.random() * 15) + 8,
      corners: Math.floor(Math.random() * 50) + 30,
      yellowCards: Math.floor(Math.random() * 25) + 15,
      redCards: Math.floor(Math.random() * 5) + 1
    };
    
    return mockStats;
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return null;
  }
}

function calculateEnhancedProbabilities(homeStats: any, awayStats: any, homeTeam: string, awayTeam: string): any {
  const homeAdvantage = 0.15; // 15% vantagem do mandante
  
  // Fatores de força baseados em múltiplas estatísticas
  const homeStrength = (
    (homeStats.homeWins * 0.3) +
    (homeStats.homeGoals * 0.25) +
    ((20 - homeStats.position) * 0.2) + // Melhor posição = mais pontos
    (homeStats.corners * 0.1) +
    ((30 - homeStats.yellowCards) * 0.05) + // Menos cartões = melhor disciplina
    ((10 - homeStats.redCards) * 0.1)
  ) + homeAdvantage;
  
  const awayStrength = (
    (awayStats.awayWins * 0.3) +
    (awayStats.awayGoals * 0.25) +
    ((20 - awayStats.position) * 0.2) +
    (awayStats.corners * 0.1) +
    ((30 - awayStats.yellowCards) * 0.05) +
    ((10 - awayStats.redCards) * 0.1)
  );
  
  const totalStrength = homeStrength + awayStrength;
  
  let homeWinProb = Math.round((homeStrength / totalStrength) * 100);
  let awayWinProb = Math.round((awayStrength / totalStrength) * 100);
  let drawProb = Math.max(20, 100 - homeWinProb - awayWinProb);
  
  // Ajustar para somar 100%
  const total = homeWinProb + awayWinProb + drawProb;
  homeWinProb = Math.round((homeWinProb / total) * 100);
  awayWinProb = Math.round((awayWinProb / total) * 100);
  drawProb = 100 - homeWinProb - awayWinProb;
  
  const winner = homeWinProb > awayWinProb ? homeTeam : awayTeam;
  const confidence = Math.abs(homeWinProb - awayWinProb) + 60;
  
  const reasons = [];
  if (homeWinProb > awayWinProb) {
    reasons.push(`🏠 ${homeTeam} joga em casa com ${homeStats.homeWins} vitórias`);
    if (homeStats.position < awayStats.position) {
      reasons.push(`📊 ${homeTeam} está em melhor posição na tabela (${homeStats.position}º vs ${awayStats.position}º)`);
    }
    if (homeStats.homeGoals > awayStats.awayGoals) {
      reasons.push(`⚽ ${homeTeam} tem melhor média de gols (${homeStats.homeGoals} vs ${awayStats.awayGoals})`);
    }
  } else {
    if (awayStats.position < homeStats.position) {
      reasons.push(`📊 ${awayTeam} está em melhor posição na tabela (${awayStats.position}º vs ${homeStats.position}º)`);
    }
    if (awayStats.awayGoals > homeStats.homeGoals) {
      reasons.push(`⚽ ${awayTeam} tem melhor média de gols fora (${awayStats.awayGoals} vs ${homeStats.homeGoals})`);
    }
    reasons.push(`✈️ ${awayTeam} tem ${awayStats.awayWins} vitórias como visitante`);
  }
  
  const betRecommendation = `Apostar na vitória do ${winner} com ${confidence}% de confiança`;
  
  return {
    winner,
    confidence: Math.min(confidence, 95),
    homeWinProb,
    drawProb,
    awayWinProb,
    reasons,
    betRecommendation
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

    console.log('Analyzing enhanced match:', { league, homeTeam, awayTeam });

    // Buscar estatísticas dos times
    const homeStats = await fetchTeamStats(homeTeam, footballApiKey);
    const awayStats = await fetchTeamStats(awayTeam, footballApiKey);

    // Simular histórico de confrontos diretos
    const headToHeadResults = [
      { date: "2024-01-15", homeGoals: 2, awayGoals: 1, winner: homeTeam },
      { date: "2023-10-20", homeGoals: 1, awayGoals: 2, winner: awayTeam },
      { date: "2023-07-10", homeGoals: 3, awayGoals: 1, winner: homeTeam },
      { date: "2023-03-25", homeGoals: 0, awayGoals: 0, winner: "Draw" },
      { date: "2022-12-05", homeGoals: 2, awayGoals: 3, winner: awayTeam }
    ];

    const homeWinsH2H = headToHeadResults.filter(r => r.winner === homeTeam).length;
    const awayWinsH2H = headToHeadResults.filter(r => r.winner === awayTeam).length;
    const drawsH2H = headToHeadResults.filter(r => r.winner === "Draw").length;

    const recommendation = calculateEnhancedProbabilities(homeStats, awayStats, homeTeam, awayTeam);

    const analysis: EnhancedAnalysis = {
      homeTeam: {
        name: homeTeam,
        position: homeStats.position,
        homeWins: homeStats.homeWins,
        homeGoals: homeStats.homeGoals,
        corners: homeStats.corners,
        yellowCards: homeStats.yellowCards,
        redCards: homeStats.redCards
      },
      awayTeam: {
        name: awayTeam,
        position: awayStats.position,
        awayWins: awayStats.awayWins,
        awayGoals: awayStats.awayGoals,
        corners: awayStats.corners,
        yellowCards: awayStats.yellowCards,
        redCards: awayStats.redCards
      },
      headToHead: {
        homeWins: homeWinsH2H,
        awayWins: awayWinsH2H,
        draws: drawsH2H,
        lastFiveResults: headToHeadResults
      },
      recommendation,
      detailedStats: {
        homeWins: homeStats.homeWins,
        awayWins: awayStats.awayWins,
        homeGoals: homeStats.homeGoals,
        awayGoals: awayStats.awayGoals,
        corners: (homeStats.corners + awayStats.corners) / 2,
        yellowCards: (homeStats.yellowCards + awayStats.yellowCards) / 2,
        redCards: (homeStats.redCards + awayStats.redCards) / 2,
        tablePosition: {
          home: homeStats.position,
          away: awayStats.position
        }
      }
    };

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced match analysis:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
})
