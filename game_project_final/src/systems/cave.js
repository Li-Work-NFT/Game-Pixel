
// src/systems/cave.js
export function wireCave(GameData) {
  const locs = GameData.locations || (GameData.locations={});
  if (!locs['Пещера']) return;

  window.caveGo = function(where){
    if (gameState.isBusy || gameState.isCombatActive) return;
    if (where==='tunnel') {
      appendToLog('Ты протискиваешься в узкий лаз… Впереди сундук.');
      DOMElements.actionButtonsDiv.innerHTML = '';
      const open = document.createElement('button');
      open.textContent = 'Пробовать открыть сундук';
      open.onclick = () => tryOpenChest();
      const back = document.createElement('button');
      back.textContent = 'Назад';
      back.onclick = () => updateGameScene();
      DOMElements.actionButtonsDiv.append(open, back);
    } else {
      appendToLog('В гроте темно и сыро. Кажется, кто-то здесь бродит…');
      if (Math.random()<0.5) startCombat('forest_wolf'); else appendToLog('Пусто.');
    }
  };

  window.tryOpenChest = function() {
    const inv = (gameState.inventory||[]);
    const stack = inv.find(x=>x.id==='lockpick' && (x.quantity||1)>0);
    if (!stack) { appendToLog('Нужны отмычки.'); return; }
    if (Math.random() < 0.7) {
      appendToLog('Щёлк! Замок поддался.');
      removeItem(stack.instanceId, 1);
      if (GameData.items['small_hp_potion']) addItem(GameData.items['small_hp_potion'], 1);
    } else {
      appendToLog('Не вышло. Отмычка сломалась.');
      removeItem(stack.instanceId, 1);
    }
  };
}
