
// src/systems/rng.js
export function rollWithVariance(base, variance = 0.15) {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.round(min + Math.random() * (max - min));
}
export function applyDefense(raw, defense, minPercent = 0.15) {
  const reduced = raw - defense;
  const floorByPercent = Math.max(1, Math.floor(raw * minPercent));
  return Math.max(floorByPercent, Math.round(reduced));
}
