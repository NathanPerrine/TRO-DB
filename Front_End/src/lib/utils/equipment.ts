import type { ArmorListItem, WeaponListItem, AccessoryListItem,ArmorDetail, WeaponDetail, AccessoryDetail } from '$lib/schemas/equipment.server';
export type EquipmentListItem = ArmorListItem | WeaponListItem | AccessoryListItem;
export type EquipmentDetailItem = ArmorDetail | WeaponDetail | AccessoryDetail;
export type Equipment = EquipmentListItem | EquipmentDetailItem;

export function isArmor<T extends Equipment>(equipment: T): equipment is Extract<T, { armorWeapon: 'armor' }> {
  return equipment != null && 'armorWeapon' in equipment && equipment.armorWeapon === 'armor';
}

export function isWeapon<T extends Equipment>(equipment: T): equipment is Extract<T, { armorWeapon: 'weapon' }> {
  return equipment != null && 'armorWeapon' in equipment && equipment.armorWeapon === 'weapon';
}

export function isAccessory<T extends Equipment>(equipment: T): equipment is Extract<T, { slot: unknown }> {
  return equipment != null && 'slot' in equipment;
}