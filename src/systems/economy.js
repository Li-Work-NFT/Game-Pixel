
// src/systems/economy.js
export function sellPrice(value){ return Math.max(1, Math.floor(value*0.4)); }
export function buyPrice(value){ return Math.max(1, Math.floor(value*1.3)); }
