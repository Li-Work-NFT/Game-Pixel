
// src/systems/combat.js
function rollWithVariance(base, variance = 0.15) {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.round(min + Math.random() * (max - min));
}
function applyDefense(raw, defense, minPercent = 0.15) {
  const reduced = raw - defense;
  const floorByPercent = Math.max(1, Math.floor(raw * minPercent));
  return Math.max(floorByPercent, Math.round(reduced));
}

export function patchCombat() {
  const origStartCombat = window.startCombat;
  if (origStartCombat) {
    window.startCombat = function(enemyId){
      if (gameState.isCombatActive || gameState.isBusy) {
        appendToLog('⚠️ Ты уже занят и не можешь начать новый бой.');
        return;
      }
      gameState.isPlayerTurn = true;
      return origStartCombat(enemyId);
    };
  }

  window.playerTurnCombat = function(enemy) {
    if (!gameState.isCombatActive || !gameState.isPlayerTurn) return;
    gameState.isPlayerTurn = false;
    let playerDamage = rollWithVariance(gameState.player.derivedStats.physAttack, 0.15);
    const isCrit = Math.random() * 100 < (gameState.player.derivedStats.critChance||0);
    if (isCrit) {
      playerDamage = Math.round(playerDamage * 1.5);
      appendToLog('⭐ Критический удар!');
    }
    const eff = applyDefense(playerDamage, enemy.defense, 0.15);
    enemy.hp -= eff;
    appendToLog(`Ты наносишь ${eff} урона по ${enemy.name}. (HP врага: ${Math.max(0, enemy.hp)})`);
    updatePlayerInfo();
    if (enemy.hp <= 0) {
      endCombat(true, enemy);
    } else {
      gameState.currentCombatInterval = setTimeout(()=>enemyTurnCombat(enemy), 800);
    }
  };

  window.enemyTurnCombat = function(enemy) {
    if (!gameState.isCombatActive || gameState.player.hp <= 0) return;
    let enemyDamage = rollWithVariance(enemy.attack, 0.15);
    const isDodged = Math.random() * 100 < (gameState.player.derivedStats.dodgeChance||0);
    if (isDodged) {
      appendToLog(`Ты увернулся от атаки ${enemy.name}!`);
    } else {
      const eff = applyDefense(enemyDamage, gameState.player.derivedStats.defense, 0.15);
      gameState.player.hp -= eff;
      appendToLog(`${enemy.name} бьёт на ${eff} урона. (Твои HP: ${Math.max(0, gameState.player.hp)})`);
    }
    updatePlayerInfo();
    if (gameState.player.hp <= 0) {
      endCombat(false, enemy);
    } else if (enemy.hp > 0) {
      gameState.isPlayerTurn = true;
    }
  };
}
