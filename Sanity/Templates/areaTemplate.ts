import { Template } from 'sanity'

interface AreaProps {
  areaType: string
}

export const areaTemplate: Template = {
  id: 'area-template',
  title: 'Area Template',
  schemaType: 'area',
  value: (props: AreaProps) => ({
    areaType: props?.areaType || '',
  }),
}
