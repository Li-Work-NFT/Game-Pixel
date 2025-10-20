
// overrides.compat.js — патчи без ES-модулей, грузить ПОСЛЕ legacy.base.js

(function(){
  // --- Защита от отсутствия базовых объектов ---
  window.GameData = window.GameData || {};
  window.gameState = window.gameState || { player: { derivedStats:{}, hp:50, maxHp:50, mp:30, maxMp:30, gold: 20 } };
  window.DOMElements = window.DOMElements || {};

  // --- Состояние ---
  gameState.equipped = gameState.equipped || {};
  if (!('bag' in gameState.equipped)) gameState.equipped.bag = null;
  if (!('isBusy' in gameState)) gameState.isBusy = false;
  if (!('isResting' in gameState)) gameState.isResting = false;
  if (!('isPlayerTurn' in gameState)) gameState.isPlayerTurn = true;
  if (!('inventoryBaseCapacity' in gameState)) gameState.inventoryBaseCapacity = 10;

  // --- UI: слот сумки ---
  function injectBagSlot() {
    const bagSpanId = 'eq-bag';
    if (!document.getElementById(bagSpanId)) {
      const eqBox = document.getElementById('equipped-slots');
      if (eqBox) {
        const div = document.createElement('div');
        div.className = 'equipment-slot';
        div.dataset.slot = 'bag';
        div.innerHTML = `<span class="slot-icon">🎒</span><span id="${bagSpanId}" data-slottype="bag">Сумка: (Пусто)</span>`;
        eqBox.appendChild(div);
      }
    }
    GameData.slotIcons = GameData.slotIcons || {};
    GameData.slotIcons.bag = GameData.slotIcons.bag || '🎒';
    DOMElements.equippedSlots = DOMElements.equippedSlots || {};
    DOMElements.equippedSlots.bag = document.getElementById(bagSpanId);
    DOMElements.equippedSlotElements = DOMElements.equippedSlotElements || {};
    DOMElements.equippedSlotElements.bag = document.querySelector('.equipment-slot[data-slot="bag"]');
  }

  // --- Иконки PNG с фолбэком ---
  function createItemIconNode(item) {
    const wrap = document.createElement('div');
    wrap.className = 'item-icon';
    const img = new Image();
    img.alt = item.name;
    img.style.display = 'none';
    img.onload = () => { wrap.innerHTML=''; img.style.display='block'; wrap.appendChild(img); };
    img.onerror = () => { wrap.innerHTML = `<i>${item.icon || '⬜'}</i>`; };
    img.src = `assets/items/${item.id}.png`;
    wrap.innerHTML = `<i>${item.icon || '⬜'}</i>`;
    return wrap;
  }
  function patchInventoryIcons(){
    if (!window.updateInventoryDisplay) return;
    const originalUpdate = window.updateInventoryDisplay;
    window.updateInventoryDisplay = function() {
      originalUpdate();
      const nodes = document.querySelectorAll('.inventory-item');
      nodes.forEach(node => {
        const spanName = node.querySelector('span');
        const i = node.querySelector('i');
        if (!i || !spanName) return;
        const invId = node.dataset.instanceId && Number(node.dataset.instanceId);
        const itemInState = (gameState.inventory||[]).find(it => it.instanceId === invId);
        const full = itemInState ? GameData.items[itemInState.id] : null;
        if (!full) return;
        const iconNode = createItemIconNode(full);
        i.replaceWith(iconNode);
      });
    };
  }

  // --- Инвентарь: вместимость + сумка ---
  function getBagBonusSlots() {
    if (!gameState.equipped || !gameState.equipped.bag) return 0;
    const it = GameData.items[gameState.equipped.bag.itemId];
    return (it && it.invSlotsBonus) || 0;
  }
  function getInventoryCapacity() {
    return (gameState.inventoryBaseCapacity || 10) + getBagBonusSlots();
  }
  function getUsedSlots() {
    let slots = 0;
    const stacks = {};
    (gameState.inventory||[]).forEach(it => {
      const def = GameData.items[it.id];
      if (def && def.stackable) stacks[it.id] = true;
      else slots += 1;
    });
    return slots + Object.keys(stacks).length;
  }
  function hasFreeSlotFor(itemDef) {
    const willUseSlot = !(itemDef.stackable && (gameState.inventory||[]).some(i => i.id === itemDef.id));
    return !willUseSlot || getUsedSlots() < getInventoryCapacity();
  }
  (function(){
    const origAdd = window.addItem;
    if (origAdd) {
      window.addItem = function(item, quantity=1, forceInstanceId=null){
        if (!item) return origAdd(item, quantity, forceInstanceId);
        if (!hasFreeSlotFor(item)) {
          appendToLog(`❌ Не хватает места в рюкзаке для ${item.name}.`);
          return false;
        }
        return origAdd(item, quantity, forceInstanceId);
      }
    }
    const origUnequip = window.unequipItem;
    if (origUnequip) {
      window.unequipItem = function(slotName){
        if (slotName === 'bag') {
          const bag = gameState.equipped.bag && GameData.items[gameState.equipped.bag.itemId];
          if (bag) {
            const capNow = getInventoryCapacity();
            const capAfter = capNow - (bag.invSlotsBonus||0);
            if (getUsedSlots() > capAfter) {
              appendToLog('🎒 Сначала освободите место в рюкзаке, чтобы снять сумку.');
              return false;
            }
          }
        }
        return origUnequip(slotName);
      };
    }
  })();

  // --- Бой ---
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
  (function(){
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
  })();

  // --- Отдых у костра ---
  function wireCampRest() {
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

  // --- Карта: все локации ---
  function patchMap() {
    if (!window.updateMapDisplay) return;
    window.updateMapDisplay = function() {
      try {
        DOMElements.mapCurrentLocation.textContent = GameData.locations[gameState.currentLocation].name;
      } catch(e) {}
      const container = DOMElements.mapLocationButtons || document.getElementById('map-location-buttons') || document.querySelector('.map-location-buttons');
      if (!container) return;
      container.innerHTML = '';
      Object.keys(GameData.locations)
        .filter(id => id !== gameState.currentLocation)
        .sort((a,b)=> GameData.locations[a].name.localeCompare(GameData.locations[b].name,'ru'))
        .forEach(locId => {
          const btn = document.createElement('button');
          btn.textContent = `Перейти: ${GameData.locations[locId].name}`;
          btn.onclick = () => { moveTo(locId); showScreen('game-play-screen'); };
          container.appendChild(btn);
        });
    };
  }

  // --- Пещера и Арена и предметы/магазин ---
  function addContent() {
    // items
    const items = GameData.items || (GameData.items={});
    items['ragged_pouch'] = items['ragged_pouch'] || { id:'ragged_pouch', name:'Старый рваный мешок', icon:'🧶', type:'bag', slot:'bag', description:'+4 слота к инвентарю.', value:25, invSlotsBonus:4, actions:['equip','sell'] };
    items['leather_bag']  = items['leather_bag']  || { id:'leather_bag',  name:'Кожаная сумка', icon:'👜', type:'bag', slot:'bag', description:'+8 слотов к инвентарю.', value:80, invSlotsBonus:8, actions:['equip','sell'] };
    items['lockpick']     = items['lockpick']     || { id:'lockpick',     name:'Отмычка', icon:'🗝️', type:'tool', value:5, stackable:true, actions:['use','sell'] };

    // shops
    GameData.shops = GameData.shops || {};
    const city = GameData.shops['city_shop'] || (GameData.shops['city_shop'] = {id:'city_shop', name:'Городская лавка', items:[]});
    const ensure = (id, price, stock)=>{ if (!city.items.some(x=>x.itemId===id)) city.items.push({itemId:id, price, stock}); };
    ensure('ragged_pouch', 30, 5);
    ensure('leather_bag', 100, 3);
    ensure('lockpick', 7, 20);

    // locations
    const L = GameData.locations || (GameData.locations={});
    L['Пещера'] = L['Пещера'] || { name:'Пещера', description:'Сырой воздух и эхо шагов. Узкий лаз и широкий грот.', actions:[{text:'Идти в лаз', func:'caveGo', param:'tunnel'},{text:'Осмотреть грот', func:'caveGo', param:'grotto'},{text:'Вернуться в Шахту', func:'moveTo', param:'Шахта'}], connections:['Шахта'], background:'assets/backgrounds/cave.jpg' };
    if (L['Шахта'] && Array.isArray(L['Шахта'].connections) && !L['Шахта'].connections.includes('Пещера')) L['Шахта'].connections.push('Пещера');

    L['Арена'] = L['Арена'] || { name:'Арена', description:'Шум толпы и звон металла.', actions:[{text:'Смотреть случайный бой', func:'watchArenaFight'},{text:'Вернуться в Город', func:'moveTo', param:'Город'}], connections:['Город'], background:'assets/backgrounds/arena.jpg' };
    if (L['Город'] && Array.isArray(L['Город'].connections) && !L['Город'].connections.includes('Арена')) L['Город'].connections.push('Арена');
  }

  function watchArenaFight(){} // placeholder to satisfy linter; real defined below

  // --- Арена ---
  function registerArena(){
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

  // --- Карта автообновления после показа ---
  function hookShowMap(){
    const origShow = window.showScreen;
    if (!origShow) return;
    window.showScreen = function(screen){
      const res = origShow(screen);
      if (screen === 'map-screen' && window.updateMapDisplay) {
        setTimeout(()=>updateMapDisplay(), 0);
      }
      return res;
    };
  }

  // --- Запуск после загрузки ---
  window.addEventListener('load', function(){
    injectBagSlot();
    patchInventoryIcons();
    addContent();
    wireCampRest();
    patchMap();
    registerArena();
    hookShowMap();
    try { updateGameScene && updateGameScene(); } catch(e){}
    try { updateMapDisplay && updateMapDisplay(); } catch(e){}
  });
})();
