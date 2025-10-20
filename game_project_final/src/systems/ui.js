
// src/systems/ui.js
export function injectBagSlot(DOMElements) {
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
  if (DOMElements) {
    DOMElements.equippedSlots = DOMElements.equippedSlots || {};
    DOMElements.equippedSlots.bag = document.getElementById(bagSpanId);
    DOMElements.equippedSlotElements = DOMElements.equippedSlotElements || {};
    DOMElements.equippedSlotElements.bag = document.querySelector('.equipment-slot[data-slot="bag"]');
  }
  if (window.GameData) {
    GameData.slotIcons = GameData.slotIcons || {};
    GameData.slotIcons.bag = GameData.slotIcons.bag || '🎒';
  }
}

export function createItemIconNode(item) {
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

export function patchInventoryIcons() {
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
