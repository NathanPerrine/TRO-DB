import { Template } from 'sanity'

interface ItemProps {
  itemType: string
}
export const itemTemplate: Template = {
  id: 'item-template',
  title: 'Item Template',
  schemaType: 'item',
  value: (props: ItemProps) => {
    const itemProperties: Record<
      string,
      { description: string; weight: number; condition: number }
    > = {
      potion: {
        description: 'You see some type of potion.',
        weight: 0.2,
        condition: 200,
      },
      elixir: {
        description: 'You see some type of elixir.',
        weight: 0.2,
        condition: 200,
      },
      bauble: {
        description: 'You see some type of bauble.',
        weight: 0.2,
        condition: 200,
      },
      scroll: {
        description: 'It looks like some type of scroll.',
        weight: 0.2,
        condition: 300,
      },
      wand: {
        description: 'You see some kind of wand.',
        weight: 0.5,
        condition: 500,
      },
      orb: {
        description: 'You see some kind of orb.',
        weight: 1.5,
        condition: 500,
      },
    }

    const defaultItem = {
      description:
        'Unknown item type. Please update description, weight, condition manually.',
      weight: 0,
      condition: 0,
    }

    const itemData = itemProperties[props.itemType] || defaultItem

    return {
      type: props.itemType,
      description: itemData.description,
      weight: itemData.weight,
      condition: itemData.condition,
    }
  },
}
