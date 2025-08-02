// No evento 'OnChange' do dropdown de campeonatos
function loadTeams(selectedLeague) {
  const times = {
    "Brasileirão Série A": ["Flamengo", "Palmeiras", "São Paulo"],
    "Premier League": ["Arsenal", "Man City", "Liverpool"]
  };
  
  updateDropdown("time-selector", times[selectedLeague]);
}

// No botão "Analisar"
function analisarJogo() {
  const campeonato = getValue("campeonato-selector");
  const time = getValue("time-selector");
  
  // Chama sua função de análise
  gerarAnalise(campeonato, time);
}