import { History, User } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { Logo } from './Logo'
import LogOutIcon from '@/shared/assets/LogOutIcon.svg'

import i18n from '@/app/i18n'

export function Header() {
    return (
        <header className="hidden items-center justify-between rounded-full border border-border bg-background p-3 lg:flex">
            <Logo />

            <div className="flex items-center">
                <Button variant="wrapper" size="icon" aria-label="History">
                    <History size={18} />
                </Button>

                <Button variant="wrapper" size="icon" className="ml-4" aria-label="Profile">
                    <User size={18} />
                </Button>

                <Button variant="primary" className="ml-6">
                    <span>{i18n.t('header.exit')}</span>

                    <img src={LogOutIcon} alt="" aria-hidden className="size-4" />
                </Button>
            </div>
        </header>
    )
}
