import { type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const tabBarItemVariants = cva(
    'flex w-full flex-col items-center justify-center gap-0.5 rounded-full py-2 text-xs font-medium transition-colors',
    {
        variants: {
            active: {
                true: 'bg-primary text-primary-foreground',
                false: 'text-foreground hover:bg-secondary',
            },
        },
        defaultVariants: {
            active: false,
        },
    }
)

interface TabBarItemProps extends VariantProps<typeof tabBarItemVariants> {
    icon: ReactNode
    label: string
}

export function TabBarItem({ icon, label, active }: TabBarItemProps) {
    return (
        <li className="flex-1 px-1">
            <button type="button" className={cn(tabBarItemVariants({ active }))}>
                {icon}

                <span>{label}</span>
            </button>
        </li>
    )
}
