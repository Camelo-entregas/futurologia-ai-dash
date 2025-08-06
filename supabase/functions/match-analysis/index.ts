
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
    // Simular dados mais realistas baseados nos times específicos
    const teamStrengthMap: { [key: string]: number } = {
      // Série A - Times mais fortes
      'Flamengo': 0.9, 'Palmeiras': 0.9, 'São Paulo': 0.8, 'Corinthians': 0.8,
      'Atlético-MG': 0.8, 'Internacional': 0.7, 'Grêmio': 0.7, 'Santos': 0.7,
      'Vasco': 0.6, 'Cruzeiro': 0.7, 'Botafogo': 0.8, 'Fluminense': 0.7,
      'Athletico-PR': 0.6, 'Fortaleza': 0.6, 'Bragantino': 0.6, 'Bahia': 0.5,
      'Goiás': 0.4, 'Coritiba': 0.4, 'América-MG': 0.4, 'Cuiabá': 0.5,
      
      // Série B
      'Sport': 0.7, 'Ceará': 0.6, 'Vila Nova': 0.5, 'Novorizontino': 0.5,
      'Avaí': 0.5, 'Operário-PR': 0.4, 'Ponta Grossa': 0.4, 'Chapecoense': 0.4,
      'Botafogo-SP': 0.4, 'Mirassol': 0.4, 'CRB': 0.4, 'Tombense': 0.3,
      'Londrina': 0.3, 'Sampaio Corrêa': 0.3, 'Ituano': 0.3, 'Guarani': 0.3,
      
      // Outros
      'Arsenal': 0.9, 'Man City': 1.0, 'Liverpool': 0.9, 'Chelsea': 0.8,
      'Real Madrid': 1.0, 'Barcelona': 0.9, 'Juventus': 0.8, 'Inter': 0.8
    };
    
    const baseStrength = teamStrengthMap[teamName] || 0.5;
    
    const mockStats = {
      position: Math.max(1, Math.floor((1 - baseStrength) * 18) + Math.floor(Math.random() * 3)),
      homeWins: Math.floor(baseStrength * 12) + Math.floor(Math.random() * 4),
      awayWins: Math.floor(baseStrength * 8) + Math.floor(Math.random() * 3),
      homeGoals: Math.floor(baseStrength * 25) + Math.floor(Math.random() * 8) + 12,
      awayGoals: Math.floor(baseStrength * 18) + Math.floor(Math.random() * 6) + 8,
      corners: Math.floor(baseStrength * 60) + Math.floor(Math.random() * 20) + 30,
      yellowCards: Math.max(5, Math.floor((1 - baseStrength) * 30) + Math.floor(Math.random() * 10)),
      redCards: Math.max(0, Math.floor((1 - baseStrength) * 8) + Math.floor(Math.random() * 3))
    };
    
    return mockStats;
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return null;
  }
}

function calculateEnhancedProbabilities(homeStats: any, awayStats: any, homeTeam: string, awayTeam: string): any {
  const homeAdvantage = 15; // 15% vantagem do mandante
  
  // Calcular força dos times com pesos mais balanceados
  const homeStrength = (
    (homeStats.homeWins * 4) +           // Vitórias em casa têm peso alto
    (homeStats.homeGoals * 2) +          // Gols marcados em casa
    ((20 - homeStats.position) * 3) +    // Posição na tabela (inverso)
    (homeStats.corners * 0.5) +          // Escanteios indicam pressão
    (Math.max(0, 25 - homeStats.yellowCards) * 1) + // Disciplina
    (Math.max(0, 8 - homeStats.redCards) * 2)       // Menos expulsões
  );
  
  const awayStrength = (
    (awayStats.awayWins * 5) +           // Vitórias fora são mais valiosas
    (awayStats.awayGoals * 2.5) +        // Gols fora são mais difíceis
    ((20 - awayStats.position) * 3) +
    (awayStats.corners * 0.5) +
    (Math.max(0, 25 - awayStats.yellowCards) * 1) +
    (Math.max(0, 8 - awayStats.redCards) * 2)
  );
  
  // Aplicar vantagem do mandante
  const adjustedHomeStrength = homeStrength + homeAdvantage;
  const totalStrength = adjustedHomeStrength + awayStrength;
  
  // Calcular probabilidades mais realistas
  let homeWinProb = Math.round((adjustedHomeStrength / totalStrength) * 100);
  let awayWinProb = Math.round((awayStrength / totalStrength) * 100);
  
  // Garantir probabilidade mínima de empate (15-35%)
  let drawProb = Math.max(15, Math.min(35, 100 - homeWinProb - awayWinProb));
  
  // Redistribuir para somar 100%
  const remaining = 100 - drawProb;
  homeWinProb = Math.round((homeWinProb / (homeWinProb + awayWinProb)) * remaining);
  awayWinProb = remaining - homeWinProb;
  
  // Determinar o vencedor mais provável
  let winner: string;
  let confidence: number;
  
  if (homeWinProb > awayWinProb && homeWinProb > drawProb) {
    winner = homeTeam;
    confidence = Math.min(95, homeWinProb + Math.abs(homeWinProb - Math.max(awayWinProb, drawProb)));
  } else if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
    winner = awayTeam;
    confidence = Math.min(95, awayWinProb + Math.abs(awayWinProb - Math.max(homeWinProb, drawProb)));
  } else {
    // Se empate for mais provável, escolher o time com melhor posição
    winner = homeStats.position < awayStats.position ? homeTeam : awayTeam;
    confidence = Math.min(75, Math.abs(homeWinProb - awayWinProb) + 50);
  }
  
  // Gerar justificativas mais detalhadas
  const reasons = [];
  
  if (winner === homeTeam) {
    reasons.push(`🏠 ${homeTeam} joga em casa com ${homeStats.homeWins} vitórias (vantagem do mandante)`);
    if (homeStats.position < awayStats.position) {
      reasons.push(`📊 ${homeTeam} está melhor posicionado na tabela (${homeStats.position}º vs ${awayStats.position}º)`);
    }
    if (homeStats.homeGoals > awayStats.awayGoals) {
      reasons.push(`⚽ ${homeTeam} tem melhor ataque em casa (${homeStats.homeGoals} vs ${awayStats.awayGoals} gols fora)`);
    }
    if (homeStats.yellowCards < awayStats.yellowCards) {
      reasons.push(`🟨 ${homeTeam} tem melhor disciplina (${homeStats.yellowCards} vs ${awayStats.yellowCards} cartões)`);
    }
  } else {
    if (awayStats.position < homeStats.position) {
      reasons.push(`📊 ${awayTeam} está melhor posicionado na tabela (${awayStats.position}º vs ${homeStats.position}º)`);
    }
    reasons.push(`✈️ ${awayTeam} tem boa campanha como visitante (${awayStats.awayWins} vitórias fora)`);
    if (awayStats.awayGoals > homeStats.homeGoals * 0.7) {
      reasons.push(`⚽ ${awayTeam} tem bom ataque fora de casa (${awayStats.awayGoals} gols)`);
    }
    if (awayStats.yellowCards < homeStats.yellowCards) {
      reasons.push(`🟨 ${awayTeam} tem melhor disciplina (${awayStats.yellowCards} vs ${homeStats.yellowCards} cartões)`);
    }
  }
  
  const betRecommendation = `Apostar na vitória do ${winner} - Probabilidade: ${winner === homeTeam ? homeWinProb : awayWinProb}%`;
  
  return {
    winner,
    confidence,
    homeWinProb,
    drawProb,
    awayWinProb,
    reasons: reasons.slice(0, 4), // Máximo 4 justificativas
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

    // Simular histórico de confrontos diretos mais realista
    const homeWinsH2H = Math.floor(Math.random() * 3) + 1;
    const awayWinsH2H = Math.floor(Math.random() * 3) + 1;
    const drawsH2H = Math.max(0, 5 - homeWinsH2H - awayWinsH2H);
    
    const headToHeadResults = Array.from({ length: 5 }, (_, i) => {
      const outcomes = [
        ...Array(homeWinsH2H).fill(homeTeam),
        ...Array(awayWinsH2H).fill(awayTeam),
        ...Array(drawsH2H).fill("Draw")
      ];
      const winner = outcomes[i] || "Draw";
      const homeGoals = winner === homeTeam ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
      const awayGoals = winner === awayTeam ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
      
      return {
        date: new Date(Date.now() - (i * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        homeGoals,
        awayGoals,
        winner
      };
    });

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

    console.log('Analysis completed:', {
      winner: recommendation.winner,
      confidence: recommendation.confidence,
      probabilities: `${recommendation.homeWinProb}% - ${recommendation.drawProb}% - ${recommendation.awayWinProb}%`
    });

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
