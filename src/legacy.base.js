// =====================================================================================================================
// === DOMElements - Кэширование всех необходимых элементов DOM для быстрого доступа ===
// =====================================================================================================================
const DOMElements = {
    // Экраны
    startScreen: document.getElementById('start-screen'),
    characterCreationScreen: document.getElementById('character-creation-screen'),
    gamePlayScreen: document.getElementById('game-play-screen'),
    mapScreen: document.getElementById('map-screen'),
    inventoryScreen: document.getElementById('inventory-screen'),
    questsScreen: document.getElementById('quests-screen'),
    characterScreen: document.getElementById('character-screen'),
    shopScreen: document.getElementById('shop-screen'),

    // Элементы Стартового Экрана
    btnStartNewGame: document.getElementById('btn-start-new-game'),
    btnLoadGame: document.getElementById('btn-load-game'),

    // Элементы Создания Персонажа
    charNameInput: document.getElementById('character-name-input'),
    charClassButtons: document.querySelectorAll('.class-selection button'),
    btnCreateCharacter: document.getElementById('btn-create-character'),

    // Верхняя Панель Игрока (top-player-bar)
    playerAvatar: document.querySelector('#top-player-bar .player-avatar'),
    playerName: document.getElementById('player-name'),
    playerClass: document.getElementById('player-class'),
    playerLevel: document.getElementById('player-level'),
    playerXP: document.getElementById('player-xp'),
    playerXPToLevel: document.getElementById('player-xp-to-level'),
    xpBar: document.getElementById('xp-bar'),
    playerHP: document.getElementById('player-hp'),
    playerMaxHP: document.getElementById('player-max-hp'),
    hpBar: document.getElementById('hp-bar'),
    playerMP: document.getElementById('player-mp'),
    playerMaxMP: document.getElementById('player-max-mp'),
    mpBar: document.getElementById('mp-bar'),
    playerGold: document.getElementById('player-gold'),

    // Центральная Область Игры (central-game-area)
    sceneDescriptionPanel: document.getElementById('scene-description'), // Панель с описанием локации
    locationName: document.getElementById('location-name'),
    locationText: document.getElementById('location-text'),
    gameLog: document.getElementById('game-log'),
    actionButtonsDiv: document.getElementById('action-buttons'),
    centralGameArea: document.getElementById('central-game-area'), // Добавил для управления фоном

    // Нижняя Панель Навигации (bottom-nav-bar)
    btnMap: document.getElementById('btn-map'),
    btnInventory: document.getElementById('btn-inventory'),
    btnQuests: document.getElementById('btn-quests'),
    btnCharacter: document.getElementById('btn-character'),

    // Элементы Карты (map-screen)
    mapCurrentLocation: document.getElementById('map-current-location'),
    mapLocationButtons: document.getElementById('map-location-buttons'),

    // Элементы Инвентаря (inventory-screen)
    equippedSlots: { // SPAN-элементы внутри div.equipment-slot
        weapon: document.getElementById('eq-weapon'),
        shield: document.getElementById('eq-shield'),
        armor: document.getElementById('eq-armor'),
        helmet: document.getElementById('eq-helmet'),
        boots: document.getElementById('eq-boots'),
        accessory1: document.getElementById('eq-accessory1'),
        accessory2: document.getElementById('eq-accessory2'),
    },
    // DIV-элементы .equipment-slot (для клика и стилизации)
    equippedSlotElements: {
        weapon: document.querySelector('.equipment-slot[data-slot="weapon"]'),
        shield: document.querySelector('.equipment-slot[data-slot="shield"]'),
        armor: document.querySelector('.equipment-slot[data-slot="armor"]'),
        helmet: document.querySelector('.equipment-slot[data-slot="helmet"]'),
        boots: document.querySelector('.equipment-slot[data-slot="boots"]'),
        accessory1: document.querySelector('.equipment-slot[data-slot="accessory1"]'),
        accessory2: document.querySelector('.equipment-slot[data-slot="accessory2"]'),
    },
    backpackGrid: document.getElementById('inventory-grid'),
    itemDetailsPanel: document.getElementById('item-details-panel'),
    detailItemName: document.getElementById('detail-item-name'),
    detailItemDescription: document.getElementById('detail-item-description'),
    detailItemStats: document.getElementById('detail-item-stats'),
    detailItemActions: document.getElementById('detail-item-actions'),

    // Элементы Журнала Заданий (quests-screen)
    activeQuestsList: document.getElementById('active-quests-list'),
    completedQuestsList: document.getElementById('completed-quests-list'),

    // Элементы Экрана Персонажа (character-screen)
    charScreenName: document.getElementById('char-screen-name'),
    charName: document.getElementById('char-name'),
    charClass: document.getElementById('char-class'),
    charLevel: document.getElementById('char-level'),
    charXP: document.getElementById('char-xp'),
    charXPToLevel: document.getElementById('char-xp-to-level'),
    skillPoints: document.getElementById('skill-points'),
    attrStr: document.getElementById('attr-str'),
    attrDex: document.getElementById('attr-dex'),
    attrInt: document.getElementById('attr-int'),
    attrVit: document.getElementById('attr-vit'),
    addAttributeBtns: document.querySelectorAll('.add-attribute-btn'),
    derivedMaxHp: document.getElementById('derived-max-hp'),
    derivedMaxMp: document.getElementById('derived-max-mp'),
    derivedPhysAtk: document.getElementById('derived-phys-atk'),
    derivedMagAtk: document.getElementById('derived-mag-atk'),
    derivedDef: document.getElementById('derived-def'),
    derivedCrit: document.getElementById('derived-crit'),
    derivedDodge: document.getElementById('derived-dodge'),
    classSkillsList: document.getElementById('class-skills-list'),

    // Элементы Магазина (shop-screen)
    shopName: document.getElementById('shop-name'),
    shopGrid: document.getElementById('shop-grid'),
    shopDetailItemName: document.getElementById('shop-detail-item-name'),
    shopDetailItemDescription: document.getElementById('shop-detail-item-description'),
    shopDetailItemStats: document.getElementById('shop-detail-item-stats'),
    shopDetailItemPrice: document.getElementById('shop-detail-item-price'),
    shopDetailItemActions: document.getElementById('shop-detail-item-actions'),
    buyButton: document.getElementById('buy-button'),
    shopPlayerGold: document.getElementById('shop-player-gold'),
};


// =====================================================================================================================
// === GameState - Объект, хранящий все динамические данные игры ===
// =====================================================================================================================
let gameState = {
    player: {
        name: '',
        class: '',
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        skillPoints: 0,
        gold: 0,
        hp: 0,
        maxHp: 0,
        mp: 0,
        maxMp: 0,
        stats: {
            str: 0,
            dex: 0,
            int: 0,
            vit: 0,
        },
        derivedStats: {
            physAttack: 0,
            magAttack: 0,
            defense: 0,
            critChance: 5,
            dodgeChance: 5,
        }
    },
    inventory: [], // Массив { itemId: '...', instanceId: ..., quantity: ... }
    equipped: {
        weapon: null,
        shield: null,
        armor: null,
        helmet: null,
        boots: null,
        accessory1: null,
        accessory2: null,
    },
    currentLocation: 'Стартовый лагерь', // Начинаем в городе после создания персонажа
    gameLog: [],
    activeQuests: [], // { id: '...', progress: {}, status: 'active' }
    completedQuests: [], // { id: '...' }
    selectedInventoryItem: null,
    selectedShopItemData: null, // Переименовано для ясности
    currentShopId: null,
    isCombatActive: false, // Флаг для контроля активного боя
    currentCombatInterval: null, // Хранит ID интервала для боя
};

let lastInstanceId = 0; // Для уникальных ID экземпляров предметов


// =====================================================================================================================
// === GameData - Все статические данные игры: локации, предметы, враги, квесты, магазины ===
// =====================================================================================================================
const GameData = {
    // -----------------------------------------------------------------------------------------------------------------
    // Аватары классов (пути к изображениям или эмодзи)
    // -----------------------------------------------------------------------------------------------------------------
    classAvatars: {
        'Воин': 'assets/avatars/warrior.png', // Путь к картинке Воина (если есть)
        'Охотник': 'assets/avatars/hunter.png', // Путь к картинке Охотника (если есть)
        'Маг': 'assets/avatars/mage.png', // Путь к картинке Мага (если есть)
        'Ремесленник': 'assets/avatars/craftsman.png', // Путь к картинке Ремесленника (если есть)
        
        // Эмодзи (будут использоваться, если картинка не найдена или не указана)
        'Воин_emoji': '💪',
        'Охотник_emoji': '🏹',
        'Маг_emoji': '✨',
        'Ремесленник_emoji': '🛠️',
    },
    // -----------------------------------------------------------------------------------------------------------------
    // Иконки слотов (используются в updateInventoryDisplay, если слот пуст или картинка слота не загрузилась)
    // -----------------------------------------------------------------------------------------------------------------
    slotIcons: {
        weapon: '⚔️',
        shield: '🛡️',
        armor: '🧥',
        helmet: '🪖',
        boots: '👢',
        accessory1: '💍',
        accessory2: '💎',
    },

    // -----------------------------------------------------------------------------------------------------------------
    // Локации (Город, Лес, Озеро) - с бэкграундами
    // -----------------------------------------------------------------------------------------------------------------
    locations: {
        
'Стартовый лагерь': {
    name: 'Стартовый лагерь',
    description: 'Небольшой привал у костра. Здесь тихо и безопасно. Можно собраться с силами и выбрать направление.',
    actions: [
        { text: 'Отдохнуть у костра', func: 'restAtCamp' },
        { text: 'Открыть карту', func: 'showScreen', param: 'map-screen' }
    ],
    connections: ['Город'],
    background: 'assets/backgrounds/camp.jpg'
},

        'Город': {
            name: 'Город',
            description: 'Ты в центре оживленного города. Вокруг снуют люди, слышен звон монет и запахи еды. Здесь безопасно. Что будешь делать?',
            // Только локационные действия. Кнопки перемещения на карту.
            actions: [
                { text: 'Поговорить со Старейшиной', func: 'talkToElder' },
                { text: 'Посетить Лавку', func: 'visitShop', shopId: 'city_shop' },
            ],
            // Связи локаций, используемые для построения кнопок на экране карты
            connections: ['Лес', 'Озеро', 'Стартовый лагерь', 'Шахта'], 
            background: 'assets/backgrounds/city.jpg' // Путь к фоновой картинке Города
        },
        
'Шахта': {
    name: 'Шахта',
    description: 'Тёмные штреки и запах сырой породы. Кажется, здесь можно добыть руду.',
    actions: [
        { text: 'Добывать руду', func: 'mineOre' }
    ],
    connections: ['Город'],
    background: 'assets/backgrounds/mine.jpg'
},
        'Лес': {
            name: 'Лес',
            description: 'Вокруг тебя густой лес, пахнет хвоей и влажной землей. Кажется, здесь можно что-то найти.',
            actions: [
                { text: 'Охотиться', func: 'hunt' },
                { text: 'Рубить деревья', func: 'chopWood' },
            ],
            connections: ['Город'], // Из Леса можно только в Город
            background: 'assets/backgrounds/forest.jpg' // Путь к фоновой картинке Леса
        },
        'Озеро': {
            name: 'Озеро',
            description: 'Тихая заводь, вода блестит на солнце. Отличное место для рыбалки.',
            actions: [
                { text: 'Рыбачить', func: 'fish' },
                { text: 'Осмотреть берег', func: 'exploreShore' },
            ],
            connections: ['Город'], // Из Озера можно только в Город
            background: 'assets/backgrounds/lake.jpg' // Путь к фоновой картинке Озера
        },
    },

    // -----------------------------------------------------------------------------------------------------------------
    // Предметы (основные типы) - с эмодзи. ID используются в коде, name - для отображения.
    // -----------------------------------------------------------------------------------------------------------------
    items: {
        // Ресурсы
        'wood': { id: 'wood', name: 'Дерево', icon: '🪵', type: 'resource', description: 'Обычное бревно. Можно продать или использовать.', value: 5, actions: ['sell'], stackable: true },
        'iron_ore': { id: 'iron_ore', name: 'Железная Руда', icon: '🪨', type: 'resource', description: 'Кусок железной руды. Нужен кузнецу.', value: 8, actions: ['sell'], stackable: true },
        'animal_pelt': { id: 'animal_pelt', name: 'Шкура Животного', icon: '🐺', type: 'resource', description: 'Добыта с лесных зверей. Пригодится охотникам.', value: 15, actions: ['sell'], stackable: true },
        'forest_herb': { id: 'forest_herb', name: 'Лесная Трава', icon: '🌿', type: 'resource', description: 'Полезные травы, растущие в лесу.', value: 10, actions: ['sell'], stackable: true },
        'lake_fish': { id: 'lake_fish', name: 'Озерная Рыба', icon: '🐠', type: 'food', description: 'Свежепойманная рыба. Можно съесть.', value: 12, hpRestore: 15, actions: ['use', 'sell'], stackable: true },
        'raw_meat': { id: 'raw_meat', name: 'Сырое Мясо', icon: '🥩', type: 'food', description: 'Кусок сырого мяса. Лучше приготовить.', value: 10, hpRestore: 5, actions: ['use', 'sell'], stackable: true },
        
        // Квестовые предметы
        'elder_ring': { id: 'elder_ring', name: 'Кольцо Старейшины', icon: '💍', type: 'quest_item', description: 'Потерянное кольцо Старейшины.', value: 0, actions: ['examine'] },
        'supply_list': { id: 'supply_list', name: 'Список Поставок', icon: '📜', type: 'quest_item', description: 'Список предметов, нужных торговцу.', value: 0, actions: ['examine'] },

        // Расходники
        'small_hp_potion': { id: 'small_hp_potion', name: 'Малое Зелье Здоровья', icon: '🧪', type: 'potion', description: 'Восстанавливает 25 HP.', value: 20, hpRestore: 25, actions: ['use', 'sell'], stackable: true },
        'small_mp_potion': { id: 'small_mp_potion', name: 'Малое Зелье Маны', icon: '⚗️', type: 'potion', description: 'Восстанавливает 20 MP.', value: 20, mpRestore: 20, actions: ['use', 'sell'], stackable: true },
        'bread': { id: 'bread', name: 'Хлеб', icon: '🍞', type: 'food', description: 'Свежий, вкусный хлеб. Восстанавливает силы.', value: 10, hpRestore: 15, actions: ['use', 'sell'], stackable: true },
        
        // Оружие
        'wooden_sword': { id: 'wooden_sword', name: 'Деревянный Меч', icon: '🗡️', type: 'weapon', description: 'Простенький деревянный меч. Для новичков.', value: 15, damage: 5, slot: 'weapon', actions: ['equip', 'sell'] },
        'hunting_bow': { id: 'hunting_bow', name: 'Охотничий Лук', icon: '🏹', type: 'weapon', description: 'Простой, но надежный лук.', value: 20, damage: 7, slot: 'weapon', actions: ['equip', 'sell'] },
        'short_staff': { id: 'short_staff', name: 'Короткий Посох', icon: '🪄', type: 'weapon', description: 'Посох новичка-мага.', value: 18, damage: 3, magicDamage: 5, slot: 'weapon', actions: ['equip', 'sell'] },
        'stone_axe': { id: 'stone_axe', name: 'Каменный Топор', icon: '🪓', type: 'weapon', description: 'Грубый топор. Хорош для рубки, плох в бою.', value: 10, damage: 4, slot: 'weapon', actions: ['equip', 'sell'] },
        
        // Доспехи
        'leather_jacket': { id: 'leather_jacket', name: 'Кожаная Куртка', icon: '🧥', type: 'armor', description: 'Легкая кожаная куртка. Неплохая защита.', value: 25, defense: 3, slot: 'armor', actions: ['equip', 'sell'] },
        'simple_boots': { id: 'simple_boots', name: 'Простые Сапоги', icon: '👢', type: 'armor', description: 'Обычные, но надежные сапоги.', value: 15, defense: 1, slot: 'boots', actions: ['equip', 'sell'] },
        'wooden_shield': { id: 'wooden_shield', name: 'Деревянный Щит', icon: '🛡️', type: 'shield', description: 'Простой деревянный щит.', value: 20, defense: 2, slot: 'shield', actions: ['equip', 'sell'] },

    },

    // -----------------------------------------------------------------------------------------------------------------
    // Враги (упрощенные)
    // -----------------------------------------------------------------------------------------------------------------
    enemies: {
        'small_game': { id: 'small_game', name: 'Мелкая Дичь', icon: '🐰', hp: 10, attack: 2, defense: 0, xp: 5, gold: 2, loot: [{ itemId: 'raw_meat', chance: 0.8 }] },
        'forest_wolf': { id: 'forest_wolf', name: 'Лесной Волк', icon: '🐺', hp: 30, attack: 8, defense: 1, xp: 15, gold: 5, loot: [{ itemId: 'animal_pelt', chance: 0.7 }, { itemId: 'raw_meat', chance: 0.5 }] },
    },

    // -----------------------------------------------------------------------------------------------------------------
    // Магазины
    // -----------------------------------------------------------------------------------------------------------------
    shops: {
        'city_shop': {
            name: 'Городская Лавка',
            items: [
                { itemId: 'small_hp_potion', price: 25, stock: Infinity },
                { itemId: 'small_mp_potion', price: 25, stock: Infinity },
                { itemId: 'wooden_sword', price: 15, stock: 5 },
                { itemId: 'hunting_bow', price: 20, stock: 5 },
                { itemId: 'short_staff', price: 18, stock: 5 },
                { itemId: 'leather_jacket', price: 25, stock: 3 },
                { itemId: 'simple_boots', price: 15, stock: 3 },
                { itemId: 'wooden_shield', price: 20, stock: 3 },
                { itemId: 'bread', price: 10, stock: Infinity },
            ]
        },
    },

    // -----------------------------------------------------------------------------------------------------------------
    // Квесты (около 10 штук от Старейшины)
    // -----------------------------------------------------------------------------------------------------------------
    quests: {
        'elders_lost_ring': {
            id: 'elders_lost_ring',
            name: 'Пропавшее Кольцо Старейшины',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Старейшина потерял свое фамильное кольцо где-то в Лесу. Помоги найти.',
            objective: 'Найти Кольцо Старейшины в Лесу.',
            objectiveType: 'find_item',
            targetItem: 'elder_ring', // Используем ID
            targetLocation: 'Лес',
            rewards: { xp: 50, gold: 30, items: [{ itemId: 'small_hp_potion', quantity: 1 }] },
            status: 'available', // available, active, turn_in, completed
        },
        'wood_for_town': {
            id: 'wood_for_town',
            name: 'Дрова для Города',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Городу нужны дрова на зиму. Наруби 10 Дерева в Лесу.',
            objective: 'Собрать 10x Дерево в Лесу.',
            objectiveType: 'gather',
            targetItem: 'wood', // Используем ID
            targetLocation: 'Лес',
            requiredCount: 10,
            rewards: { xp: 75, gold: 40 },
            status: 'available',
        },
        'hunt_forest_wolves': {
            id: 'hunt_forest_wolves',
            name: 'Охота на Волков',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Волки стали слишком часто нападать. Убей 3 Лесных Волка в Лесу.',
            objective: 'Убить 3 Лесных Волка в Лесу.',
            objectiveType: 'kill',
            targetEnemy: 'forest_wolf', // Используем ID врага
            targetLocation: 'Лес',
            requiredCount: 3,
            rewards: { xp: 120, gold: 60, items: [{ itemId: 'animal_pelt', quantity: 2 }] },
            status: 'available',
        },
        'fish_for_dinner': {
            id: 'fish_for_dinner',
            name: 'Рыба на Ужин',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Жителям нужна рыба. Поймай 5 Озерных Рыб на Озере.',
            objective: 'Поймать 5x Озерная Рыба на Озере.',
            objectiveType: 'gather',
            targetItem: 'lake_fish', // Используем ID
            targetLocation: 'Озеро',
            requiredCount: 5,
            rewards: { xp: 70, gold: 35, items: [{ itemId: 'bread', quantity: 1 }] },
            status: 'available',
        },
        'forest_herbs_for_healer': {
            id: 'forest_herbs_for_healer',
            name: 'Лекарственные Травы',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Нашему целителю нужны Лесные Травы. Собери 7 штук в Лесу.',
            objective: 'Собрать 7x Лесная Трава в Лесу.',
            objectiveType: 'gather',
            targetItem: 'forest_herb', // Используем ID
            targetLocation: 'Лес',
            requiredCount: 7,
            rewards: { xp: 80, gold: 45, items: [{ itemId: 'small_hp_potion', quantity: 2 }] },
            status: 'available',
        },
        'iron_for_blacksmith': {
            id: 'iron_for_blacksmith',
            name: 'Руда для Кузнеца',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Кузнец просит принести ему Железную Руду. Добудь 5 кусков в Лесу.',
            objective: 'Собрать 5x Железная Руда в Лесу.',
            objectiveType: 'gather',
            targetItem: 'iron_ore', // Используем ID
            targetLocation: 'Лес',
            requiredCount: 5,
            rewards: { xp: 90, gold: 50, items: [{ itemId: 'wooden_sword', quantity: 1 }] },
            status: 'available',
        },
        'lost_supplies_trader': {
            id: 'lost_supplies_trader',
            name: 'Потерянные Поставки',
            giver: 'Старейшина',
            giverLocation: 'Город',
            description: 'Торговец потерял свой Список Поставок на Озере. Нужно его найти!',
            objective: 'Найти Список Поставок на Озере.',
            objectiveType: 'find_item',
            targetItem: 'supply_list', // Используем ID
            targetLocation: 'Озеро',
            rewards: { xp: 60, gold: 30, items: [{ itemId: 'bread', quantity: 2 }] },
            status: 'available',
        },
    },
};


// =====================================================================================================================
// === CORE GAME FUNCTIONS - Основные функции игры для управления состоянием и UI ===
// =====================================================================================================================

/**
 * showScreen(screenId: string) - Переключает отображаемый экран.
 * @param {string} screenId - ID экрана, который нужно показать.
 */
function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
        screen.scrollTop = 0; // Сбросить прокрутку неактивного экрана
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        // Обновить контент, специфичный для экрана, при его открытии
        switch (screenId) {
            case 'game-play-screen': updateGameScene(); break;
            case 'map-screen': updateMapDisplay(); break;
            case 'inventory-screen': updateInventoryDisplay(); updateItemDetailsPanel(true); break;
            case 'quests-screen': updateQuestLogDisplay(); break;
            case 'character-screen': updateCharacterScreen(); break;
            case 'shop-screen': updateShopScreen(gameState.currentShopId); break;
        }
    }
}

/**
 * appendToLog(message: string) - Добавляет сообщение в игровой лог и прокручивает его.
 * @param {string} message - Текстовое сообщение для добавления.
 */
function appendToLog(message) {
    gameState.gameLog.push(message);
    if (gameState.gameLog.length > 30) { // Ограничим лог 30 сообщениями
        gameState.gameLog.shift();
    }
    DOMElements.gameLog.innerHTML = gameState.gameLog.map(msg => `• ${msg}`).join('<br>');
    DOMElements.gameLog.scrollTop = DOMElements.gameLog.scrollHeight;
}

/**
 * updatePlayerInfo() - Обновляет все элементы верхней панели игрока.
 */
function updatePlayerInfo() {
    const p = gameState.player;
    if (!p.name) return; // Не обновлять, если персонаж еще не создан

    DOMElements.playerName.textContent = p.name;
    DOMElements.playerClass.textContent = p.class;
    DOMElements.playerLevel.textContent = p.level;
    DOMElements.playerXP.textContent = p.xp;
    DOMElements.playerXPToLevel.textContent = p.xpToNextLevel;
    DOMElements.xpBar.style.width = `${(p.xp / p.xpToNextLevel) * 100}%`;
    DOMElements.playerHP.textContent = p.hp;
    DOMElements.playerMaxHP.textContent = p.maxHp;
    DOMElements.hpBar.style.width = `${(p.hp / p.maxHp) * 100}%`;
    DOMElements.playerMP.textContent = p.mp;
    DOMElements.playerMaxMP.textContent = p.maxMp;
    DOMElements.mpBar.style.width = `${(p.mp / p.maxMp) * 100}%`;
    DOMElements.playerGold.textContent = p.gold;

    // Обновляем аватар: сначала пытаемся использовать картинку, если нет - эмодзи
    const avatarPath = GameData.classAvatars[p.class];
    if (avatarPath && !avatarPath.includes('_emoji')) { // Если это путь к файлу
        // Проверяем, существует ли файл
        const img = new Image();
        img.onload = () => {
            DOMElements.playerAvatar.style.backgroundImage = `url('${avatarPath}')`;
            DOMElements.playerAvatar.style.backgroundSize = 'cover';
            DOMElements.playerAvatar.style.backgroundPosition = 'center';
            DOMElements.playerAvatar.innerHTML = '';
        };
        img.onerror = () => { // Если картинка не найдена, используем эмодзи
            DOMElements.playerAvatar.style.backgroundImage = 'none';
            DOMElements.playerAvatar.innerHTML = GameData.classAvatars[`${p.class}_emoji`] || '👤';
        };
        img.src = avatarPath; // Запускаем загрузку картинки
    } else { // Используем эмодзи
        DOMElements.playerAvatar.style.backgroundImage = 'none';
        DOMElements.playerAvatar.innerHTML = GameData.classAvatars[`${p.class}_emoji`] || '👤';
    }
}

/**
 * calculateDerivedStats() - Пересчитывает производные характеристики игрока.
 * На основе базовых характеристик и экипировки.
 */
function calculateDerivedStats() {
    const p = gameState.player;
    // Создаем копию базовых статов для расчета, чтобы не изменять исходные статы игрока от бонусов экипировки
    let currentStats = { ...p.stats }; 

    // Добавляем бонусы от экипировки к временным статам
    for (const slot in p.equipped) {
        if (p.equipped[slot]) {
            const item = GameData.items[p.equipped[slot].itemId];
            if (!item) continue;
            
            // Бонусы к статам от аксессуаров или других предметов
            if (item.strBonus) currentStats.str += item.strBonus;
            if (item.dexBonus) currentStats.dex += item.dexBonus;
            if (item.intBonus) currentStats.int += item.intBonus;
            if (item.vitBonus) currentStats.vit += item.vitBonus;
        }
    }
    
    // Пересчитываем производные характеристики
    p.derivedStats.maxHp = 100 + (currentStats.vit * 10);
    p.derivedStats.maxMp = 50 + (currentStats.int * 5);
    p.derivedStats.physAttack = (currentStats.str * 2);
    p.derivedStats.magAttack = (currentStats.int * 2);
    p.derivedStats.defense = (currentStats.vit * 1);
    p.derivedStats.critChance = 5 + (currentStats.dex * 0.5);
    p.derivedStats.dodgeChance = 5 + (currentStats.dex * 0.5);

    // Добавляем бонусы урона/защиты от экипировки
    for (const slot in p.equipped) {
        if (p.equipped[slot]) {
            const item = GameData.items[p.equipped[slot].itemId];
            if (!item) continue;
            
            if (item.damage) p.derivedStats.physAttack += item.damage;
            if (item.magicDamage) p.derivedStats.magAttack += item.magicDamage;
            if (item.defense) p.derivedStats.defense += item.defense;
        }
    }

    // Обновляем максимальные значения HP/MP игрока
    p.maxHp = p.derivedStats.maxHp;
    p.maxMp = p.derivedStats.maxMp;

    // Убедимся, что текущие HP/MP не превышают максимальные после пересчета
    p.hp = Math.min(p.hp, p.maxHp);
    p.mp = Math.min(p.mp, p.maxMp);
}


// =====================================================================================================================
// === MECHANICS - Игровые механики: инвентарь, квесты, торговля, бои ===
// =====================================================================================================================

/**
 * addItem(item: object, quantity = 1, forceInstanceId = null) - Добавляет предмет в инвентарь.
 * @param {object} item - Объект предмета из GameData.items (полный, не только ID).
 * @param {number} quantity - Количество добавляемых предметов.
 * @param {number|null} forceInstanceId - Принудительно заданный instanceId (для возврата из экипировки).
 */
function addItem(item, quantity = 1, forceInstanceId = null) {
    if (!item) {
        console.error("Попытка добавить несуществующий предмет!");
        return;
    }

    // Проверяем, есть ли уже этот предмет (по ID, для стакающихся)
    const existingStackableItem = gameState.inventory.find(i => i.id === item.id && item.stackable);

    if (item.stackable && existingStackableItem && !forceInstanceId) { // Не стакаем, если есть forceInstanceId
        existingStackableItem.quantity += quantity;
        appendToLog(`Получено ${quantity}x ${item.name}. (Всего: ${existingStackableItem.quantity})`);
    } else {
        // Если не стакается, или это новый стек, или forceInstanceId
        // Для стакающихся предметов всегда создаем новый "стек" (новый экземпляр с количеством)
        const newItem = { ...item, instanceId: forceInstanceId || ++lastInstanceId, quantity: quantity };
        gameState.inventory.push(newItem);
        appendToLog(`Получен ${item.name}.`);
    }

    checkQuestProgress('gather', item.id, quantity); // Проверяем для gather по ID
    checkQuestProgress('find_item', item.id); // Для find_item по ID
    updateInventoryDisplay(); // Обновим UI
}

/**
 * removeItem(itemInstanceId: number, quantity = 1) - Удаляет предмет из инвентаря.
 * @param {number} itemInstanceId - instanceId предмета для удаления.
 * @param {number} quantity - Количество для удаления (для стакающихся).
 * @returns {boolean} true, если предмет был удален/уменьшен, false иначе.
 */
function removeItem(itemInstanceId, quantity = 1) {
    const itemIndex = gameState.inventory.findIndex(item => item.instanceId === itemInstanceId);
    if (itemIndex !== -1) {
        const item = gameState.inventory[itemIndex];
        if (item.stackable && item.quantity > quantity) {
            item.quantity -= quantity;
            // appendToLog(`Удалено ${quantity}x ${item.name}. (Осталось: ${item.quantity})`); // Комментируем, так как addItem уже логирует
        } else {
            // Удаляем весь элемент, если не стакается или осталось <= quantity
            // appendToLog(`Удален ${item.name}.`); // Комментируем, так как addItem уже логирует
            gameState.inventory.splice(itemIndex, 1);
        }
        updateInventoryDisplay();
        return true;
    }
    return false;
}

/**
 * isItemInInventoryOrEquipped(itemToFind: object) - Проверяет, находится ли предмет в инвентаре или экипировке.
 * @param {object} itemToFind - Объект предмета с instanceId.
 * @returns {boolean}
 */
function isItemInInventoryOrEquipped(itemToFind) {
    if (!itemToFind || !itemToFind.instanceId) return false;
    // Проверяем инвентарь
    if (gameState.inventory.some(item => item.instanceId === itemToFind.instanceId)) return true;
    // Проверяем экипировку
    for (const slot in gameState.equipped) {
        if (gameState.equipped[slot] && gameState.equipped[slot].instanceId === itemToFind.instanceId) return true;
    }
    return false;
}

/**
 * updateInventoryDisplay() - Обновляет UI экрана инвентаря.
 */
function updateInventoryDisplay() {
    // Обновляем слоты экипировки
    for (const slotName in DOMElements.equippedSlots) {
        const itemInSlot = gameState.equipped[slotName];
        const slotElementSpan = DOMElements.equippedSlots[slotName]; // SPAN с текстом названия предмета
        const slotElementDiv = DOMElements.equippedSlotElements[slotName]; // Сам DIV-слот
        const slotIconElement = slotElementDiv.querySelector('.slot-icon'); // Иконка в начале DIV

        slotElementDiv.classList.remove('selected'); // Сбрасываем стили выделения
        slotElementDiv.onclick = null; // Сбрасываем обработчик

        let baseText = `(Пусто)`;
        
        // Устанавливаем иконку слота по умолчанию
        if (slotIconElement) slotIconElement.textContent = GameData.slotIcons[slotName] || '';

        if (itemInSlot) {
            const fullItem = GameData.items[itemInSlot.itemId];
            if (fullItem) {
                slotElementSpan.textContent = ` ${fullItem.name}`;
                if (slotIconElement) slotIconElement.textContent = fullItem.icon; // Меняем иконку слота на иконку предмета
                slotElementDiv.onclick = () => showItemDetails(fullItem, itemInSlot.instanceId, true);
                slotElementDiv.classList.add('equipped-slot-filled');
            }
        } else {
            // Название слота "Оружие: (Пусто)" вместо "(Пусто)"
            baseText = slotElementSpan.dataset.slotText || baseText; // Возьмем из дата-атрибута, если есть
            slotElementSpan.textContent = baseText; // Возвращаем базовый текст слота
            slotElementDiv.classList.remove('equipped-slot-filled');
        }
        // Сохраняем базовый текст слота, если его нет
        if (!slotElementSpan.dataset.slotText) {
            slotElementSpan.dataset.slotText = slotElementSpan.textContent;
        }
    }

    // Обновляем рюкзак
    DOMElements.backpackGrid.innerHTML = '';
    gameState.inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('inventory-item');
        itemDiv.dataset.instanceId = item.instanceId; // Добавляем dataset для удобства поиска
        itemDiv.innerHTML = `<i>${item.icon}</i><span>${item.name}</span>`;
        if (item.stackable && item.quantity && item.quantity > 1) { // Если предмет стакается и количество > 1
             const countSpan = document.createElement('span');
             countSpan.classList.add('item-count');
             countSpan.textContent = item.quantity;
             itemDiv.appendChild(countSpan);
        }
        itemDiv.onclick = () => showItemDetails(item, item.instanceId, false);
        
        // Выделение выбранного предмета
        if (gameState.selectedInventoryItem && gameState.selectedInventoryItem.instanceId === item.instanceId) {
            itemDiv.classList.add('selected');
        }
        DOMElements.backpackGrid.appendChild(itemDiv);
    });

    // Очищаем панель деталей, если выбранный предмет удален/снят
    if (gameState.selectedInventoryItem && !isItemInInventoryOrEquipped(gameState.selectedInventoryItem)) {
        updateItemDetailsPanel(true);
    }
    updatePlayerInfo(); // Обновим инфо-панель после изменения инвентаря/экипировки
    calculateDerivedStats(); // Пересчитываем статы
}

/**
 * showItemDetails(item: object, instanceId: number, isEquipped = false) - Показывает детали предмета в инвентаре.
 * @param {object} item - Объект предмета (полные данные из GameData.items).
 * @param {number} instanceId - instanceId предмета.
 * @param {boolean} isEquipped - true, если предмет экипирован, false если в рюкзаке.
 */
function showItemDetails(item, instanceId, isEquipped = false) {
    document.querySelectorAll('.inventory-item, .equipment-slot').forEach(el => el.classList.remove('selected'));

    if (isEquipped) {
        for (const slotKey in DOMElements.equippedSlotElements) {
            if (gameState.equipped[slotKey] && gameState.equipped[slotKey].instanceId === instanceId) {
                DOMElements.equippedSlotElements[slotKey].classList.add('selected');
                break;
            }
        }
    } else {
        const itemElement = DOMElements.backpackGrid.querySelector(`[data-instance-id="${instanceId}"]`);
        if (itemElement) {
            itemElement.classList.add('selected');
        }
    }

    // Получаем текущий item из inventory/equipped, так как он может иметь updated quantity
    let currentItem = gameState.inventory.find(i => i.instanceId === instanceId);
    if (!currentItem) {
        for (const slot in gameState.equipped) {
            if (gameState.equipped[slot] && gameState.equipped[slot].instanceId === instanceId) {
                currentItem = { ...GameData.items[gameState.equipped[slot].itemId], instanceId: instanceId, quantity: 1 };
                break;
            }
        }
    }
    if (!currentItem) { // Если предмет не найден в инвентаре или экипировке
        updateItemDetailsPanel(true);
        return;
    }

    gameState.selectedInventoryItem = currentItem; // Записываем в state

    DOMElements.detailItemName.textContent = `${currentItem.icon || ''} ${currentItem.name}`;
    DOMElements.detailItemDescription.textContent = currentItem.description;

    let statsText = '';
    if (currentItem.damage) statsText += `Урон: ${currentItem.damage}\n`;
    if (currentItem.magicDamage) statsText += `Маг. Урон: ${currentItem.magicDamage}\n`;
    if (currentItem.defense) statsText += `Защита: ${currentItem.defense}\n`;
    if (currentItem.hpRestore) statsText += `Восст. HP: ${currentItem.hpRestore}\n`;
    if (currentItem.mpRestore) statsText += `Восст. MP: ${currentItem.mpRestore}\n`;
    if (currentItem.strBonus) statsText += `+Сила: ${currentItem.strBonus}\n`;
    if (currentItem.dexBonus) statsText += `+Ловкость: ${currentItem.dexBonus}\n`;
    if (currentItem.intBonus) statsText += `+Интеллект: ${currentItem.intBonus}\n`;
    if (currentItem.vitBonus) statsText += `+Выносливость: ${currentItem.vitBonus}\n`;
    if (currentItem.value && currentItem.type !== 'quest_item') statsText += `Цена: 💰${currentItem.value}`;
    DOMElements.detailItemStats.textContent = statsText;

    DOMElements.detailItemActions.innerHTML = '';

    if (currentItem.actions && currentItem.actions.includes('use') && (currentItem.type === 'potion' || currentItem.type === 'food')) {
        const useBtn = document.createElement('button');
        useBtn.textContent = 'Использовать';
        useBtn.onclick = () => useItem(gameState.selectedInventoryItem);
        DOMElements.detailItemActions.appendChild(useBtn);
    }

    if (currentItem.actions && currentItem.actions.includes('equip') && currentItem.slot) {
        const equipBtn = document.createElement('button');
        const isCurrentlyEquipped = isItemEquipped(gameState.selectedInventoryItem);

        equipBtn.textContent = isCurrentlyEquipped ? 'Снять' : 'Экипировать';
        equipBtn.onclick = () => {
            if (isCurrentlyEquipped) {
                unequipItem(currentItem.slot);
            } else {
                equipItem(gameState.selectedInventoryItem);
            }
        };
        DOMElements.detailItemActions.appendChild(equipBtn);
    }

    if (currentItem.actions && currentItem.actions.includes('sell') && currentItem.type !== 'quest_item') {
        const sellBtn = document.createElement('button');
        sellBtn.textContent = `Продать (💰${currentItem.value})`;
        sellBtn.onclick = () => sellItem(gameState.selectedInventoryItem);
        DOMElements.detailItemActions.appendChild(sellBtn);
    }

    if (currentItem.type !== 'quest_item') { // Нельзя выбросить квестовые предметы
        const dropBtn = document.createElement('button');
        dropBtn.textContent = 'Выбросить';
        dropBtn.onclick = () => dropItem(gameState.selectedInventoryItem);
        DOMElements.detailItemActions.appendChild(dropBtn);
    }
}

/**
 * updateItemDetailsPanel(clear = false) - Обновляет или очищает панель деталей предмета в инвентаре.
 * @param {boolean} clear - true, чтобы очистить панель.
 */
function updateItemDetailsPanel(clear = false) {
    if (clear) {
        DOMElements.detailItemName.textContent = 'Выбери предмет';
        DOMElements.detailItemDescription.textContent = '';
        DOMElements.detailItemStats.textContent = '';
        DOMElements.detailItemActions.innerHTML = '';
        gameState.selectedInventoryItem = null;
        document.querySelectorAll('.inventory-item, .equipped-slot').forEach(el => el.classList.remove('selected'));
    } else if (gameState.selectedInventoryItem) {
        // Проверяем, существует ли предмет в инвентаре (он может быть уже удален/продан)
        const currentItemInState = gameState.inventory.find(i => i.instanceId === gameState.selectedInventoryItem.instanceId) ||
                                 Object.values(gameState.equipped).find(e => e && e.instanceId === gameState.selectedInventoryItem.instanceId);
        if (currentItemInState) {
            const fullItemData = GameData.items[currentItemInState.id];
            showItemDetails(fullItemData, currentItemInState.instanceId, isItemEquipped(currentItemInState));
        } else {
            updateItemDetailsPanel(true); // Если выбранного предмета больше нет, очищаем панель
        }
    } else {
        DOMElements.detailItemName.textContent = 'Выбери предмет';
        DOMElements.detailItemDescription.textContent = '';
        DOMElements.detailItemStats.textContent = '';
        DOMElements.detailItemActions.innerHTML = '';
    }
}

/**
 * isItemEquipped(item: object) - Проверяет, экипирован ли данный предмет.
 * @param {object} item - Объект предмета.
 * @returns {boolean}
 */
function isItemEquipped(item) {
    if (!item || !item.slot) return false;
    const equippedItem = gameState.equipped[item.slot];
    return equippedItem && equippedItem.instanceId === item.instanceId;
}

/**
 * useItem(item: object) - Использует выбранный предмет.
 * @param {object} item - Объект предмета (из gameState.selectedInventoryItem).
 */
function useItem(item) {
    if (item.type === 'potion' || item.type === 'food') {
        let message = `Ты использовал ${item.name}.`;
        if (item.hpRestore) {
            gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + item.hpRestore);
            message += ` Восстановлено ${item.hpRestore} HP.`;
        }
        if (item.mpRestore) {
            gameState.player.mp = Math.min(gameState.player.maxMp, gameState.player.mp + item.mpRestore);
            message += ` Восстановлено ${item.mpRestore} MP.`;
        }
        appendToLog(message);
        removeItem(item.instanceId); // removeItem уже вызывает updateInventoryDisplay
    } else {
        appendToLog(`Ты не можешь использовать ${item.name} таким образом.`);
    }
}

/**
 * equipItem(item: object) - Экипирует предмет.
 * @param {object} item - Объект предмета (из gameState.selectedInventoryItem).
 */
function equipItem(item) {
    if (!item.slot) {
        appendToLog(`Предмет ${item.name} нельзя экипировать.`);
        return;
    }

    // Если в слоте что-то уже есть, снимаем это
    if (gameState.equipped[item.slot]) {
        unequipItem(item.slot);
    }

    // Экипируем новый предмет. Храним ID предмета и instanceId.
    gameState.equipped[item.slot] = { itemId: item.id, instanceId: item.instanceId };
    // Удаляем предмет из инвентаря
    const itemIndex = gameState.inventory.findIndex(i => i.instanceId === item.instanceId);
    if (itemIndex !== -1) {
        gameState.inventory.splice(itemIndex, 1);
    }

    appendToLog(`Ты экипировал ${item.name} в слот ${item.slot}.`);
    updateInventoryDisplay();
    updatePlayerInfo();
    updateItemDetailsPanel(true);
}

/**
 * unequipItem(slotName: string) - Снимает предмет со слота.
 * @param {string} slotName - Название слота, откуда снимается предмет.
 */
function unequipItem(slotName) {
    const itemToUnequip = gameState.equipped[slotName];
    if (itemToUnequip) {
        // Добавляем обратно в инвентарь (сохраняя его instanceId)
        addItem(GameData.items[itemToUnequip.itemId], 1, itemToUnequip.instanceId); 
        gameState.equipped[slotName] = null; // Очищаем слот
        appendToLog(`Ты снял ${GameData.items[itemToUnequip.itemId].name}.`);
        updateInventoryDisplay();
        updatePlayerInfo();
        updateItemDetailsPanel(true);
    }
}

/**
 * sellItem(item: object) - Продает предмет.
 * @param {object} item - Объект предмета (из gameState.selectedInventoryItem).
 */
function sellItem(item) {
    if (item.type === 'quest_item') {
        appendToLog(`Квестовые предметы нельзя продавать.`);
        return;
    }
    gameState.player.gold += item.value;
    appendToLog(`Ты продал ${item.name} за 💰${item.value}.`);
    removeItem(item.instanceId); // removeItem уже вызывает updateInventoryDisplay
}

/**
 * dropItem(item: object) - Выбрасывает предмет.
 * @param {object} item - Объект предмета (из gameState.selectedInventoryItem).
 */
function dropItem(item) {
    if (item.type === 'quest_item') {
        appendToLog(`Квестовые предметы нельзя выбрасывать.`);
        return;
    }
    if (confirm(`Ты уверен, что хочешь выбросить ${item.name}? Он исчезнет навсегда.`)) {
        appendToLog(`Ты выбросил ${item.name}. Он исчез.`);
        removeItem(item.instanceId); // removeItem уже вызывает updateInventoryDisplay
    }
}

// --- Квесты ---
/**
 * takeQuest(questId: string) - Принимает квест.
 * @param {string} questId - ID квеста из GameData.quests.
 */
function takeQuest(questId) {
    const questData = GameData.quests[questId];
    if (!questData) {
        console.error('Ошибка: Квест не найден!', questId);
        appendToLog('Ошибка: Квест не найден!');
        return;
    }
    if (gameState.activeQuests.some(q => q.id === questId) || gameState.completedQuests.some(q => q.id === questId)) {
        appendToLog(`У тебя уже есть или ты уже выполнил задание "${questData.name}".`);
        return;
    }

    const newQuest = {
        id: questId,
        progress: {},
        status: 'active',
    };
    // Инициализация прогресса в зависимости от типа квеста
    if (questData.objectiveType === 'kill' && questData.targetEnemy) {
        newQuest.progress[questData.targetEnemy] = 0;
    } else if (questData.objectiveType === 'gather' && questData.targetItem) {
        newQuest.progress[questData.targetItem] = 0;
        // Проверяем инвентарь на наличие нужных предметов, чтобы засчитать их сразу
        gameState.inventory.forEach(item => {
            if (item.id === questData.targetItem) { // Сравниваем по ID
                newQuest.progress[questData.targetItem] = (newQuest.progress[questData.targetItem] || 0) + (item.quantity || 1);
            }
        });
        if (newQuest.progress[questData.targetItem] >= questData.requiredCount) {
             newQuest.status = 'turn_in'; // Готов к сдаче, если уже есть предметы
        }
    } else if (questData.objectiveType === 'find_item' && questData.targetItem) {
        // Если предмет уже есть, квест сразу готов
        if (gameState.inventory.some(item => item.id === questData.targetItem)) { // Сравниваем по ID
            newQuest.status = 'turn_in';
        }
    }

    gameState.activeQuests.push(newQuest);
    appendToLog(`Ты принял новое задание: "${questData.name}" от ${questData.giver}.`);
    updateQuestLogDisplay();
}

/**
 * checkQuestProgress(type: string, targetId: string, count = 1) - Обновляет прогресс квестов.
 * @param {string} type - Тип цели ('kill', 'gather', 'find_item').
 * @param {string} targetId - ID врага или предмета.
 * @param {number} count - Количество, на которое нужно увеличить прогресс.
 */
function checkQuestProgress(type, targetId, count = 1) {
    gameState.activeQuests.forEach(activeQuest => {
        const questData = GameData.quests[activeQuest.id];
        if (!questData || questData.objectiveType !== type || activeQuest.status === 'turn_in' || activeQuest.status === 'completed') return;

        if (type === 'kill' && questData.targetEnemy === targetId) {
            activeQuest.progress[targetId] = (activeQuest.progress[targetId] || 0) + count;
            appendToLog(`Прогресс задания "${questData.name}": ${GameData.enemies[questData.targetEnemy].name} ${activeQuest.progress[targetId]}/${questData.requiredCount}.`);
            if (activeQuest.progress[targetId] >= questData.requiredCount) {
                activeQuest.status = 'turn_in';
                appendToLog(`Задание "${questData.name}" готово к сдаче!`);
            }
        } else if (type === 'gather' && questData.targetItem === targetId) { // targetId здесь это ID предмета
            activeQuest.progress[targetId] = (activeQuest.progress[targetId] || 0) + count;
            appendToLog(`Прогресс задания "${questData.name}": ${GameData.items[questData.targetItem].name} ${activeQuest.progress[targetId]}/${questData.requiredCount}.`);
            if (activeQuest.progress[targetId] >= questData.requiredCount) {
                activeQuest.status = 'turn_in';
                appendToLog(`Задание "${questData.name}" готово к сдаче!`);
            }
        } else if (type === 'find_item' && questData.targetItem === targetId) { // targetId здесь это ID предмета
            // Квест на нахождение предмета. Если предмет в инвентаре, квест готов.
            if (gameState.inventory.some(item => item.id === questData.targetItem)) {
                activeQuest.status = 'turn_in';
                appendToLog(`Задание "${questData.name}" готово к сдаче!`);
            }
        }
    });
    updateQuestLogDisplay();
}

/**
 * completeQuest(questId: string) - Завершает и сдает квест.
 * @param {string} questId - ID квеста для завершения.
 */
function completeQuest(questId) {
    const activeQuestIndex = gameState.activeQuests.findIndex(q => q.id === questId);
    if (activeQuestIndex === -1) return;

    const activeQuest = gameState.activeQuests[activeQuestIndex];
    const questData = GameData.quests[questId];

    if (activeQuest.status !== 'turn_in') {
        appendToLog(`Задание "${questData.name}" еще не выполнено или не готово к сдаче.`);
        return;
    }

    // Если квест на сбор/нахождение предмета, проверяем наличие и удаляем предмет
    if ((questData.objectiveType === 'gather' && questData.targetItem) || (questData.objectiveType === 'find_item' && questData.targetItem)) {
        const requiredItemId = questData.targetItem;

        if (questData.objectiveType === 'gather') {
            let countInInventory = 0;
            // Просчитаем все экземпляры нужного предмета, включая их количество
            gameState.inventory.forEach(item => {
                if (item.id === requiredItemId) {
                    countInInventory += (item.quantity || 1);
                }
            });

            if (countInInventory < questData.requiredCount) {
                 appendToLog(`Ошибка при сдаче квеста: не хватает ${questData.requiredCount - countInInventory} ${GameData.items[requiredItemId].name} в инвентаре.`);
                 activeQuest.status = 'active'; // Отменяем готовность к сдаче, если предметов нет
                 updateQuestLogDisplay();
                 return;
            }

            // Удаляем требуемое количество предметов из инвентаря
            let removedCount = 0;
            // Создаем массив instanceId для удаления
            const instancesToRemove = [];
            for (let i = 0; i < gameState.inventory.length; i++) {
                const item = gameState.inventory[i];
                if (item.id === requiredItemId && removedCount < questData.requiredCount) {
                    const toRemove = Math.min(item.quantity || 1, questData.requiredCount - removedCount);
                    for (let j = 0; j < toRemove; j++) {
                         instancesToRemove.push(item.instanceId);
                    }
                    removedCount += toRemove;
                }
            }
            instancesToRemove.forEach(instanceId => removeItem(instanceId, 1)); // Удаляем по одному из стеков


        } else if (questData.objectiveType === 'find_item') {
            const itemToRemove = gameState.inventory.find(item => item.id === requiredItemId);
            if (itemToRemove) {
                removeItem(itemToRemove.instanceId);
            } else {
                 appendToLog(`Ошибка при сдаче квеста: ${GameData.items[requiredItemId].name} не найден в инвентаре.`);
                 activeQuest.status = 'active';
                 updateQuestLogDisplay();
                 return;
            }
        }
        
        appendToLog(`Удалены необходимые предметы для задания "${questData.name}".`);
    }

    gameState.activeQuests.splice(activeQuestIndex, 1);
    gameState.completedQuests.push(activeQuest);

    appendToLog(`Задание "${questData.name}" выполнено!`);
    // Награды
    gameState.player.xp += questData.rewards.xp;
    gameState.player.gold += questData.rewards.gold;
    if (questData.rewards.items) {
        questData.rewards.items.forEach(rewardItem => addItem(GameData.items[rewardItem.itemId], rewardItem.quantity || 1));
    }
    checkLevelUp();
    updatePlayerInfo();
    updateQuestLogDisplay();
}

/**
 * updateQuestLogDisplay() - Обновляет UI экрана заданий.
 */
function updateQuestLogDisplay() {
    DOMElements.activeQuestsList.innerHTML = '';
    if (gameState.activeQuests.length === 0) {
        DOMElements.activeQuestsList.innerHTML = '<li>(Пока нет активных заданий)</li>';
    } else {
        gameState.activeQuests.forEach(activeQuest => {
            const questData = GameData.quests[activeQuest.id];
            const li = document.createElement('li');
            li.classList.add('quest-item');
            if (activeQuest.status === 'turn_in') {
                li.classList.add('ready-to-turn-in');
            }
            li.innerHTML = `<strong>${questData.name}</strong> от ${questData.giver} (${questData.giverLocation})<br>`;
            li.innerHTML += `Цель: ${questData.objective}<br>`;
            
            if (questData.objectiveType === 'kill' && questData.targetEnemy) {
                const enemy = GameData.enemies[questData.targetEnemy];
                li.innerHTML += `Прогресс: ${activeQuest.progress[questData.targetEnemy] || 0}/${questData.requiredCount} ${enemy ? enemy.name : '???'}<br>`;
            } else if (questData.objectiveType === 'gather' && questData.targetItem) {
                const item = GameData.items[questData.targetItem];
                li.innerHTML += `Прогресс: ${activeQuest.progress[questData.targetItem] || 0}/${questData.requiredCount} ${item ? item.name : '???'}<br>`;
            } else if (questData.objectiveType === 'find_item' && questData.targetItem) {
                const item = GameData.items[questData.targetItem];
                li.innerHTML += `Найдено: ${gameState.inventory.some(i => i.id === questData.targetItem) ? '✅ Да' : '❌ Нет'} ${item ? item.name : '???'}<br>`;
            }

            if (activeQuest.status === 'turn_in') {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Сдать';
                completeButton.onclick = (e) => { e.stopPropagation(); completeQuest(activeQuest.id); };
                li.appendChild(completeButton);
            }
            DOMElements.activeQuestsList.appendChild(li);
        });
    }

    DOMElements.completedQuestsList.innerHTML = '';
    if (gameState.completedQuests.length === 0) {
        DOMElements.completedQuestsList.innerHTML = '<li>(Пока нет завершенных заданий)</li>';
    } else {
        gameState.completedQuests.forEach(completedQuest => {
            const questData = GameData.quests[completedQuest.id];
            const li = document.createElement('li');
            li.classList.add('quest-item', 'completed');
            li.textContent = `✅ ${questData.name} (Выполнено)`;
            DOMElements.completedQuestsList.appendChild(li);
        });
    }
}


// --- Торговля (Магазин) ---
/**
 * updateShopScreen(shopId: string) - Обновляет UI экрана магазина.
 * @param {string} shopId - ID магазина из GameData.shops.
 */
function updateShopScreen(shopId) {
    const resolvedId = shopId || gameState.currentShopId;
    gameState.currentShopId = resolvedId;
    const shop = GameData.shops[resolvedId];
    if (!shop) {
        console.error('Ошибка: Магазин не найден!', resolvedId);
        appendToLog('Ошибка: Магазин не найден!');
        showScreen('game-play-screen');
        return;
    }

    DOMElements.shopName.textContent = shop.name.toUpperCase();
    DOMElements.shopGrid.innerHTML = '';
    DOMElements.shopPlayerGold.textContent = gameState.player.gold;
    gameState.selectedShopItemData = null; // Сброс выбранного товара
    updateShopDetailsPanel(true); // Очистить панель деталей

    shop.items.forEach(shopItemEntry => {
        const itemData = GameData.items[shopItemEntry.itemId];
        if (!itemData) return;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('shop-item');
        itemDiv.dataset.itemId = shopItemEntry.itemId; // Для удобства выбора
        itemDiv.innerHTML = `<i>${itemData.icon}</i><span>${itemData.name}</span>`;
        
        // Отображаем запас, если он не бесконечный
        if (shopItemEntry.stock !== Infinity) {
             const stockSpan = document.createElement('span');
             stockSpan.classList.add('shop-item-stock');
             stockSpan.textContent = `x${shopItemEntry.stock}`;
             itemDiv.appendChild(stockSpan);
        }

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('shop-item-price');
        priceSpan.textContent = `💰${shopItemEntry.price}`;
        itemDiv.appendChild(priceSpan);

        itemDiv.onclick = () => showShopItemDetails(itemData, shopItemEntry.price, shopItemEntry.stock, shopItemEntry.itemId);
        DOMElements.shopGrid.appendChild(itemDiv);
    });
}

/**
 * showShopItemDetails(itemData: object, price: number, stock: number, originalItemId: string) - Показывает детали товара в магазине.
 */
function showShopItemDetails(itemData, price, stock, originalItemId) {
    document.querySelectorAll('.shop-item').forEach(el => el.classList.remove('selected'));
    const itemElement = DOMElements.shopGrid.querySelector(`[data-item-id="${originalItemId}"]`);
    if (itemElement) itemElement.classList.add('selected');

    gameState.selectedShopItemData = { item: itemData, price: price, stock: stock, originalItemId: originalItemId };

    DOMElements.shopDetailItemName.textContent = `${itemData.icon} ${itemData.name}`;
    DOMElements.shopDetailItemDescription.textContent = itemData.description;

    let statsText = '';
    if (itemData.damage) statsText += `Урон: ${itemData.damage}\n`;
    if (itemData.magicDamage) statsText += `Маг. Урон: ${itemData.magicDamage}\n`;
    if (itemData.defense) statsText += `Защита: ${itemData.defense}\n`;
    if (itemData.hpRestore) statsText += `Восст. HP: ${itemData.hpRestore}\n`;
    if (itemData.mpRestore) statsText += `Восст. MP: ${itemData.mpRestore}\n`;
    DOMElements.shopDetailItemStats.textContent = statsText;
    DOMElements.shopDetailItemPrice.textContent = price;

    DOMElements.buyButton.disabled = gameState.player.gold < price || stock === 0;
    DOMElements.buyButton.onclick = buyItem;
    DOMElements.shopPlayerGold.textContent = gameState.player.gold;
}

/**
 * updateShopDetailsPanel(clear = false) - Обновляет или очищает панель деталей товара в магазине.
 */
function updateShopDetailsPanel(clear = false) {
    if (clear) {
        DOMElements.shopDetailItemName.textContent = 'Выбери товар';
        DOMElements.shopDetailItemDescription.textContent = '';
        DOMElements.shopDetailItemStats.textContent = '';
        DOMElements.shopDetailItemPrice.textContent = '';
        DOMElements.buyButton.disabled = true;
        gameState.selectedShopItemData = null;
        document.querySelectorAll('.shop-item').forEach(el => el.classList.remove('selected'));
    }
}

/**
 * buyItem() - Покупает выбранный товар в магазине.
 */
function buyItem() {
    if (!gameState.selectedShopItemData) return;
    const item = gameState.selectedShopItemData.item;
    const price = gameState.selectedShopItemData.price;
    const shopId = gameState.currentShopId;
    const originalItemId = gameState.selectedShopItemData.originalItemId;

    if (gameState.player.gold < price) {
        appendToLog('Недостаточно золота!');
        return;
    }
    if (gameState.selectedShopItemData.stock === 0) {
        appendToLog('Товара нет в наличии!');
        return;
    }

    gameState.player.gold -= price;
    addItem(item, 1); // Добавляем в инвентарь

    // Обновляем запас в магазине
    const shop = GameData.shops[shopId];
    const shopItemEntry = shop.items.find(si => si.itemId === originalItemId);
    if (shopItemEntry && shopItemEntry.stock !== Infinity) {
        shopItemEntry.stock--;
    }

    appendToLog(`Куплен ${item.name} за 💰${price}.`);
    updatePlayerInfo();
    updateShopScreen(shopId); // Обновляем магазин для показа нового стока
}

// --- Бои (упрощенные, только в логе) ---
/**
 * startCombat(enemyId: string) - Инициирует текстовый бой.
 * @param {string} enemyId - ID врага из GameData.enemies.
 */
function startCombat(enemyId) {
    if (gameState.isCombatActive) {
        appendToLog('Ты уже в бою!');
        return;
    }
    const enemyData = GameData.enemies[enemyId];
    if (!enemyData) {
        console.error('Ошибка: Враг не найден!', enemyId);
        appendToLog('Ошибка: Враг не найден!');
        return;
    }

    gameState.isCombatActive = true;
    let enemy = { ...enemyData, hp: enemyData.hp }; // Копируем врага для боя

    appendToLog(`Внезапно на тебя нападает ${enemy.name}! Начался бой!`);
    DOMElements.actionButtonsDiv.innerHTML = ''; // Очищаем обычные кнопки действий

    // Добавляем кнопки для боя
    const attackBtn = document.createElement('button');
    attackBtn.textContent = `🗡️ Атаковать ${enemy.name}`;
    attackBtn.onclick = () => playerTurnCombat(enemy);
    DOMElements.actionButtonsDiv.appendChild(attackBtn);

    const runBtn = document.createElement('button');
    runBtn.textContent = '🏃 Убежать';
    runBtn.onclick = () => tryToRunCombat(enemy);
    DOMElements.actionButtonsDiv.appendChild(runBtn);

    // Убедимся, что игрок не может менять локацию или открывать другие меню во время боя
    DOMElements.btnMap.disabled = true;
    DOMElements.btnInventory.disabled = true;
    DOMElements.btnQuests.disabled = true;
    DOMElements.btnCharacter.disabled = true;
}

/**
 * playerTurnCombat(enemy: object) - Ход игрока в бою.
 */
function playerTurnCombat(enemy) {
    if (!gameState.isCombatActive) return; // Проверка, что бой еще активен

    // Игрок атакует
    let playerDamage = gameState.player.derivedStats.physAttack;
    const isCrit = Math.random() * 100 < gameState.player.derivedStats.critChance;
    if (isCrit) {
        playerDamage = playerDamage * 1.5;
        appendToLog(`⭐ Твой ${gameState.player.equipped.weapon ? GameData.items[gameState.player.equipped.weapon.itemId].name : 'кулак'} наносит ${enemy.name} КРИТИЧЕСКИЙ удар!`);
    }
    const effectiveDamage = Math.max(1, playerDamage - enemy.defense); // Минимум 1 урон
    enemy.hp -= effectiveDamage;
    appendToLog(`Ты наносишь ${effectiveDamage.toFixed(0)} урона ${enemy.name}. (Осталось HP ${enemy.name}: ${Math.max(0, enemy.hp)})`);
    
    updatePlayerInfo(); // Обновляем UI после действий игрока

    if (enemy.hp <= 0) {
        endCombat(true, enemy);
    } else {
        // Ход врага
        gameState.currentCombatInterval = setTimeout(() => enemyTurnCombat(enemy), 1000);
    }
}

/**
 * enemyTurnCombat(enemy: object) - Ход врага в бою.
 */
function enemyTurnCombat(enemy) {
    if (!gameState.isCombatActive || gameState.player.hp <= 0) return; // Проверка, что бой активен и игрок жив

    let enemyDamage = enemy.attack;
    const isDodged = Math.random() * 100 < gameState.player.derivedStats.dodgeChance;
    if (isDodged) {
        appendToLog(` Ты ловко увернулся от атаки ${enemy.name}!`);
    } else {
        const effectiveDamage = Math.max(1, enemyDamage - gameState.player.derivedStats.defense);
        gameState.player.hp -= effectiveDamage;
        appendToLog(`${enemy.name} наносит ${effectiveDamage.toFixed(0)} урона тебе. (Осталось HP: ${Math.max(0, gameState.player.hp)})`);
    }

    updatePlayerInfo(); // Обновляем UI после действий врага

    if (gameState.player.hp <= 0) {
        endCombat(false, enemy);
    }
    // Если оба живы, то бой продолжается, кнопки действий остаются для игрока.
}

/**
 * tryToRunCombat(enemy: object) - Попытка убежать из боя.
 */
function tryToRunCombat(enemy) {
    if (Math.random() < 0.5) { // 50% шанс на успех
        appendToLog('Тебе удалось убежать!');
        endCombat(false, enemy, true); // Передаем, что сбежал
    } else {
        appendToLog('Не удалось убежать! Враг атакует.');
        gameState.currentCombatInterval = setTimeout(() => enemyTurnCombat(enemy), 500); // Враг атакует, если не удалось убежать
    }
}

/**
 * endCombat(playerWon: boolean, enemy: object, escaped = false) - Завершает бой.
 * @param {boolean} playerWon - true, если игрок победил.
 * @param {object} enemy - Объект врага, с которым шел бой.
 * @param {boolean} escaped - true, если игрок сбежал.
 */
function endCombat(playerWon, enemy, escaped = false) {
    // Останавливаем все активные интервалы, связанные с боем
    if (gameState.currentCombatInterval) {
        clearInterval(gameState.currentCombatInterval);
        gameState.currentCombatInterval = null;
    }
    gameState.isCombatActive = false;
    DOMElements.actionButtonsDiv.innerHTML = ''; // Очищаем боевые кнопки

    // Включаем навигационные кнопки обратно
    DOMElements.btnMap.disabled = false;
    DOMElements.btnInventory.disabled = false;
    DOMElements.btnQuests.disabled = false;
    DOMElements.btnCharacter.disabled = false;

    if (playerWon) {
        appendToLog(`Ты победил ${enemy.name}!`);
        gameState.player.xp += enemy.xp;
        gameState.player.gold += enemy.gold;
        appendToLog(`Получено ${enemy.xp} XP и 💰${enemy.gold}.`);
        
        // Лут с врага
        if (enemy.loot) {
            enemy.loot.forEach(drop => {
                if (Math.random() < drop.chance) {
                    const item = GameData.items[drop.itemId];
                    const quantity = drop.quantity || 1;
                    addItem(item, quantity);
                }
            });
        }
        checkLevelUp();
        checkQuestProgress('kill', enemy.id, 1); // targetId для kill - это ID врага
    } else if (escaped) {
        appendToLog('Ты успешно избежал боя.');
    } else { // Игрок проиграл
        appendToLog('Ты был побежден... Игра окончена.');
        alert('Ты пал в бою. Начни новую игру!');
        window.location.reload();
        return; // Возвращаемся, чтобы избежать дальнейшего выполнения
    }
    
    // Восстанавливаем HP игрока до минимума, если он выжил
    gameState.player.hp = Math.max(1, gameState.player.hp);
    updatePlayerInfo();
    updateGameScene(); // Обновить текущую локацию (вернуть обычные действия)
}


// =====================================================================================================================
// === SCREEN-SPECIFIC ACTIONS - Функции действий на разных локациях ===
// =====================================================================================================================

/**
 * updateGameScene() - Обновляет описание локации, фон и доступные действия на game-play-screen.
 */
function updateGameScene() {
    // Остановить любой активный боевой интервал, если он есть
    if (gameState.currentCombatInterval) {
        clearInterval(gameState.currentCombatInterval);
        gameState.currentCombatInterval = null;
    }
    gameState.isCombatActive = false; // Убедиться, что combat state сброшен

    const location = GameData.locations[gameState.currentLocation];
    if (!location) {
        console.error('Ошибка: Локация не найдена!', gameState.currentLocation);
        appendToLog('Ошибка: Локация не найдена!');
        DOMElements.locationName.textContent = 'Ошибка!';
        DOMElements.locationText.textContent = 'Неизвестная локация.';
        DOMElements.actionButtonsDiv.innerHTML = ''; // Очищаем кнопки действий, если локация не найдена
        DOMElements.centralGameArea.style.backgroundImage = 'none'; // Сбросить фон
        DOMElements.centralGameArea.style.backgroundColor = '#4f3a34'; // Фоновый цвет по умолчанию
        return;
    }

    DOMElements.locationName.textContent = location.name;
    DOMElements.locationText.textContent = location.description;

    // Обновляем фон локации. background-image теперь применяется к DOMElements.centralGameArea
    if (location.background) {
        // Проверяем, существует ли файл
        const img = new Image();
        img.onload = () => {
            DOMElements.centralGameArea.style.backgroundImage = `url('${location.background}')`;
            DOMElements.centralGameArea.style.backgroundSize = 'cover';
            DOMElements.centralGameArea.style.backgroundPosition = 'center';
            DOMElements.centralGameArea.style.backgroundRepeat = 'no-repeat';
            DOMElements.centralGameArea.style.backgroundColor = 'transparent'; // Сделать фон прозрачным, если есть картинка
        };
        img.onerror = () => { // Если картинка не найдена, используем цвет
            DOMElements.centralGameArea.style.backgroundImage = 'none';
            DOMElements.centralGameArea.style.backgroundColor = '#4f3a34'; // Фоновый цвет по умолчанию
        };
        img.src = location.background; // Запускаем загрузку картинки
    } else {
        DOMElements.centralGameArea.style.backgroundImage = 'none';
        DOMElements.centralGameArea.style.backgroundColor = '#4f3a34'; // Фоновый цвет по умолчанию
    }

    DOMElements.actionButtonsDiv.innerHTML = ''; // Очищаем старые кнопки (только локационные)
    if (location.actions) {
        location.actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.onclick = () => {
                if (action.func === 'visitShop' && action.shopId) {
                    gameState.currentShopId = action.shopId;
                }
                if (action.func in window && typeof window[action.func] === 'function') {
                    setTimeout(() => window[action.func](action.param), 0); 
                } else {
                    console.error(`Функция ${action.func} не найдена или не является функцией.`);
                    appendToLog(`Действие "${action.text}" пока не реализовано.`);
                }
            };
            DOMElements.actionButtonsDiv.appendChild(button);
        });
    }

    // Включаем навигационные кнопки, если не в бою
    if (!gameState.isCombatActive) {
        DOMElements.btnMap.disabled = false;
        DOMElements.btnInventory.disabled = false;
        DOMElements.btnQuests.disabled = false;
        DOMElements.btnCharacter.disabled = false;
    }
}

/**
 * moveTo(locationId: string) - Перемещает игрока в новую локацию.
 * @param {string} locationId - ID новой локации.
 */
function moveTo(locationId) {
    if (gameState.currentLocation === locationId) {
        appendToLog(`Ты уже в ${GameData.locations[locationId].name}.`);
        return;
    }
    // Проверяем, есть ли соединение с этой локацией.
    // Если на карте появилась кнопка "Перейти в <локация>", значит, соединение есть
    // Но если игрок каким-то образом вызывает эту функцию напрямую, без карты, то стоит проверить
    const currentLocationData = GameData.locations[gameState.currentLocation];
    if (currentLocationData && currentLocationData.connections && !currentLocationData.connections.includes(locationId)) {
        appendToLog(`Ты не можешь попасть в ${GameData.locations[locationId].name} из ${currentLocationData.name}.`);
        return;
    }


    gameState.currentLocation = locationId;
    appendToLog(`Ты переместился в ${GameData.locations[locationId].name}.`);
    updateGameScene();
    updatePlayerInfo();
}

/**
 * talkToElder() - Диалог со Старейшиной и управление квестами.
 */
function talkToElder() {
    appendToLog('Старейшина: "Приветствую, храбрец! У меня есть поручения для тебя."');
    
    DOMElements.actionButtonsDiv.innerHTML = ''; // Очистить текущие действия
    
    let questsInteractionMade = false;
    for (const questId in GameData.quests) {
        const quest = GameData.quests[questId];
        // Квесты от Старейшины в Городе
        if (quest.giver === 'Старейшина' && quest.giverLocation === 'Город') {
            const activeQuest = gameState.activeQuests.find(q => q.id === questId);
            const completedQuest = gameState.completedQuests.find(q => q.id === questId);

            if (!activeQuest && !completedQuest) {
                // Квест доступен
                const btn = document.createElement('button');
                btn.textContent = `Взять квест: "${quest.name}"`;
                btn.onclick = () => {
                    takeQuest(questId);
                    talkToElder(); // Обновим меню Старейшины, чтобы показать изменения
                };
                DOMElements.actionButtonsDiv.appendChild(btn);
                questsInteractionMade = true;
            } else if (activeQuest && activeQuest.status === 'turn_in') {
                // Квест готов к сдаче
                const btn = document.createElement('button');
                btn.textContent = `Сдать квест: "${quest.name}"`;
                btn.onclick = () => {
                    completeQuest(questId);
                    talkToElder(); // Обновим меню Старейшины
                };
                DOMElements.actionButtonsDiv.appendChild(btn);
                questsInteractionMade = true;
            } else if (activeQuest && activeQuest.status === 'active') {
                // Квест активен, но не готов к сдаче
                // appendToLog(`Старейшина: "Надеюсь, ты скоро справишься с заданием "${quest.name}"!"`);
                questsInteractionMade = true;
            }
        }
    }

    if (!questsInteractionMade) {
        appendToLog('Старейшина: "Пока для тебя нет новых заданий. Возвращайся позже."');
    }

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Вернуться к делам';
    backBtn.onclick = () => updateGameScene();
    DOMElements.actionButtonsDiv.appendChild(backBtn);
}

/**
 * visitShop(shopId: string) - Открывает экран магазина.
 * @param {string} shopId - ID магазина.
 */
function visitShop(shopId) {
    if (shopId) { gameState.currentShopId = shopId; }
    showScreen('shop-screen');
}

/**
 * chopWood() - Действие рубки дерева.
 */
function chopWood() {
    appendToLog('Ты рубишь дерево...');
    setTimeout(() => {
        if (Math.random() < 0.7) { // 70% шанс успеха
            addItem(GameData.items['wood'], 1); // Используем ID
        } else {
            appendToLog('Не удалось срубить ничего полезного.');
        }
        updateGameScene(); // Обновить кнопки действий после таймаута
    }, 1500); // 1.5 секунды на действие
}

/**
 * mineOre() - Действие добычи руды в "Шахте".
 */
function mineOre() {
    appendToLog('Ты добываешь руду...');
    setTimeout(() => {
        const success = Math.random() < 0.65;
        if (success) {
            addItem(GameData.items['iron_ore'], 1);
            appendToLog('Нашёл рудную жилу! Добыта 1x Железная руда.');
        } else {
            appendToLog('Пустая порода. Придётся попробовать ещё.');
        }
        updateInventoryDisplay();
        updateGameScene();
    }, 800);
}


/**
 * hunt() - Действие охоты.
 */
function hunt() {
    appendToLog('Ты идешь по следу...');
    setTimeout(() => {
        if (Math.random() < 0.6) { // 60% шанс встретить зверя
            const enemyId = (Math.random() < 0.5) ? 'small_game' : 'forest_wolf'; // Используем ID врага
            startCombat(enemyId); // Начинаем бой. startCombat сама обновит UI
        } else {
            appendToLog('Дичь ускользнула от тебя.');
            updateGameScene(); // Возвращаем кнопки действий
        }
    }, 2000);
}

/**
 * fish() - Действие рыбалки.
 */
function fish() {
    appendToLog('Ты забрасываешь удочку...');
    setTimeout(() => {
        if (Math.random() < 0.75) { // 75% шанс поймать рыбу
            addItem(GameData.items['lake_fish'], 1); // Используем ID
        } else {
            appendToLog('Рыбалка оказалась неудачной...');
        }
        updateGameScene();
    }, 1800);
}

/**
 * exploreShore() - Действие исследования берега.
 */
function exploreShore() {
    appendToLog('Ты исследуешь берег озера...');
    setTimeout(() => {
        if (Math.random() < 0.2) { // 20% шанс что-то найти
            const questItem = GameData.items['supply_list'];
            const questId = 'lost_supplies_trader';

            const isQuestActive = gameState.activeQuests.some(q => q.id === questId);
            const hasQuestItem = gameState.inventory.some(item => item.id === questItem.id);

            if (isQuestActive && !hasQuestItem) {
                addItem(questItem, 1);
                appendToLog('На берегу ты нашел чей-то Список Поставок. Может, он пригодится кому-то в Городе?');
            } else {
                const possibleFinds = [GameData.items['forest_herb'], GameData.items['lake_fish']];
                const foundItem = possibleFinds[Math.floor(Math.random() * possibleFinds.length)];
                addItem(foundItem, 1);
            }
        } else {
            appendToLog('Ничего необычного на берегу не оказалось.');
        }
        updateGameScene(); // Обновить действия на экране
    }, 1000);
}


// =====================================================================================================================
// === LEVELING SYSTEM - Системы опыта и уровня ===
// =====================================================================================================================

/**
 * checkLevelUp() - Проверяет и обрабатывает повышение уровня.
 */
function checkLevelUp() {
    while (gameState.player.xp >= gameState.player.xpToNextLevel) {
        gameState.player.xp -= gameState.player.xpToNextLevel; // Вычитаем опыт для текущего уровня
        gameState.player.level++;
        gameState.player.xpToNextLevel = Math.floor(gameState.player.xpToNextLevel * 1.5); // Увеличиваем порог XP
        gameState.player.skillPoints += 5; // +5 очков навыков за уровень
        appendToLog(`Поздравляем! Ты достиг ${gameState.player.level} уровня! Получено 5 очков навыков!`);

        calculateDerivedStats(); // Пересчитать статы после возможного увеличения атрибутов
        // HP/MP уже обновлены в calculateDerivedStats
        // gameState.player.hp = gameState.player.maxHp; // Восстановление HP при уровне
        // gameState.player.mp = gameState.player.maxMp; // Восстановление MP при уровне

        updatePlayerInfo();
        // Если экран персонажа открыт, нужно обновить его
        if (DOMElements.characterScreen.classList.contains('active')) {
            updateCharacterScreen();
        }
    }
}


// =====================================================================================================================
// === SCREEN-SPECIFIC UPDATES - Обновления экранов ===
// =====================================================================================================================

// --- Карта ---
/**
 * updateMapDisplay() - Обновляет UI экрана карты.
 */
function updateMapDisplay() {
    DOMElements.mapCurrentLocation.textContent = GameData.locations[gameState.currentLocation].name;
    DOMElements.mapLocationButtons.innerHTML = '';
    
    // Добавляем текущую локацию в список для перехода
    // const currentLocationId = gameState.currentLocation;
    // const currentLocationBtn = document.createElement('button');
    // currentLocationBtn.textContent = `Тут ты сейчас`;
    // currentLocationBtn.disabled = true;
    // DOMElements.mapLocationButtons.appendChild(currentLocationBtn);

    const connections = GameData.locations[gameState.currentLocation].connections;
    if (connections) {
        connections.forEach(locId => {
            const button = document.createElement('button');
            button.textContent = `Перейти в ${GameData.locations[locId].name}`;
            button.onclick = () => {
                moveTo(locId); // Передаем ID
                showScreen('game-play-screen');
            };
            DOMElements.mapLocationButtons.appendChild(button);
        });
    }
}

// --- Персонаж ---
/**
 * updateCharacterScreen() - Обновляет UI экрана персонажа.
 */
function updateCharacterScreen() {
    const p = gameState.player;
    DOMElements.charScreenName.textContent = p.name;
    DOMElements.charName.textContent = p.name;
    DOMElements.charClass.textContent = p.class;
    DOMElements.charLevel.textContent = p.level;
    DOMElements.charXP.textContent = p.xp;
    DOMElements.charXPToLevel.textContent = p.xpToNextLevel;

    DOMElements.skillPoints.textContent = p.skillPoints;

    DOMElements.attrStr.textContent = p.stats.str;
    DOMElements.attrDex.textContent = p.stats.dex;
    DOMElements.attrInt.textContent = p.stats.int;
    DOMElements.attrVit.textContent = p.stats.vit;

    // Включаем/отключаем кнопки распределения навыков
    DOMElements.addAttributeBtns.forEach(btn => {
        btn.disabled = p.skillPoints <= 0;
    });

    // Производные характеристики
    calculateDerivedStats(); // Пересчитать на случай изменений
    DOMElements.derivedMaxHp.textContent = p.maxHp; // Теперь берем из player.maxHp
    DOMElements.derivedMaxMp.textContent = p.maxMp; // Теперь берем из player.maxMp
    DOMElements.derivedPhysAtk.textContent = p.derivedStats.physAttack;
    DOMElements.derivedMagAtk.textContent = p.derivedStats.magAttack;
    DOMElements.derivedDef.textContent = p.derivedStats.defense;
    DOMElements.derivedCrit.textContent = `${p.derivedStats.critChance.toFixed(1)}%`;
    DOMElements.derivedDodge.textContent = `${p.derivedStats.dodgeChance.toFixed(1)}%`;

    // Навыки класса (заглушка)
    DOMElements.classSkillsList.innerHTML = '';
    let skills = [];
    if (p.class === 'Воин') skills = ['Мощный Удар (10 STR)', 'Защитная Стойка (15 VIT)'];
    if (p.class === 'Охотник') skills = ['Меткий Выстрел (10 DEX)', 'Ловушка (12 INT)'];
    if (p.class === 'Маг') skills = ['Огненный Шар (10 INT)', 'Лечение (12 VIT)'];
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        DOMElements.classSkillsList.appendChild(li);
    });
}




/**
 * restAtCamp() - Восстанавливает HP/MP в Стартовом лагере.
 */
function restAtCamp() {
    const p = gameState.player;
    const hpRestore = Math.ceil(p.maxHp * 0.5);
    const mpRestore = Math.ceil(p.maxMp * 0.5);
    p.hp = Math.min(p.maxHp, p.hp + hpRestore);
    p.mp = Math.min(p.maxMp, p.mp + mpRestore);
    appendToLog(`Ты отдыхаешь у костра (+${hpRestore} HP, +${mpRestore} MP).`);
    updatePlayerInfo();
}
// =====================================================================================================================
// === EVENT LISTENERS - Обработчики событий для всех интерактивных элементов ===
// =====================================================================================================================

let selectedClass = null; // Глобальная переменная для хранения выбранного класса

// --- START SCREEN - Обработчики для стартового экрана ---
DOMElements.btnStartNewGame.addEventListener('click', () => {
    // Сбросить состояние полей создания персонажа
    DOMElements.charNameInput.value = '';
    DOMElements.charClassButtons.forEach(btn => btn.classList.remove('selected'));
    selectedClass = null; // Сброс выбранного класса
    updateCreateCharacterButtonState(); // Сделать кнопку создания неактивной
    
    showScreen('character-creation-screen');
});
// DOMElements.btnLoadGame.addEventListener('click', loadGame); // Логика загрузки пока не реализована

// --- CHARACTER CREATION - Обработчики для создания персонажа ---

/**
 * updateCreateCharacterButtonState() - Обновляет состояние кнопки "НАЧАТЬ ПРИКЛЮЧЕНИЕ".
 * Активирует/деактивирует ее в зависимости от ввода имени и выбора класса.
 */
function updateCreateCharacterButtonState() {
    const isNameEntered = DOMElements.charNameInput.value.trim() !== '';
    const isClassSelected = selectedClass !== null;
    DOMElements.btnCreateCharacter.disabled = !(isNameEntered && isClassSelected);
    // Для отладки можно добавить: console.log(`Name: ${isNameEntered}, Class: ${isClassSelected}, Button Disabled: ${DOMElements.btnCreateCharacter.disabled}`);
}

// Обработчик ввода имени персонажа
DOMElements.charNameInput.addEventListener('input', updateCreateCharacterButtonState);

// Обработчики выбора класса
DOMElements.charClassButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Снять выделение со всех кнопок классов
        DOMElements.charClassButtons.forEach(btn => btn.classList.remove('selected'));
        // Выделить текущую кнопку
        button.classList.add('selected');
        // Обновить выбранный класс
        selectedClass = button.dataset.class;
        // Проверить состояние кнопки "СОЗДАТЬ"
        updateCreateCharacterButtonState();
    });
});

// Обработчик нажатия кнопки "НАЧАТЬ ПРИКЛЮЧЕНИЕ"
DOMElements.btnCreateCharacter.addEventListener('click', () => {
    const name = DOMElements.charNameInput.value.trim();
    if (!name || !selectedClass) {
        alert("Пожалуйста, введите имя и выберите класс!");
        return;
    }

    // Сброс и инициализация игрового состояния для нового персонажа
    // Используем deep copy для objects внутри player
    gameState = {
        player: {
            name: name,
            class: selectedClass,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            skillPoints: 5, // 5 стартовых очков
            gold: 100,
            hp: 0, 
            maxHp: 0,
            mp: 0,
            maxMp: 0,
            stats: { str: 0, dex: 0, int: 0, vit: 0 }, // Базовые статы будут заданы ниже
            derivedStats: {}
        },
        inventory: [],
        equipped: { ...initialEquippedState }, // Копируем дефолтный объект экипировки
        currentLocation: 'Стартовый лагерь',
        gameLog: [], 
        activeQuests: [],
        completedQuests: [],
        selectedInventoryItem: null,
        selectedShopItemData: null,
        currentShopId: null,
        isCombatActive: false,
        currentCombatInterval: null,
    };
    lastInstanceId = 0; // Сбрасываем счетчик ID

    // Установка базовых характеристик и стартовых предметов в зависимости от класса
    let starterWeaponId = null;
    let starterShieldId = null; 
    let starterArmorId = GameData.items['leather_jacket'].id; // У всех одинаковая
    let starterBootsId = GameData.items['simple_boots'].id; // У всех одинаковые

    switch (selectedClass) {
        case 'Воин':
            gameState.player.stats.str = 3; gameState.player.stats.vit = 2; gameState.player.stats.dex = 1; gameState.player.stats.int = 0;
            starterWeaponId = GameData.items['wooden_sword'].id;
            starterShieldId = GameData.items['wooden_shield'].id;
            break;
        case 'Охотник':
            gameState.player.stats.dex = 3; gameState.player.stats.int = 1; gameState.player.stats.str = 1; gameState.player.stats.vit = 1;
            starterWeaponId = GameData.items['hunting_bow'].id;
            break;
        case 'Маг':
            gameState.player.stats.int = 3; gameState.player.stats.vit = 1; gameState.player.stats.dex = 1; gameState.player.stats.str = 0;
            starterWeaponId = GameData.items['short_staff'].id;
            break;
case 'Ремесленник':
    gameState.player.stats.int = 2; 
    gameState.player.stats.vit = 2; 
    gameState.player.stats.dex = 1; 
    gameState.player.stats.str = 0;
    starterWeaponId = GameData.items['short_staff'].id;
    break;

    }
    
    // Добавляем стартовые предметы в инвентарь
    if (starterWeaponId) addItem(GameData.items[starterWeaponId]);
    if (starterShieldId) addItem(GameData.items[starterShieldId]);
    addItem(GameData.items[starterArmorId]);
    addItem(GameData.items[starterBootsId]);
    
    // Дополнительные стартовые расходники
    addItem(GameData.items['small_hp_potion'], 2); // 2 зелья
    addItem(GameData.items['bread'], 1); // 1 хлеб
    
    // После инициализации инвентаря, нужно экипировать стартовое снаряжение
    // Найдем только что добавленные экземпляры предметов в инвентаре
    if (starterWeaponId) {
        const weaponInstance = gameState.inventory.find(item => item.id === starterWeaponId && item.type === 'weapon');
        if (weaponInstance) equipItem(weaponInstance);
    }
    if (starterShieldId) {
        const equippedShield = gameState.inventory.find(item => item.id === starterShieldId && item.type === 'shield');
        if (equippedShield) equipItem(equippedShield);
    }
    const equippedArmor = gameState.inventory.find(item => item.id === starterArmorId && item.type === 'armor');
    if (equippedArmor) equipItem(equippedArmor);
    const equippedBoots = gameState.inventory.find(item => item.id === starterBootsId && item.type === 'armor');
    if (equippedBoots) equipItem(equippedBoots);


    calculateDerivedStats(); // Расчет max HP/MP и других производных
    gameState.player.hp = gameState.player.maxHp; // Полное здоровье
    gameState.player.mp = gameState.player.maxMp; // Полная мана

    appendToLog(`Приветствуем, ${gameState.player.name} ${gameState.player.class}! Твое приключение начинается.`);
    showScreen('game-play-screen'); // Переход на основной игровой экран
    updatePlayerInfo(); // Обновление верхней панели игрока
});

// --- BOTTOM NAV BAR - Обработчики навигационных кнопок ---
DOMElements.btnMap.addEventListener('click', () => showScreen('map-screen'));
DOMElements.btnInventory.addEventListener('click', () => showScreen('inventory-screen'));
DOMElements.btnQuests.addEventListener('click', () => showScreen('quests-screen'));
DOMElements.btnCharacter.addEventListener('click', () => showScreen('character-screen'));

// --- BACK BUTTONS - Кнопки "Назад" для всех экранов ---
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', () => {
        showScreen(button.dataset.target);
    });
});

// --- CHARACTER SCREEN - Распределение очков навыков ---
DOMElements.addAttributeBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (gameState.player.skillPoints > 0) {
            const attribute = button.dataset.attribute;
            gameState.player.stats[attribute]++;
            gameState.player.skillPoints--;
            appendToLog(`Ты увеличил ${attribute.toUpperCase()}!`);
            updateCharacterScreen(); // Обновить экран
            updatePlayerInfo(); // Обновить верхнюю панель
        }
    });
});


// =====================================================================================================================
// === INITIALIZATION - Инициализация игры при загрузке страницы ===
// =====================================================================================================================

// Дефолтные состояния для новой игры
const initialPlayerState = {
    name: '', class: '', level: 1, xp: 0, xpToNextLevel: 100, skillPoints: 0, gold: 0,
    hp: 0, maxHp: 0, mp: 0, maxMp: 0,
    stats: { str: 0, dex: 0, int: 0, vit: 0 }, derivedStats: {}
};
const initialEquippedState = {
    weapon: null, shield: null, armor: null, helmet: null, boots: null, accessory1: null, accessory2: null
};

/**
 * initGame() - Инициализирует игру при загрузке страницы.
 */
function initGame() {
    // При загрузке страницы активен стартовый экран
    showScreen('start-screen');
    
    // Кнопка "Начать Приключение" изначально disabled
    DOMElements.btnCreateCharacter.disabled = true; 
}

// Запуск инициализации игры при загрузке страницы
initGame();

// --- КОНЕЦ КОДА ---