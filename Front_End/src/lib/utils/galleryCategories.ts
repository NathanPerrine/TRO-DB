export interface GalleryGroup {
  value: string;
  label: string;
}

export interface GallerySubCategory {
  value: string;
  label: string;
  group: string;
}

export const galleryGroups: GalleryGroup[] = [
  { value: 'all',         label: 'All' },
  { value: 'equipment',   label: 'Equipment' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'dyes',        label: 'Dyes' },
  { value: 'screenshots', label: 'Screenshots' },
  { value: 'other',       label: 'Other' }
]

export const gallerySubCategories: GallerySubCategory[] = [
  // Equipment slots — values must match Sanity category field exactly
  { value: 'weapons',   label: 'Weapons', group: 'equipment' },
  { value: 'helm',      label: 'Helm', group: 'equipment' },
  { value: 'cowl',      label: 'Cowl', group: 'equipment' },
  { value: 'chest',     label: 'Chest', group: 'equipment' },
  { value: 'robe',      label: 'Robe', group: 'equipment' },
  { value: 'skirt',     label: 'Skirt', group: 'equipment' },
  { value: 'wrists',    label: 'Wrists', group: 'equipment' },
  { value: 'legs',      label: 'Legs', group: 'equipment' },
  { value: 'feet',      label: 'Feet', group: 'equipment' },
  { value: 'shield',    label: 'Shield', group: 'equipment' },
  // Accessories
  { value: 'amulet',    label: 'Amulet', group: 'accessories' },
  { value: 'backpack',  label: 'Backpack', group: 'accessories' },
  { value: 'baldric',   label: 'Baldric', group: 'accessories' },
  { value: 'belt',      label: 'Belt', group: 'accessories' },
  { value: 'ring',      label: 'Ring', group: 'accessories' }
];

const equipmentValues = gallerySubCategories
  .filter((c) => c.group === 'equipment')
  .map((c) => c.value);

const accessoryValues = gallerySubCategories
  .filter((c) => c.group === 'accessories')
  .map((c) => c.value);

const allValues = [...equipmentValues, ...accessoryValues, 'dyes', 'screenshots', 'other'];

/**
 * Given a category URL param, return the list of Sanity `category` values to query.
 * Examples:
 *   "all"         → all category values
 *   "equipment"   → all equipment slot values
 *   "helm"        → ["helm"]
 *   "dyes"        → ["dyes"]
 */
export function resolveCategoryFilter(category: string): string[] {
  if (category === 'all') {
    return allValues;
  } else if (category === 'equipment') {
    return equipmentValues;
  } else if (category === 'accessories') {
    return accessoryValues;
  } else {
    return [category]
  }
}

/**
 * Given a category URL param, return which top-level group it belongs to.
 * Used to highlight the correct group pill in the filter bar.
 * Examples:
 *   "helm"    → "equipment"
 *   "ring"    → "accessories"
 *   "dyes"    → "dyes"
 *   "all"     → "all"
 */
export function resolveActiveGroup(category: string): string {
  if (accessoryValues.includes(category)) {
    return "accessories";
  }
  else if (equipmentValues.includes(category)) {
    return "equipment"
  }
  else {
    return category
  }
}