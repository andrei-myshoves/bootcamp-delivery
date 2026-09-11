import * as React from 'react'

import { cn } from '@/shared/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn('border-border-hard bg-background flex flex-col rounded-3xl border p-8', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export { Card }
export type { CardProps }
