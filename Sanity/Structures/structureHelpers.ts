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
} from 'react-icons/gi'
import { FaHome } from 'react-icons/fa'

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
