import { Template } from 'sanity'

interface AccessoryProps {
  slot: string
}

export const accessoryTemplate: Template = {
  id: 'accessory-template',
  title: 'Accessory Template',
  schemaType: 'accessory',
  value: (props: AccessoryProps) => {
    const accessoryProperties: Record<
      string,
      {
        description: string
        weight: number
        condition?: number
        armor?: number
      }
    > = {
      amulet: {
        description: 'You see an amulet of some sort.',
        weight: 0.5,
        condition: 1000,
      },
      belt: {
        description: 'You see a Belt.',
        weight: 0.5,
        armor: 10,
      },
      ring: {
        description: 'You see a ring of some sort.',
        weight: 0.2,
        condition: 50,
      },
    }

    const defaultItem = {
      descriptions:
        'Unknown item type. Please update description, weight, condition manually.',
      weight: 0,
      condition: 0,
    }

    const accessoryData = accessoryProperties[props.slot] || defaultItem

    if (props.slot === 'belt') {
      return {
        slot: props.slot,
        description: accessoryData.description,
        weight: accessoryData.weight,
        armor: accessoryData.armor,
      }
    } else {
      return {
        slot: props.slot,
        description: accessoryData.description,
        weight: accessoryData.weight,
        condition: accessoryData.condition,
      }
    }
  },
}
