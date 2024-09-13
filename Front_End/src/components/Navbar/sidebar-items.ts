export interface SidebarItem {
  title: string;
  link?: string;
  disabled?: boolean;
  subItems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Areas",
    subItems: [
      { title: "Dungeons", link: "/areas/dungeons", disabled: true },
      { title: "Overworld", link: "/areas/overworld", disabled: true }
    ]
  },
  {
    title: "Items",
    subItems: [
      {
        title: "Books",
        subItems: [
          { title: "Skill Books", link: "/items/books/skillbooks", disabled: true },
          { title: "Spell Books", link: "/items/books/spellbooks", disabled: true }
        ]
      },
      {
        title: "Equipment",
        subItems: [
          {
            title: "Accessories",
            link: "#",
            subItems: [
              { title: "Amulets", link: "/items/equipment/accessories/amulets", disabled: true },
              { title: "Belts", link: "/items/equipment/accessories/belts", disabled: true },
              { title: "Rings", link: "/items/equipment/accessories/rings", disabled: true }
            ]
          },
          { title: "Armor", link: "/items/equipment/armor", disabled: true },
          { title: "Weapons", link: "/items/equipment/weapons", disabled: true }
        ]
      },
      {
        title: "Consumables",
        subItems: [
          { title: "Orbs", link: "/items/consumables/orbs", disabled: true },
          { title: "Potions", link: "/items/consumables/potions", disabled: true },
          { title: "Scrolls", link: "/items/consumables/scrolls", disabled: true },
          { title: "Wands", link: "/items/consumables/wands", disabled: true }
        ]
      }
    ]
  },
  {
    title: "Magic",
    subItems: [
      { title: "Thaumaturgy", link: "/magic/thaumaturgy", disabled: false },
      { title: "Mysticism", link: "/magic/mysticism", disabled: false },
      { title: "Elementalism", link: "/magic/elementalism", disabled: false },
      { title: "Sorcery", link: "/magic/sorcery", disabled: false },
      { title: "Necromancy", link: "/magic/necromancy", disabled: false },
      { title: "Enchanting", link: "/magic/enchanting", disabled: false},
    ]
  },
  { title: "Quests", link: "/quests", disabled: true },
  { title: "Monsters", link: "/monsters", disabled: true },
  { title: "NPCs", link: "npcs", disabled: true },
  { title: "Shops", link: "shops", disabled: true }
];