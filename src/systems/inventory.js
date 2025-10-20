
// src/systems/inventory.js
function getBagBonusSlots() {
  if (!gameState.equipped || !gameState.equipped.bag) return 0;
  const it = GameData.items[gameState.equipped.bag.itemId];
  return (it && it.invSlotsBonus) || 0;
}
export function getInventoryCapacity() {
  return (gameState.inventoryBaseCapacity || 10) + getBagBonusSlots();
}
export function getUsedSlots() {
  let slots = 0;
  const stacks = {};
  (gameState.inventory||[]).forEach(it => {
    const def = GameData.items[it.id];
    if (def && def.stackable) stacks[it.id] = true;
    else slots += 1;
  });
  return slots + Object.keys(stacks).length;
}
export function hasFreeSlotFor(itemDef) {
  const willUseSlot = !(itemDef.stackable && (gameState.inventory||[]).some(i => i.id === itemDef.id));
  return !willUseSlot || getUsedSlots() < getInventoryCapacity();
}

export function patchInventory() {
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
}
