export interface SidebarItem {
  title: string;
  link?: string;
  subItems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Areas",
    subItems: [
      { title: "Dungeons", link: "/areas/dungeons" },
      { title: "Overworld", link: "/areas/overworld" }
    ]
  },
  {
    title: "Items",
    subItems: [
      {
        title: "Books",
        subItems: [
          { title: "Skill Books", link: "/items/books/skillbooks" },
          { title: "Spell Books", link: "/items/books/spellbooks" }
        ]
      },
      {
        title: "Equipment",
        subItems: [
          {
            title: "Accessories",
            link: "#",
            subItems: [
              { title: "Amulets", link: "/items/equipment/accessories/amulets" },
              { title: "Belts", link: "/items/equipment/accessories/belts" },
              { title: "Rings", link: "/items/equipment/accessories/rings" }
            ]
          },
          { title: "Armor", link: "/items/equipment/armor" },
          { title: "Weapons", link: "/items/equipment/weapons" }
        ]
      },
      {
        title: "Consumables",
        subItems: [
          { title: "Orbs", link: "/items/consumables/orbs" },
          { title: "Potions", link: "/items/consumables/potions" },
          { title: "Scrolls", link: "/items/consumables/scrolls" },
          { title: "Wands", link: "/items/consumables/wands" }
        ]
      }
    ]
  },
  {
    title: "Magic",
    subItems: [
      { title: "Thaumaturgy", link: "/magic/thaumaturgy" },
      { title: "Mysticism", link: "/magic/mysticism" },
      { title: "Elementalism", link: "/magic/elementalism" },
      { title: "Sorcery", link: "/magic/sorcery" },
      { title: "Necromancy", link: "/magic/necromancy" },
    ]
  },
  { title: "Monsters", link: "/monsters" },
  { title: "NPCs", link: "npcs" },
  { title: "Shops", link: "shops" }
];