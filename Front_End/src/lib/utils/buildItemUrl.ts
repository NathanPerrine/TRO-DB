import { getByType } from './itemTypes';

export type ItemReference = {
  _type: string;
  slug: { current: string };
  spellSchool?: string | null;
  armorWeapon?: 'armor' | 'weapon' | null;
  areaType?: 'dungeon' | 'town' | 'zone' | null;
  bookType?: 'skillbook' | 'spellbook' | null;
  type?: string | null;
};

// Build URL based on document type
export function buildItemUrl(ref: ItemReference): string {
  if (!ref || !ref.slug?.current) {
    console.warn('InternalLink: Missing reference or slug');
    return '#';
  }

  const slug = ref.slug.current;

  switch (ref._type) {
    case 'guide':
      return `/guides/${slug}`;

    case 'equipment':
      if (!ref.armorWeapon) {
        console.warn('InternalLink: Equipment missing armorWeapon field');
        return '#';
      }
      return `/items/equipment/${ref.armorWeapon === 'weapon' ? 'weapons' : ref.armorWeapon}/${slug}`;

    case 'accessory':
      return `/items/equipment/accessories/${slug}`;

    case 'spell': {
      const school = ref.spellSchool;
      if (!school) {
        console.warn('InternalLink: Spell missing spellSchool field');
        return '#';
      }
      return `/magic/${school}/${slug}`;
    }

    case 'item': {
      if (!ref.type) {
        console.warn('InternalLink: Item missing type field');
        return '#';
      }
      const entry = getByType(ref.type);
      if (!entry) {
        console.warn(`InternalLink: Unknown item type: ${ref.type}`);
        return '#';
      }
      return `/items/consumables/${entry.slug}/${slug}`;
    }

    case 'book':
      if (!ref.bookType) {
        console.warn('InternalLink: Book missing bookType field');
        return '#';
      }
      return `/items/books/${ref.bookType}/${slug}`;

    case 'area':
      if (!ref.areaType) {
        console.warn('InternalLink: Area missing areaType field');
        return '#';
      }
      return `/areas/${ref.areaType}/${slug}`;

    case 'mob':
      return `/mobs/${slug}`;

    case 'quest':
      return `/quests/${slug}`;

    case 'shop':
      return `/shops/${slug}`;

    case 'npc':
      return `/npcs/${slug}`;

    case 'news':
      return `/news/${slug}`;

    default:
      console.warn(`Unknown reference type: ${ref._type}`);
      return '#';
  }
}
