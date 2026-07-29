import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'wouter'

import { Calculator, History, User } from 'lucide-react'

import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'
import { cn } from '@/shared/lib/utils'

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    const { t } = useTranslation()
    const [location, navigate] = useLocation()

    const options = useMemo(
        () => [
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
        ],
        [t]
    )

    return (
        <footer className={cn('fixed inset-x-0 bottom-0 px-4 pt-2 pb-4 lg:hidden', className)}>
            <ButtonsGroup
                value={location}
                onValueChange={navigate}
                options={options}
                className="w-full rounded-full border border-border-hard bg-background shadow-sm"
                indicatorClassName="bg-green-500"
                activeButtonClassName="text-white"
                buttonClassName="flex flex-col items-center gap-1 py-2 text-xs font-medium"
            />
        </footer>
    )
}
