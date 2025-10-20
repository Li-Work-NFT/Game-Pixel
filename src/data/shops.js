
// src/data/shops.js
export function loadShops(GameData) {
  GameData.shops = {
    ...(GameData.shops || {}),
    city_shop: {
      id:'city_shop',
      name:'Городская лавка',
      items: [
        { itemId:'bread', price:10, stock: 10 },
        { itemId:'small_hp_potion', price:35, stock: 8 },
        { itemId:'small_mp_potion', price:40, stock: 6 },
        { itemId:'wooden_sword', price:22, stock: 2 },
        { itemId:'wooden_shield', price:24, stock: 2 },
        { itemId:'leather_jacket', price:32, stock: 2 },
        { itemId:'ragged_pouch', price:30, stock:5 },
        { itemId:'leather_bag',  price:100, stock:3 },
        { itemId:'lockpick',     price:7,  stock:20 },
      ]
    }
  };
}
