import React, { useCallback, useRef } from 'react'
import { Stack, TextArea, TextInput } from '@sanity/ui'
import {
  PatchEvent,
  set,
  unset,
  StringInputProps,
  useFormValue,
  NumberInputProps,
} from 'sanity'

export const DescriptionHelper: React.FC<StringInputProps> = (props) => {
  const { elementProps, onChange, value = '' } = props
  const slot = useFormValue(['slot']) as string | undefined
  const prevSlot = useRef<string | undefined>(slot)

  React.useEffect(() => {
    if (prevSlot.current !== slot) {
      if (slot === 'amulet') {
        onChange(PatchEvent.from(set('You see an amulet of some sort.')))
      } else if (slot === 'belt') {
        onChange(PatchEvent.from(set('You see a belt.')))
      } else if (slot === 'ring') {
        onChange(PatchEvent.from(set('You see a ring of some sort.')))
      }
      prevSlot.current = slot
    }
  }, [slot, onChange])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(
        nextValue ? PatchEvent.from(set(nextValue)) : PatchEvent.from(unset()),
      )
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <span>
        {
          "Note: This field will update automatically if the accessory 'slot' is updated."
        }
      </span>
      <TextArea
        style={{ resize: 'vertical' }}
        {...elementProps}
        rows={4}
        onChange={handleChange}
        value={value}
      />
    </Stack>
  )
}

export const WeightHelper: React.FC<NumberInputProps> = (props) => {
  const { elementProps, onChange, value = 0 } = props
  const slot = useFormValue(['slot']) as string | undefined
  const prevSlot = useRef<string | undefined>(slot)

  React.useEffect(() => {
    if (prevSlot.current !== slot) {
      if (slot === 'amulet' || slot === 'belt') {
        onChange(PatchEvent.from(set(0.5)))
      } else if (slot === 'ring') {
        onChange(PatchEvent.from(set(0.2)))
      }
      prevSlot.current = slot
    }
  }, [slot, onChange])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.currentTarget.value)
      onChange(
        isNaN(nextValue)
          ? PatchEvent.from(unset())
          : PatchEvent.from(set(nextValue)),
      )
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <span>
        {
          "Note: This field will update automatically if the accessory 'slot' is updated."
        }
      </span>
      <TextInput
        {...elementProps}
        type="number"
        onChange={handleChange}
        value={value}
      />
    </Stack>
  )
}

export const ConditionHelper: React.FC<NumberInputProps> = (props) => {
  const { elementProps, onChange, value = 0 } = props
  const slot = useFormValue(['slot']) as string | undefined
  const prevSlot = useRef<string | undefined>(slot)

  React.useEffect(() => {
    if (prevSlot.current !== slot) {
      if (slot === 'amulet') {
        onChange(PatchEvent.from(set(1000)))
      } else if (slot === 'belt') {
        onChange(PatchEvent.from(unset()))
      } else if (slot === 'ring') {
        onChange(PatchEvent.from(set(50)))
      }
      prevSlot.current = slot
    }
  }, [slot, onChange])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.currentTarget.value)
      onChange(
        isNaN(nextValue)
          ? PatchEvent.from(unset())
          : PatchEvent.from(set(nextValue)),
      )
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <span>
        {
          "Note: This field will update automatically if the accessory 'slot' is updated."
        }
      </span>
      <TextInput
        {...elementProps}
        type="number"
        onChange={handleChange}
        value={value}
      />
    </Stack>
  )
}
