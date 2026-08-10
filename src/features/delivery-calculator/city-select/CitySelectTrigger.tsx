import { ChevronDown } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
interface CitySelectTriggerProps {
    value?: string
    placeholder: string
    className?: string
    selected?: boolean
    onClick?: () => void
}

export function CitySelectTrigger({ value, placeholder, selected = false, onClick }: CitySelectTriggerProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between rounded-full border border-input px-3 py-3.5"
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn('h-4 w-4 rounded-full border-2', selected ? 'border-green-500' : 'border-black')}
                />

                <span className={cn(value ? 'text-foreground' : 'text-muted-foreground')}>{value ?? placeholder}</span>
            </div>

            <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
    )
}
