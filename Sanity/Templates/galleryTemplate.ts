import { Template } from 'sanity'

interface GalleryProps {
  category: string
}

export const galleryTemplate: Template = {
  id: 'gallery-template',
  title: 'Gallery Template',
  schemaType: 'gallery',
  value: (props: GalleryProps) => {
    return {
      category: props.category,
    }
  },
}
