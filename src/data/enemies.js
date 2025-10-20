
// src/data/enemies.js
export function loadEnemies(GameData) {
  GameData.enemies = {
    ...(GameData.enemies || {}),
    forest_wolf: { id:'forest_wolf', name:'Лесной волк', hp:28, attack:6, defense:2, exp:8, gold:[1,4] },
    small_game:  { id:'small_game', name:'Мелкая дичь', hp:12, attack:3, defense:0, exp:4, gold:[0,2] },
    cave_rat:    { id:'cave_rat', name:'Пещерная крыса', hp:18, attack:5, defense:1, exp:6, gold:[0,3] },
  };
}
