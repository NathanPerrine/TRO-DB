import React, { forwardRef } from 'react'
import { Stack, Text, TextInput } from '@sanity/ui'
import { set, StringInputProps, unset } from 'sanity'

// Type guard to check if validation is an array
function isValidationArray(
  value: unknown,
): value is { _rules: { flag: string; constraint?: number }[] }[] {
  return Array.isArray(value)
}

export const CharacterCountInput: React.FC<StringInputProps> = forwardRef<
  HTMLInputElement,
  StringInputProps
>((props, ref) => {
  const { elementProps, onChange, value = '', schemaType } = props

  // Extract max length from the validation array
  const maxLength = isValidationArray(schemaType.validation)
    ? schemaType.validation
        .flatMap((rule) => rule._rules)
        .find((r) => r.flag === 'max')?.constraint || 150
    : 150

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        ref={ref}
        value={value}
        onChange={handleChange}
      />
      <Text size={1} muted>
        {value.length} / {maxLength} characters
      </Text>
    </Stack>
  )
})

CharacterCountInput.displayName = 'CharacterCountInput'
