
// src/data/items.js
export function loadItems(GameData) {
  GameData.items = {
    ...(GameData.items || {}),
    wood: { id:'wood', name:'Дрова', icon:'🪵', type:'resource', value:4, stackable:true, actions:['sell'] },
    iron_ore: { id:'iron_ore', name:'Железная руда', icon:'⛏️', type:'resource', value:6, stackable:true, actions:['sell'] },
    animal_pelt: { id:'animal_pelt', name:'Шкура зверя', icon:'🦊', type:'resource', value:5, stackable:true, actions:['sell'] },
    forest_herb: { id:'forest_herb', name:'Лесная трава', icon:'🌿', type:'resource', value:3, stackable:true, actions:['use','sell'] },
    lake_fish: { id:'lake_fish', name:'Рыба', icon:'🐟', type:'food', value:5, stackable:true, actions:['use','sell'] },
    raw_meat:   { id:'raw_meat', name:'Сырое мясо', icon:'🥩', type:'food', value:5, stackable:true, actions:['use','sell'] },
    elder_ring: { id:'elder_ring', name:'Кольцо старейшины', icon:'💍', type:'quest', value:20, actions:['sell'] },
    supply_list:{ id:'supply_list', name:'Список припасов', icon:'📜', type:'quest', value:1, actions:[] },

    small_hp_potion: { id:'small_hp_potion', name:'Малая настойка лечения', icon:'🧪', type:'potion', value:30, stackable:true, actions:['use','sell'] },
    small_mp_potion: { id:'small_mp_potion', name:'Малая настойка маны', icon:'🔮', type:'potion', value:35, stackable:true, actions:['use','sell'] },
    bread: { id:'bread', name:'Хлеб', icon:'🍞', type:'food', value:8, stackable:true, actions:['use','sell'] },

    wooden_sword: { id:'wooden_sword', name:'Деревянный меч', icon:'🗡️', type:'weapon', slot:'weapon', value:20, physAttack:3, actions:['equip','sell'] },
    hunting_bow:  { id:'hunting_bow',  name:'Охотничий лук', icon:'🏹', type:'weapon', slot:'weapon', value:22, physAttack:3, actions:['equip','sell'] },
    short_staff:  { id:'short_staff',  name:'Короткий посох', icon:'🪄', type:'weapon', slot:'weapon', value:18, physAttack:2, actions:['equip','sell'] },
    stone_axe:    { id:'stone_axe',    name:'Каменный топор', icon:'🪓', type:'weapon', slot:'weapon', value:25, physAttack:4, actions:['equip','sell'] },

    leather_jacket: { id:'leather_jacket', name:'Кожаная куртка', icon:'🥋', type:'armor', slot:'armor', value:28, defense:2, actions:['equip','sell'] },
    simple_boots:   { id:'simple_boots',   name:'Простые сапоги', icon:'🥾', type:'boots', slot:'boots', value:16, defense:1, actions:['equip','sell'] },
    wooden_shield:  { id:'wooden_shield',  name:'Деревянный щит', icon:'🛡️', type:'shield', slot:'shield', value:22, defense:2, actions:['equip','sell'] },

    ragged_pouch: { id:'ragged_pouch', name:'Старый рваный мешок', icon:'🧶', type:'bag', slot:'bag',
      description:'+4 слота к инвентарю.', value:25, invSlotsBonus:4, actions:['equip','sell'] },
    leather_bag:  { id:'leather_bag',  name:'Кожаная сумка', icon:'👜', type:'bag', slot:'bag',
      description:'+8 слотов к инвентарю.', value:80, invSlotsBonus:8, actions:['equip','sell'] },
    lockpick:     { id:'lockpick',     name:'Отмычка', icon:'🗝️', type:'tool', value:5, stackable:true, actions:['use','sell'] },
  };
}
