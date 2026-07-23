import { Calculator, History, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { TabBarItem } from './TabBarItem'

export function TabBar() {
    const { t } = useTranslation()

    return (
        <nav aria-label="Bottom navigation">
            <ul className="flex items-center">
                <TabBarItem icon={<Calculator size={24} />} label={t('footer.calculate')} active />

                <TabBarItem icon={<History size={24} />} label={t('footer.history')} />

                <TabBarItem icon={<User size={24} />} label={t('footer.profile')} />
            </ul>
        </nav>
    )
}
