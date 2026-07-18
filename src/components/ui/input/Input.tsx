import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/src/shared/lib/utils'

const inputVariants = cva(
    'w-full rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            inputSize: {
                regular: 'h-10',
                large: 'h-13',
            },
        },

        defaultVariants: {
            inputSize: 'regular',
        },
    }
)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    label?: string
}

function Input({ className, inputSize, label, id, ...props }: InputProps) {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    return (
        <div className="flex w-full flex-col gap-1">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-foreground">
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={cn(
                    inputVariants({
                        inputSize,
                    }),
                    className
                )}
                {...props}
            />
        </div>
    )
}

export { Input, inputVariants }
export type { InputProps }
