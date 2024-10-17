import { Template } from 'sanity'

interface SpellProps {
  spellSchool: string
  level: string
}

export const spellTemplate: Template = {
  id: 'spell-template',
  title: 'Spell Template',
  schemaType: 'book',
  value: (props: SpellProps) => ({
    spellSchool: props?.spellSchool || '',
    level: props?.level || '',
  }),
}
