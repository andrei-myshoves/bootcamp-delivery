import { Calculator, History, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'wouter'

import { TabBarItem } from './TabBarItem'

export function TabBar() {
    const { t } = useTranslation()

    const [location, navigate] = useLocation()

    return (
        <nav
            aria-label="Bottom navigation"
            className="rounded-full border border-border-hard bg-background p-1 shadow-sm"
        >
            <ul className="flex h-[50px] items-center gap-0.5">
                <TabBarItem
                    icon={<Calculator size={22} />}
                    label={t('footer.calculate')}
                    active={location === '/'}
                    onClick={() => navigate('/')}
                />

                <TabBarItem
                    icon={<History size={22} />}
                    label={t('footer.history')}
                    active={location === '/history'}
                    onClick={() => navigate('/history')}
                />

                <TabBarItem
                    icon={<User size={22} />}
                    label={t('footer.profile')}
                    active={location === '/profile'}
                    onClick={() => navigate('/profile')}
                />
            </ul>
        </nav>
    )
}
