import { useTranslation } from 'react-i18next'
import { useLocation } from 'wouter'

import { Calculator, History, User } from 'lucide-react'

import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'

export function Footer() {
    const { t } = useTranslation()

    const [location, navigate] = useLocation()

    return (
        <footer className="fixed inset-x-0 bottom-0 border-t border-border bg-background lg:hidden">
            <ButtonsGroup
                value={location}
                onValueChange={navigate}
                className="rounded-full border border-border-hard bg-background shadow-sm"
                indicatorClassName="bg-green-500"
                buttonClassName="flex flex-col items-center gap-1 py-2 text-xs font-medium"
                options={[
                    {
                        value: '/',
                        testId: 'footer-tab-calculate',
                        label: (
                            <>
                                <Calculator size={20} />
                                <span>{t('footer.calculate')}</span>
                            </>
                        ),
                    },
                    {
                        value: '/history',
                        testId: 'footer-tab-history',
                        label: (
                            <>
                                <History size={20} />
                                <span>{t('footer.history')}</span>
                            </>
                        ),
                    },
                    {
                        value: '/profile',
                        testId: 'footer-tab-profile',
                        label: (
                            <>
                                <User size={20} />
                                <span>{t('footer.profile')}</span>
                            </>
                        ),
                    },
                ]}
            />
        </footer>
    )
}
