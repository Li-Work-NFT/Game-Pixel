
// src/systems/map.js
export function patchMap() {
  if (!window.updateMapDisplay) return;
  window.updateMapDisplay = function() {
    DOMElements.mapCurrentLocation.textContent = GameData.locations[gameState.currentLocation].name;
    DOMElements.mapLocationButtons.innerHTML = '';
    Object.keys(GameData.locations)
      .filter(id => id !== gameState.currentLocation)
      .sort((a,b)=> GameData.locations[a].name.localeCompare(GameData.locations[b].name,'ru'))
      .forEach(locId => {
        const btn = document.createElement('button');
        btn.textContent = `Перейти: ${GameData.locations[locId].name}`;
        btn.onclick = () => { moveTo(locId); showScreen('game-play-screen'); };
        DOMElements.mapLocationButtons.appendChild(btn);
      });
  };
}
