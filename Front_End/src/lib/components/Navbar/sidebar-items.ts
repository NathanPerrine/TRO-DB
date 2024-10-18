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
            link: '#',
            subItems: [
              { title: 'Amulets', link: '/items/equipment/accessories/amulets', disabled: false },
              { title: 'Belts', link: '/items/equipment/accessories/belts', disabled: false },
              { title: 'Rings', link: '/items/equipment/accessories/rings', disabled: false }
            ]
          },
          { title: 'Armor', link: '/items/equipment/armor', disabled: false },
          { title: 'Weapons', link: '/items/equipment/weapons', disabled: false }
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
      { title: 'Junk', link: '/items/junk', disabled: false },
      { title: 'Dungeon Items', link: '/items/dungeon-items', disabled: false }
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
