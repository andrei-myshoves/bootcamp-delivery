import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

interface Option {
  value: string
  label: string
}

interface UiSelectProps {
  placeholder?: string
  options: Option[]
	defaultValue?: string
}

export function UiSelect({
  placeholder,
  options,
}: UiSelectProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}