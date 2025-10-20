
// src/main.js
import { loadItems }    from './data/items.js';
import { loadEnemies }  from './data/enemies.js';
import { loadLocations }from './data/locations.js';
import { loadShops }    from './data/shops.js';
import { loadQuests }   from './data/quests.js';

import { ensureState } from './systems/state.js';
import { injectBagSlot, patchInventoryIcons } from './systems/ui.js';
import { patchMap } from './systems/map.js';
import { patchCombat } from './systems/combat.js';
import { patchInventory } from './systems/inventory.js';
import { enrichShop } from './systems/shop.js';
import { initQuests } from './systems/quests.js';
import { registerArena } from './systems/arena.js';
import { wireCampRest } from './systems/rest.js';
import { wireCave } from './systems/cave.js';

window.addEventListener('load', () => {
  // Убедимся, что базовые объекты созданы legacy-скриптом
  window.GameData = window.GameData || {};
  window.gameState = window.gameState || { player: { derivedStats:{}, hp:50, maxHp:50, mp:30, maxMp:30, gold: 20 } };
  window.DOMElements = window.DOMElements || {};

  // Данные
  loadItems(GameData);
  loadEnemies(GameData);
  loadLocations(GameData);
  loadShops(GameData);
  loadQuests(GameData);

  // Состояние
  ensureState(gameState);

  // Системы
  injectBagSlot(DOMElements);
  patchInventoryIcons();
  patchMap();
  patchCombat();
  patchInventory();
  enrichShop(GameData);
  initQuests();
  wireCampRest(GameData);
  wireCave(GameData);
  registerArena(GameData);

  // Принудительно обновим экраны, если функции есть
  try { updateGameScene && updateGameScene(); } catch(e){}
  try { updateMapDisplay && updateMapDisplay(); } catch(e){}
});
