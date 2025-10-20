
// src/systems/arena.js
import { rollWithVariance, applyDefense } from './rng.js';

export function registerArena(GameData) {
  const locs = GameData.locations || (GameData.locations={});
  if (!locs['Арена']) return; // уже создана в data

  window.watchArenaFight = function(){
    if (gameState.isBusy || gameState.isCombatActive) { appendToLog('⚠️ Занят.'); return; }
    const A = rollFighterNearPlayer('Гладиатор А');
    const B = rollFighterNearPlayer('Гладиатор Б');
    appendToLog(`На арену выходят ${A.name} и ${B.name}!`);
    let turn = 0;
    while (A.hp>0 && B.hp>0 && turn<100) {
      const atk = turn%2===0?A:B, def = turn%2===0?B:A;
      let dmg = rollWithVariance(atk.attack, 0.15);
      if (Math.random()*100 < 10) dmg = Math.round(dmg*1.5);
      const eff = applyDefense(dmg, def.defense, 0.15);
      def.hp -= eff;
      turn++;
    }
    const winner = A.hp>0?A:B;
    appendToLog(`Победил ${winner.name}!`);
  };

  function rollFighterNearPlayer(name) {
    const p = (gameState.player && gameState.player.derivedStats) || { maxHp:50, physAttack:5, defense:2 };
    return {
      name,
      hp: Math.round((p.maxHp||50) * (0.7 + Math.random()*0.6)),
      attack: Math.round((p.physAttack||5) * (0.8 + Math.random()*0.5)),
      defense: Math.round((p.defense||2) * (0.8 + Math.random()*0.5)),
    };
  }
}
