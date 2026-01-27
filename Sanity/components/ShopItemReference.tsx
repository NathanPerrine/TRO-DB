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
}

export function ShopItemReference(props: ReferenceInputProps) {
  // path: ['inventory', {_key}, 'items', {_key}]
  // category is at: ['inventory', {_key}, 'category']
  const categoryPath = useMemo(
    () => [...props.path.slice(0, -2), 'category'],
    [props.path]
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
    [props.schemaType, filter]
  )

  return props.renderDefault({ ...props, schemaType })
}
