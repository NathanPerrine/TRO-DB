import type {
  ArmorListItem,
  WeaponListItem,
  AccessoryListItem,
  ArmorDetail,
  WeaponDetail,
  AccessoryDetail
} from '$lib/schemas/equipment.server';
import type { PlayerClassType } from './types';

// Union type for all equipment list items
type EquipmentListItem = ArmorListItem | WeaponListItem | AccessoryListItem;

// Union type for all equipment detail items
type EquipmentDetail = ArmorDetail | WeaponDetail | AccessoryDetail;

// Union type for both list items and detail items
type Equipment = EquipmentListItem | EquipmentDetail;

// Class attribute mappings - equipment must match ANY of these (OR logic)
// Uses partial matching: e.g., '+ SR' matches '+ SR Thaum', 'Immo' matches '+ Fire Immo'
export const CLASS_ATTRIBUTES: Record<Exclude<PlayerClassType, null>, string[]> = {
  Melee:        ['+ MDM', 'STR', 'DEX', 'Dodge', 'Immo'],
  Tank:         ['+ SR', 'Immo', 'Resist', '+ Regen', 'DMP'],
  Thaumaturge:  ['+ MP', '+ SDM Thaum', '+ SR Thaum'],
  Sorcerer:     ['+ MP', '+ SDM Sorc', '+ SR Sorc'],
  Elementalist: ['+ MP', '+ SDM Elem', '+ SR Elem'],
  Mystic:       ['+ MP', '+ SDM Myst', '+ SR Myst'],
  Necromancer:  ['+ MP', '+ SDM Necro', '+ SR Necro'],
};

/**
 * Normalize attributes by stripping numeric values
 * e.g., "+5 MDM" -> "+ MDM"
 */
export function normalizeAttributes(attr: string): string {
  // Match pattern: starts with +/-, followed by number, then text
  const match = attr.match(/^([+-])\s*\d+\s+(.+)$/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  } else {
    return attr;
  }
}

/**
 * Filter equipment by player class
 * Returns equipment that has ANY attribute matching the class (OR logic)
 * Uses partial matching to support patterns like '+ SR' matching '+ SR Thaum'
 */
export function filterByClass(
  equipmentList: EquipmentListItem[],
  playerClass: PlayerClassType
): EquipmentListItem[] {
  if (!playerClass) return equipmentList;

  const classAttributes = CLASS_ATTRIBUTES[playerClass];
  if (!classAttributes) return equipmentList;

  return equipmentList.filter((equipment) => {
    if (!equipment.attributes || equipment.attributes.length === 0) return false;

    // Check if equipment has ANY of the class attributes (using partial matching)
    return equipment.attributes.some((attr) => {
      const normalized = normalizeAttributes(attr);
      return classAttributes.some(pattern => normalized.includes(pattern));
    });
  });
}

/**
 * Extract unique normalized attribute tags from equipment list
 */
export function extractAttributeTags(
  equipmentList: EquipmentListItem[]
): string[] {
  const tags = new Set<string>();

  equipmentList.forEach((equipment) => {
    if (equipment.attributes) {
      equipment.attributes.forEach((attr) => {
        tags.add(normalizeAttributes(attr));
      });
    }
  });

  return Array.from(tags).sort();
}

/**
 * Sort equipment by field and direction
 */
export function sortEquipment(
  equipmentList: EquipmentListItem[],
  field: 'rarity' | 'identifiedName' | 'levelRequirement',
  direction: 'asc' | 'desc'
): EquipmentListItem[] {
  return [...equipmentList].sort((a, b) => {
    const fieldA = a[field] ?? '';
    const fieldB = b[field] ?? '';

    const comparison =
      typeof fieldA === 'string' && typeof fieldB === 'string'
        ? fieldA.localeCompare(fieldB)
        : (fieldA as number) > (fieldB as number)
          ? 1
          : -1;

    return direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Type guard to check if equipment is armor
 * Works with both list items and detail items
 */
export function isArmor<T extends Equipment>(
  equipment: T
): equipment is Extract<T, { armorWeapon: 'armor' }> {
  return equipment != null && 'armorWeapon' in equipment && equipment.armorWeapon === 'armor';
}

/**
 * Type guard to check if equipment is a weapon
 * Works with both list items and detail items
 */
export function isWeapon<T extends Equipment>(
  equipment: T
): equipment is Extract<T, { armorWeapon: 'weapon' }> {
  return equipment != null && 'armorWeapon' in equipment && equipment.armorWeapon === 'weapon';
}

/**
 * Type guard to check if equipment is an accessory
 * Works with both list items and detail items
 */
export function isAccessory<T extends Equipment>(
  equipment: T
): equipment is Extract<T, { slot: unknown }> {
  return equipment != null && 'slot' in equipment;
}
