
// src/systems/shop.js
export function enrichShop(GameData) {
  const city = GameData.shops && GameData.shops['city_shop'];
  if (city) {
    const ensure = (id, price, stock)=> {
      if (!city.items.some(x=>x.itemId===id)) city.items.push({itemId:id, price, stock});
    };
    ensure('ragged_pouch', 30, 5);
    ensure('leather_bag', 100, 3);
    ensure('lockpick', 7, 20);
  }
}
