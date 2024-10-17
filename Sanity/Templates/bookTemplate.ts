import { Template } from 'sanity'

interface BookProps {
  skill: string
  skillLevel: string
}

export const bookTemplate: Template = {
  id: 'book-template',
  title: 'Book Template',
  schemaType: 'book',
  value: (props: BookProps) => ({
    skill: props?.skill || '',
    skillLevel: props?.skillLevel || '',
  }),
}
