import { History, User } from 'lucide-react'
import { type ReactNode } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Logo } from './Logo'
import LogOutIcon from '@/shared/assets/LogOutIcon.svg'

import i18n from '@/app/i18n'
import { cn } from '@/shared/lib/utils'
interface HeaderProps {
    className?: string
    children?: ReactNode
}

export function Header({ className }: HeaderProps) {
    return (
        <header
            className={cn(
                'hidden items-center justify-between rounded-full border border-border-hard bg-background p-3 lg:flex',
                className
            )}
        >
            <Logo />

            <div className="flex items-center">
                <Button variant="wrapper" size="icon" aria-label="History">
                    <History size={18} />
                </Button>

                <Button variant="wrapper" size="icon" className="ml-4" aria-label="Profile">
                    <User size={18} />
                </Button>

                <Button variant="primary" aria-label="Logout" className="ml-6">
                    <span>{i18n.t('header.exit')}</span>

                    <img src={LogOutIcon} alt="" aria-hidden className="size-4" />
                </Button>
            </div>
        </header>
    )
}
