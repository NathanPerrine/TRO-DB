import { useMemo } from 'react'
import { type ReferenceInputProps, useFormValue } from 'sanity'

const categoryFilters: Record<string, string> = {
  accessories: `_type == 'accessory'`,
  armor: `_type == 'equipment' && armorWeapon == 'armor'`,
  weapons: `_type == 'equipment' && armorWeapon == 'weapon'`,
  dyes: `_type == 'item' && type == 'dye'`,
  potions: `_type == 'item' && type == 'potion'`,
  elixirs: `_type == 'item' && type == 'elixir'`,
  scrolls: `_type == 'item' && type == 'scroll'`,
  wands: `_type == 'item' && type == 'wand'`,
  orbs: `_type == 'item' && type == 'orb'`,
  spellsSorc: `_type == 'book' && bookType == 'spellbook' && skill == 'Sorcery'`,
  spellsEle: `_type == 'book' && bookType == 'spellbook' && skill == 'Elementalism'`,
  spellsMyst: `_type == 'book' && bookType == 'spellbook' && skill == 'Mysticism'`,
  spellsThaum: `_type == 'book' && bookType == 'spellbook' && skill == 'Thaumaturgy'`,
  spellsNecro: `_type == 'book' && bookType == 'spellbook' && skill == 'Necromancy'`,
  skillsWarrior: `_type == 'book' && bookType == 'skillbook' && (skill == 'Light One-Handed' || skill == 'Light Two-Handed' || skill == 'Heavy Two-Handed' || skill == 'Shield Usage' || skill == 'Healing')`,
  skillsThief: `_type == 'book' && bookType == 'skillbook' && (skill == 'Pickpocketing' || skill == 'Disarm Traps' || skill == 'Lockpicking' || skill == 'Acrobatics' || skill == 'Critical Strikes' || skill == 'Light Piercing' || skill == 'Light One-Handed' || skill == 'Shield Usage')`,
  skillsWizard: `_type == 'book' && bookType == 'skillbook' && (skill == 'Sorcery' || skill == 'Elementalism' || skill == 'Thaumaturgy' || skill == 'Necromancy' || skill == 'Mysticism' || skill == 'Meditation' || skill == 'Theurgism' || skill == 'Light Piercing')`,
  skillsCrafter: `_type == 'book' && bookType == 'skillbook' && (skill == 'Armorsmith' || skill == 'Weaponsmith' || skill == 'Leatherworker' || skill == 'Seamster')`,
}

export function ShopItemReference(props: ReferenceInputProps) {
  // path: ['inventory', {_key}, 'items', {_key}]
  // category is at: ['inventory', {_key}, 'category']
  const categoryPath = useMemo(
    () => [...props.path.slice(0, -2), 'category'],
    [props.path],
  )
  const category = useFormValue(categoryPath) as string | undefined

  const filter = category ? categoryFilters[category] || '' : ''

  const schemaType = useMemo(
    () => ({
      ...props.schemaType,
      options: {
        ...props.schemaType.options,
        filter,
      },
    }),
    [props.schemaType, filter],
  )

  return props.renderDefault({ ...props, schemaType })
}
