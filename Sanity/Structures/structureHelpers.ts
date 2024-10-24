import {
  GiPotionBall,
  GiCrystalWand,
  GiCrystalBall,
  GiBrokenAxe,
  GiScrollUnfurled,
  GiAcidBlob,
  GiBossKey,
  GiCorkedTube,
  GiAncientRuins,
  GiDeathZone,
  GiNecklace,
  GiBeltArmor,
  GiDoorRingHandle,
  GiBackpack,
} from 'react-icons/gi'
import { FaHome, FaSlash } from 'react-icons/fa'

export const skills = [
  { title: 'Light Piercing', value: 'Light Piercing' },
  { title: 'Light One-Handed', value: 'Light One-Handed' },
  { title: 'Light Two-Handed', value: 'Light Two-Handed' },
  { title: 'Heavy Two-Handed', value: 'Heavy Two-Handed' },
  { title: 'Armorsmith', value: 'Armorsmith' },
  { title: 'Weaponsmith', value: 'Weaponsmith' },
  { title: 'Leatherworker', value: 'Leatherworker' },
  { title: 'Seamster', value: 'Seamster' },
  { title: 'Healing', value: 'Healing' },
  { title: 'Acrobatics', value: 'Acrobatics' },
  { title: 'Sorcery', value: 'Sorcery' },
  { title: 'Elementalism', value: 'Elementalism' },
  { title: 'Mysticism', value: 'Mysticism' },
  { title: 'Thaumaturgy', value: 'Thaumaturgy' },
  { title: 'Necromancy', value: 'Necromancy' },
  { title: 'Theurgism', value: 'Theurgism' },
  { title: 'Alchemy', value: 'Alchemy' },
  { title: 'Pickpocketing', value: 'Pickpocketing' },
  { title: 'Disarm Traps', value: 'Disarm Traps' },
  { title: 'Lockpicking', value: 'Lockpicking' },
  { title: 'Meditation', value: 'Meditation' },
  { title: 'Critical Strikes', value: 'Critical Strikes' },
  { title: 'Shield Usage', value: 'Shield Usage' },
]

export const magicSkills = [
  { title: 'Sorcery', value: 'sorcery' },
  { title: 'Elementalism', value: 'elementalism' },
  { title: 'Mysticism', value: 'mysticism' },
  { title: 'Thaumaturgy', value: 'thaumaturgy' },
  { title: 'Necromancy', value: 'necromancy' },
]

export const skillLevels = [
  { title: 'Familiar', value: 'familiar' },
  { title: 'Proficient', value: 'proficient' },
  { title: 'Expert', value: 'expert' },
  { title: 'Master', value: 'master' },
  { title: 'Grandmaster', value: 'grandmaster' },
  { title: 'Supreme-Master', value: 'supreme-master' },
]

export const itemTypes = [
  { title: 'Junk', icon: GiBrokenAxe, value: 'junk' },
  { title: 'Potions', icon: GiPotionBall, value: 'potion' },
  { title: 'Elixirs', icon: GiCorkedTube, value: 'elixir' },
  { title: 'Baubles', icon: GiAcidBlob, value: 'bauble' },
  { title: 'Scrolls', icon: GiScrollUnfurled, value: 'scroll' },
  { title: 'Wands', icon: GiCrystalWand, value: 'wand' },
  { title: 'Orbs', icon: GiCrystalBall, value: 'orb' },
  { title: 'Dungeon', icon: GiBossKey, value: 'dungeon' },
]

export const areaTypes = [
  { title: 'Dungeon', icon: GiAncientRuins, value: 'dungeon' },
  { title: 'Town', icon: FaHome, value: 'town' },
  { title: 'Zone', icon: GiDeathZone, value: 'zone' },
]

export const accessoryTypes = [
  { title: 'Amulet', icon: GiNecklace, value: 'amulet' },
  { title: 'Backpack', icon: GiBackpack, value: 'backpack' },
  { title: 'Baldric', icon: FaSlash, value: 'baldric' },
  { title: 'Belt', icon: GiBeltArmor, value: 'belt' },
  { title: 'Ring', icon: GiDoorRingHandle, value: 'ring' },
]

export const weaponTypes = [
  { title: 'Axe', value: 'axe', refId: '69ddf126-720f-49e7-adb8-208de7173f83' },
  {
    title: 'Club',
    value: 'club',
    refId: '172576e9-f5c9-4c63-80cb-53133999a884',
  },
  {
    title: 'Mace',
    value: 'mace',
    refId: '58b13bb9-4155-4a96-9445-3f8c99a640a5',
  },
  {
    title: 'Maul',
    value: 'maul',
    refId: 'a7604c90-59c9-4273-ba5e-9925ccff86ea',
  },
  {
    title: 'Two Handed Swords',
    value: 'two handed sword',
    refId: '2262dac8-0a83-47f4-93cd-dd1cee8214a4',
  },
  {
    title: 'Dagger',
    value: 'dagger',
    refId: '86cbef31-6ed8-49c5-b323-b9f7b56fd279',
  },
  {
    title: 'Throwing Dagger',
    value: 'throwing dagger',
    refId: '9457eefc-553e-421a-af1b-5ec8153d1af3',
  },
  {
    title: 'Fist',
    value: 'fist',
    refId: 'a84d3ca0-9ae3-4aae-b581-8cfda359414e',
  },
  {
    title: 'Long Sword',
    value: 'long sword',
    refId: '20ec3f4a-7941-49e2-8812-d6fce43e703b',
  },
  {
    title: 'Short Sword',
    value: 'short sword',
    refId: 'dc158b3c-d9fc-4471-8aef-1c21064dfc74',
  },
]

export const armorTypes = [
  { title: 'Helm', value: 'helm' },
  { title: 'Cowl', value: 'cowl' },
  { title: 'Chest', value: 'chest' },
  { title: 'Robe', value: 'robe' },
  { title: 'Skirt', value: 'skirt' },
  { title: 'Wrists', value: 'wrist' },
  { title: 'Legs', value: 'legs' },
  { title: 'Feet', value: 'feet' },
  { title: 'Shield', value: 'shield' },
]
