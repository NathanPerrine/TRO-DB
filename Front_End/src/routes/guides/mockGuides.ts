// mockGuides.ts
const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
};

export const mockGuides = [
  // Leveling Guides
  {
    type: 'leveling',
    title: 'Path of the Swift Blade: 1-20 Speed Leveling',
    summary:
      'Master the art of efficient leveling in the starting zones. Master the art of efficient leveling in the starting zones. Master the art of efficient leveling in the starting zones. ',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Angel '
  },
  {
    type: 'leveling',
    title: 'Desert Realm Progression (30-40)',
    summary: 'Navigate the treacherous desert zones for optimal experience gains',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Rosetta '
  },
  {
    type: 'leveling',
    title: 'Frost Peak Mastery (40-50)',
    summary: 'Conquer the frozen peaks with this strategic leveling path',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Mittie '
  },
  {
    type: 'leveling',
    title: "Warrior's Path to Glory (50-60)",
    summary: 'Elite combat techniques for warrior class progression',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Rodney '
  },
  {
    type: 'leveling',
    title: "Mage's Arcane Journey (20-30)",
    summary: 'Optimize your spell rotation for maximum experience gain',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Ronnie '
  },
  {
    type: 'leveling',
    title: "Rogue's Shadow Path (15-25)",
    summary: 'Stealth-based leveling strategies for the cunning adventurer',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Jerry '
  },
  {
    type: 'leveling',
    title: "Cleric's Divine Ascension (35-45)",
    summary: 'Healing-focused progression through dangerous territories',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Craig '
  },
  {
    type: 'leveling',
    title: "Ranger's Wild Hunt (25-35)",
    summary: 'Master beast taming while maximizing experience gains',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Bryan '
  },
  {
    type: 'leveling',
    title: "Paladin's Righteous Path (45-55)",
    summary: "Holy warrior's guide to efficient undead slaying",
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Nelle '
  },
  {
    type: 'leveling',
    title: "Druid's Natural Progress (30-40)",
    summary: 'Shape-shifting strategies for rapid advancement',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Elnora '
  },

  // New Player Guides
  {
    type: 'new player',
    title: "Welcome to the Realm: Beginner's Guide",
    summary: 'Essential knowledge for your first steps into adventure',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Randy '
  },
  {
    type: 'new player',
    title: 'Understanding Character Classes',
    summary: 'Comprehensive overview of all playable classes',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Alfred '
  },
  {
    type: 'new player',
    title: 'Basic Combat Mechanics',
    summary: 'Master the fundamentals of combat and survival',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Martha '
  },
  {
    type: 'new player',
    title: 'Navigating the World Map',
    summary: 'Essential tips for exploring the vast realm safely',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Dennis '
  },
  {
    type: 'new player',
    title: 'Social Systems Guide',
    summary: 'Learn about guilds, parties, and trading basics',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Eva '
  },
  {
    type: 'new player',
    title: 'Inventory Management 101',
    summary: 'Tips for organizing your bags and bank space',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Joe '
  },
  {
    type: 'new player',
    title: 'Quest System Tutorial',
    summary: 'Understanding quest types and reward systems',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Marcus '
  },
  {
    type: 'new player',
    title: 'Transportation Guide',
    summary: 'All about mounts, teleports, and flight paths',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Blake '
  },
  {
    type: 'new player',
    title: 'Starter Zones Overview',
    summary: "Detailed look at each race's starting area",
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Beatrice '
  },
  {
    type: 'new player',
    title: 'Basic UI Customization',
    summary: 'Optimize your game interface for better play',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Daniel '
  },

  // Money Making Guides
  {
    type: 'money making',
    title: 'Herbalism Gold Guide',
    summary: 'Profitable herb gathering routes and markets',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Howard '
  },
  {
    type: 'money making',
    title: 'Dungeon Gold Farming',
    summary: 'Best dungeons for consistent gold returns',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Lena '
  },
  {
    type: 'money making',
    title: 'Auction House Mastery',
    summary: 'Advanced trading strategies for market profit',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Brian '
  },
  {
    type: 'money making',
    title: 'Rare Pet Trading',
    summary: 'Guide to the lucrative pet collection market',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Myrtle '
  },
  {
    type: 'money making',
    title: 'Mining Routes for Profit',
    summary: 'Optimal mining paths in high-level zones',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Grace '
  },
  {
    type: 'money making',
    title: 'Daily Quest Gold Guide',
    summary: 'Maximize your daily quest revenue',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Lucy '
  },
  {
    type: 'money making',
    title: 'Fishing Spot Secrets',
    summary: 'Best fishing locations for rare catches',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Elmer '
  },
  {
    type: 'money making',
    title: "Treasure Hunter's Manual",
    summary: 'Find and sell valuable treasure map locations',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Carl '
  },
  {
    type: 'money making',
    title: 'Raid Materials Profit',
    summary: 'Selling essential raid consumables and materials',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Ann '
  },
  {
    type: 'money making',
    title: 'Mercenary Services',
    summary: 'Make gold by offering dungeon carries',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Eddie '
  },

  // Crafting Guides
  {
    type: 'crafting',
    title: 'Blacksmithing 1-100',
    summary: 'Forge legendary weapons with optimal material usage',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Ricky '
  },
  {
    type: 'crafting',
    title: 'Alchemy Mastery Guide',
    summary: 'Brew powerful potions efficiently',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Marvin '
  },
  {
    type: 'crafting',
    title: 'Enchanting Secrets',
    summary: 'Master the art of weapon and armor enhancement',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Hattie '
  },
  {
    type: 'crafting',
    title: 'Tailoring Path Guide',
    summary: 'Create magical robes and bags efficiently',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Gene '
  },
  {
    type: 'crafting',
    title: 'Jewelcrafting Mastery',
    summary: 'Craft precious gems and jewelry for profit',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Lottie '
  },
  {
    type: 'crafting',
    title: 'Leatherworking Guide',
    summary: 'Craft superior leather armor and accessories',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Adelaide '
  },
  {
    type: 'crafting',
    title: 'Engineering Innovations',
    summary: 'Create gadgets and mechanical wonders',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Isabelle '
  },
  {
    type: 'crafting',
    title: 'Inscription Techniques',
    summary: 'Master the art of glyph and scroll creation',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Mathilda '
  },
  {
    type: 'crafting',
    title: 'Cooking for Raiders',
    summary: 'Prepare essential raid buff foods',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Juan '
  },
  {
    type: 'crafting',
    title: 'Advanced Recipe Hunting',
    summary: 'Find and learn rare crafting patterns',
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    author: 'Dean '
  }
];
