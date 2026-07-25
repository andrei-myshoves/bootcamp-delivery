import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

interface ButtonsGroupOption {
    value: string
    label: ReactNode
    testId?: string
}

interface ButtonsGroupProps {
    value: string
    options: ButtonsGroupOption[]
    onValueChange: (value: string) => void
    className?: string
    buttonClassName?: string
    indicatorClassName?: string
}

function ButtonsGroup({
    value,
    options,
    onValueChange,
    className,
    buttonClassName,
    indicatorClassName,
}: ButtonsGroupProps) {
    const activeIndex = options.findIndex(option => option.value === value)

    return (
        <div className={cn('relative inline-flex w-full rounded-full bg-muted p-1', className)}>
            <div
                data-testid="ui-buttons-group-indicator"
                className={cn(
                    'absolute top-1 bottom-1 rounded-full shadow-sm transition-transform duration-300 ease-in-out',
                    indicatorClassName
                )}
                style={{
                    width: `calc((100% - 8px) / ${options.length})`,
                    transform: `translateX(${activeIndex * 100}%)`,
                }}
            />

            {options.map(option => {
                const isActive = option.value === value

                return (
                    <button
                        key={option.value}
                        data-testid={option.testId}
                        type="button"
                        onClick={() => onValueChange(option.value)}
                        className={cn(
                            'relative z-10 flex-1 rounded-full px-3 py-2 transition-colors duration-300',
                            isActive ? 'text-white' : 'text-foreground',
                            buttonClassName
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

export type { ButtonsGroupOption, ButtonsGroupProps }
