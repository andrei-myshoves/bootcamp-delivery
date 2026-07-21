import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:opacity-90',

                secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',

                wrapper: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            },

            size: {
                icon: 'size-8 p-0',
                regular: 'h-8 px-4 text-sm',
                large: 'h-13 px-6 text-sm',
            },
        },

        defaultVariants: {
            variant: 'primary',
            size: 'regular',
        },
    }
)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className
            )}
            {...props}
        />
    )
}

export type { ButtonProps }
export { Button, buttonVariants }
