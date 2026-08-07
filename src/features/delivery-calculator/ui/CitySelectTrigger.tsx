import { ChevronDown } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

interface CitySelectTriggerProps {
    value?: string
    placeholder: string
    className?: string
    onClick?: () => void
}

export function CitySelectTrigger({ value, placeholder, className, onClick }: CitySelectTriggerProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex h-13 w-full items-center justify-between rounded-full border border-input bg-background px-3 py-2',
                className
            )}
        >
            <span className={cn('text-sm', value ? 'text-foreground' : 'text-input-placeholder')}>
                {value ?? placeholder}
            </span>

            <ChevronDown className="size-4 text-muted-foreground" />
        </button>
    )
}
