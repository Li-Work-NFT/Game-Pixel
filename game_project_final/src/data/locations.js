
// src/data/locations.js
export function loadLocations(GameData) {
  const L = GameData.locations = { ...(GameData.locations || {}) };

  // базовые (ожидаются в проекте)
  L['Стартовый лагерь'] = L['Стартовый лагерь'] || {
    name:'Стартовый лагерь',
    description:'Небольшой костёр и палатка. Здесь можно отдохнуть.',
    actions:[{ text:'Отдохнуть у костра', func:'startRestAtCamp' }],
    connections:['Лес','Город'],
    background:'assets/backgrounds/camp.jpg'
  };
  L['Лес']   = L['Лес'] || {
    name:'Лес', description:'Пахнет хвоей и сыростью.',
    actions:[{ text:'Охотиться', func:'hunt' }, { text:'Собрать травы', func:'gatherHerbs' }],
    connections:['Стартовый лагерь','Озеро','Город','Руины','Высокий Бор','Перекрёсток'],
    background:'assets/backgrounds/forest.jpg'
  };
  L['Озеро'] = L['Озеро'] || {
    name:'Озеро', description:'Гладкая вода манит рыболова.',
    actions:[{ text:'Рыбачить', func:'fish' }],
    connections:['Лес','Река'],
    background:'assets/backgrounds/lake.jpg'
  };
  L['Шахта'] = L['Шахта'] || {
    name:'Шахта', description:'Гулкие ходы и запах породы.',
    actions:[{ text:'Добывать руду', func:'mineOre' }, { text:'Идти в Пещеру', func:'moveTo', param:'Пещера' }],
    connections:['Город','Пещера','Скалистый Утёс'],
    background:'assets/backgrounds/mine.jpg'
  };
  L['Город'] = L['Город'] || {
    name:'Город', description:'Каменные стены и шум рынка.',
    actions:[{ text:'Зайти в лавку', func:'openShop', param:'city_shop' }, { text:'Идти на Арену', func:'moveTo', param:'Арена' }],
    connections:['Стартовый лагерь','Лес','Озеро','Шахта','Трактир','Ферма','Сторожевая Башня','Перекрёсток','Арена'],
    background:'assets/backgrounds/city.jpg'
  };

  // Новые
  L['Пещера'] = L['Пещера'] || {
    name:'Пещера',
    description:'Сырой воздух и эхо шагов. Узкий лаз и широкий грот.',
    actions:[{ text:'Идти в лаз', func:'caveGo', param:'tunnel' }, { text:'Осмотреть грот', func:'caveGo', param:'grotto' }, { text:'Вернуться в Шахту', func:'moveTo', param:'Шахта' }],
    connections:['Шахта'],
    background:'assets/backgrounds/cave.jpg'
  };
  L['Арена'] = L['Арена'] || {
    name:'Арена',
    description:'Шум толпы и звон металла.',
    actions:[{ text:'Смотреть случайный бой', func:'watchArenaFight' }, { text:'Вернуться в Город', func:'moveTo', param:'Город' }],
    connections:['Город'],
    background:'assets/backgrounds/arena.jpg'
  };
  L['Трактир'] = L['Трактир'] || {
    name:'Трактир «Тёплая кружка»',
    description:'Тёплый свет и запах похлёбки.',
    actions:[{ text:'Отдохнуть за 10 золота', func:'tavernRest' }],
    connections:['Город'],
    background:'assets/backgrounds/tavern.jpg'
  };
  L['Ферма'] = L['Ферма'] || {
    name:'Ферма',
    description:'Поле и загон для скота.',
    actions:[{ text:'Помочь на ферме', func:'farmWork' }],
    connections:['Город'],
    background:'assets/backgrounds/farm.jpg'
  };
  L['Сторожевая Башня'] = L['Сторожевая Башня'] || {
    name:'Сторожевая Башня',
    description:'Стража зорко смотрит вдаль.',
    actions:[],
    connections:['Город'],
    background:'assets/backgrounds/tower.jpg'
  };
  L['Руины'] = L['Руины'] || {
    name:'Руины',
    description:'Обломки старой крепости.',
    actions:[],
    connections:['Лес','Погост'],
    background:'assets/backgrounds/ruins.jpg'
  };
  L['Перекрёсток'] = L['Перекрёсток'] || {
    name:'Перекрёсток',
    description:'Дорога уходит в разные стороны.',
    actions:[],
    connections:['Город','Лес','Река'],
    background:'assets/backgrounds/crossroad.jpg'
  };
  L['Погост'] = L['Погост'] || {
    name:'Погост',
    description:'Холодно и тихо.',
    actions:[],
    connections:['Руины'],
    background:'assets/backgrounds/graveyard.jpg'
  };
  L['Высокий Бор'] = L['Высокий Бор'] || {
    name:'Высокий Бор',
    description:'Смолистый воздух и высокие сосны.',
    actions:[],
    connections:['Лес'],
    background:'assets/backgrounds/pinewood.jpg'
  };
  L['Скалистый Утёс'] = L['Скалистый Утёс'] || {
    name:'Скалистый Утёс',
    description:'Ветры и осыпи.',
    actions:[],
    connections:['Шахта'],
    background:'assets/backgrounds/cliff.jpg'
  };
  L['Река'] = L['Река'] || {
    name:'Река',
    description:'Широкая вода и плеск рыбы.',
    actions:[{ text:'Рыбачить', func:'fish' }],
    connections:['Озеро','Перекрёсток'],
    background:'assets/backgrounds/river.jpg'
  };
}
