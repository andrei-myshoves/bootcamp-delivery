import * as React from 'react'

import { cn } from '@/shared/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn('flex flex-col gap-6 rounded-3xl border border-border-hard bg-background p-8', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export { Card }
export type { CardProps }
