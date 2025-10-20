
// src/systems/rest.js
export function wireCampRest(GameData) {
  const camp = GameData.locations && GameData.locations['Стартовый лагерь'];
  if (camp) {
    camp.actions = [{ text:'Отдохнуть у костра', func:'startRestAtCamp' }];
  }
  window.startRestAtCamp = function() {
    if (gameState.isCombatActive || gameState.isBusy || gameState.isResting) {
      appendToLog('⚠️ Сейчас не время для отдыха.');
      return;
    }
    gameState.isResting = true;
    gameState.isBusy = true;
    let secs = 300;
    appendToLog('Ты лег у костра. Отдых (5:00)…');

    DOMElements.actionButtonsDiv.innerHTML = '';
    const standBtn = document.createElement('button');
    standBtn.textContent = 'Встать';
    standBtn.onclick = () => stopRestingAtCamp(false);
    DOMElements.actionButtonsDiv.appendChild(standBtn);

    gameState.restTimerId = setInterval(() => {
      secs--;
      if (secs % 10 === 0 || secs < 10) {
        const m = Math.floor(secs/60), s = String(secs%60).padStart(2,'0');
        appendToLog(`Отдых… ${m}:${s}`);
      }
    }, 1000);

    gameState.restTimeoutId = setTimeout(() => {
      stopRestingAtCamp(true);
    }, 300000);
  };

  window.stopRestingAtCamp = function(complete) {
    if (!gameState.isResting) return;
    clearInterval(gameState.restTimerId);
    clearTimeout(gameState.restTimeoutId);
    gameState.restTimerId = null;
    gameState.restTimeoutId = null;
    if (complete) {
      gameState.player.hp = gameState.player.maxHp;
      gameState.player.mp = gameState.player.maxMp;
      appendToLog('Ты полностью восстановился у костра.');
    } else {
      appendToLog('Ты прервал отдых.');
    }
    gameState.isResting = false;
    gameState.isBusy = false;
    updateGameScene();
  };
}
