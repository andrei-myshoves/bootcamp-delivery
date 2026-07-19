import { cn } from '@/shared/lib/utils'

interface ButtonsGroupOption {
    value: string
    label: string
}

interface ButtonsGroupProps {
    value: string
    options: ButtonsGroupOption[]
    onValueChange: (value: string) => void
    className?: string
}

function ButtonsGroup({ value, options, onValueChange, className }: ButtonsGroupProps) {
    const activeIndex = options.findIndex(option => option.value === value)

    return (
        <div className={cn('relative inline-flex w-full rounded-full bg-muted p-1', className)}>
            <div
                data-testid="ui-buttons-group-indicator"
                className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out"
                style={{
                    width: `calc((100% - 8px) / ${options.length})`,
                    transform: `translateX(${activeIndex * 100}%)`,
                }}
            />

            {options.map(option => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onValueChange(option.value)}
                    className={
                        'relative  flex-1 rounded-full px-3 py-2 text-lg font-semibold transition-colors duration-300'
                    }
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export { ButtonsGroup }
export type { ButtonsGroupOption, ButtonsGroupProps }
