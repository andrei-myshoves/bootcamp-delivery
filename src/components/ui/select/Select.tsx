import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './SelectPrimitive'

interface Option {
    value: string
    label: string
}

interface UiSelectProps {
    placeholder?: string
    options: Option[]
    defaultValue?: string
    size?: 'default' | 'form'
}

export function UiSelect({ placeholder, options, size = 'default' }: UiSelectProps) {
    return (
        <Select>
            <SelectTrigger size={size}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
