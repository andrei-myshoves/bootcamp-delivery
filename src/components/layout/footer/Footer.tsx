import { cn } from '@/shared/lib/utils'
import { TabBar } from './TabBar'

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn(className)}>
            <TabBar />
        </footer>
    )
}
