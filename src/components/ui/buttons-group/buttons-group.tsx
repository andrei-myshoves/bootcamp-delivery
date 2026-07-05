import * as React from 'react'
import { cn } from '@/shared/lib/utils'

interface ButtonsGroupOption {
    value: string
    label: string
}

type ButtonsGroupProps = React.ComponentProps<'div'> & {
    value: string
    options: ButtonsGroupOption[]
    onValueChange: (value: string) => void
}

function ButtonsGroup({ value, options, onValueChange, className }: ButtonsGroupProps) {
    return (
        <div className={cn('inline-flex rounded-full bg-muted p-1', className)}>
            {options.map(option => {
                const isActive = option.value === value

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onValueChange(option.value)}
                        className={cn(
                            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                            isActive
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50'
                        )}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}

export { ButtonsGroup }
export type { ButtonsGroupProps, ButtonsGroupOption }
