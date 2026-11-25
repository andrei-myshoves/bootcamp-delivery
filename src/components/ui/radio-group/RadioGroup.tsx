import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>
type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

function RadioGroup({ className, ...props }: RadioGroupProps) {
    return <RadioGroupPrimitive.Root className={cn('flex flex-col', className)} {...props} />
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                'border-border bg-background flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors',
                'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator>
                <CheckIcon className="size-4" aria-hidden />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }
