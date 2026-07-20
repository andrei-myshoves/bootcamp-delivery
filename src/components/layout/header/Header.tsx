import { History, User } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { Logo } from './Logo'
import LogOutIcon from '@/shared/assets/LogOutIcon.svg'

export function Header() {
    return (
        <header className="hidden items-center justify-between rounded-full border border-border bg-background p-3 lg:flex">
            <Logo />

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
                    aria-label="History"
                >
                    <History size={18} />
                </button>

                <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
                    aria-label="Profile"
                >
                    <User size={18} />
                </button>

                <Button variant="primary">
                    <span>Выйти</span>
                    <img src={LogOutIcon} alt="" aria-hidden className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
