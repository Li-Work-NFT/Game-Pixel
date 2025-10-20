
// src/systems/state.js
export function ensureState(gameState) {
  gameState.equipped = gameState.equipped || {};
  if (!('bag' in gameState.equipped)) gameState.equipped.bag = null;

  if (!('isBusy' in gameState)) gameState.isBusy = false;
  if (!('isResting' in gameState)) gameState.isResting = false;
  if (!('isPlayerTurn' in gameState)) gameState.isPlayerTurn = true;
  if (!('inventoryBaseCapacity' in gameState)) gameState.inventoryBaseCapacity = 10;

  gameState.restTimerId = null;
  gameState.restTimeoutId = null;
}
