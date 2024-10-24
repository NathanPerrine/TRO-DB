export interface SidebarItem {
  title: string;
  link?: string;
  disabled?: boolean;
  subItems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Areas',
    subItems: [
      { title: 'Dungeons', link: '/areas/dungeons', disabled: false },
      { title: 'Towns', link: '/areas/towns', disabled: false },
      { title: 'Zones', link: '/areas/zones', disabled: false }
    ]
  },
  {
    title: 'Items',
    subItems: [
      {
        title: 'Books',
        subItems: [
          { title: 'Skillbooks', link: '/items/books/skillbooks', disabled: false },
          { title: 'Spellbooks', link: '/items/books/spellbooks', disabled: false }
        ]
      },
      {
        title: 'Equipment',
        subItems: [
          {
            title: 'Accessories',
            link: '/items/equipment/accessories',
            disabled: false
            // subItems: [
            //   { title: 'Amulets', link: '/items/equipment/accessories/amulets', disabled: true },
            //   {
            //     title: 'Backpacks',
            //     link: '/items/equipment/accessories/backpacks',
            //     disabled: false
            //   },
            //   { title: 'Baldrics', link: '/items/equipment/accessories/baldrics', disabled: false },
            //   { title: 'Belts', link: '/items/equipment/accessories/belts', disabled: false },
            //   { title: 'Rings', link: '/items/equipment/accessories/rings', disabled: false }
            // ]
          },
          { title: 'Armor', link: '/items/equipment/armor', disabled: false },
          { title: 'Weapons', link: '/items/equipment/weapons', disabled: false },
          { title: 'Equipment Sets', link: '/items/equipment/sets', disabled: true }
        ]
      },
      {
        title: 'Consumables',
        subItems: [
          { title: 'Baubles', link: '/items/consumables/baubles', disabled: false },
          { title: 'Orbs', link: '/items/consumables/orbs', disabled: false },
          { title: 'Potions', link: '/items/consumables/potions', disabled: false },
          { title: 'Scrolls', link: '/items/consumables/scrolls', disabled: false },
          { title: 'Wands', link: '/items/consumables/wands', disabled: false }
        ]
      },
      { title: 'Junk', link: '/items/junk', disabled: true },
      { title: 'Dungeon Items', link: '/items/dungeon-items', disabled: true }
    ]
  },
  {
    title: 'Magic',
    subItems: [
      { title: 'Thaumaturgy', link: '/magic/thaumaturgy', disabled: false },
      { title: 'Mysticism', link: '/magic/mysticism', disabled: false },
      { title: 'Elementalism', link: '/magic/elementalism', disabled: false },
      { title: 'Sorcery', link: '/magic/sorcery', disabled: false },
      { title: 'Necromancy', link: '/magic/necromancy', disabled: false }
    ]
  },
  { title: 'Character Builder', link: '/characterbuilder', disabled: false },
  { title: 'Guides', link: '/guides', disabled: true },
  { title: 'Mobs', link: '/mobs', disabled: false },
  { title: 'NPCs', link: '/npcs', disabled: true },
  { title: 'Quests', link: '/quests', disabled: true },
  { title: 'Shops', link: '/shops', disabled: true }
];
