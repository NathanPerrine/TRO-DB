import type { PickedArmor, PickedWeapon } from '$lib';
import type { PlayerClassType } from './types';

// Class attribute mappings - equipment must match ANY of these (OR logic)
// Uses partial matching: e.g., '+ SR' matches '+ SR Thaum', 'Immo' matches '+ Fire Immo'
export const CLASS_ATTRIBUTES: Record<Exclude<PlayerClassType, null>, string[]> = {
  Melee:        ['+ MDM', '+ STR', '+ DEX', 'Immo'],
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
  equipmentList: (PickedArmor | PickedWeapon)[],
  playerClass: PlayerClassType
): (PickedArmor | PickedWeapon)[] {
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
  equipmentList: (PickedArmor | PickedWeapon)[]
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
  equipmentList: (PickedArmor | PickedWeapon)[],
  field: 'rarity' | 'identifiedName' | 'levelRequirement',
  direction: 'asc' | 'desc'
): (PickedArmor | PickedWeapon)[] {
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
