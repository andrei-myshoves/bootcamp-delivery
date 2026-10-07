import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { Calculator, History, User } from 'lucide-react'

import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'
import { cn } from '@/shared/lib/utils'
import { useStore } from '@/hooks/useStore'

interface FooterProps {
    className?: string
}

const getStepTitle = (pathname: string) => {
    switch (pathname) {
        case '/recipient':
            return 'Кто получатель?'
        case '/sender':
            return 'Кто отправитель?'
        case '/pickup-address':
            return 'Откуда забрать?'
        case '/delivery-address':
            return 'Куда доставить?'
        default:
            return ''
    }
}

export function Footer({ className }: FooterProps) {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { deliveryCalculatorStore } = useStore()

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

    if (pathname === '/deliverymethod') {
        return null
    }

    if (
        pathname === '/recipient' ||
        pathname === '/sender' ||
        pathname === '/pickup-address' ||
        pathname === '/delivery-address'
    ) {
        const totalPrice = deliveryCalculatorStore.selectedDeliveryOption?.price ?? 250

        const stepTitle = getStepTitle(pathname)

        return (
            <footer className={cn('fixed inset-x-0 bottom-0 z-(--z-footer) lg:hidden', className)}>
                <div className="rounded-t-[20px] bg-[#FBFBFB] p-4 shadow-[0_-1px_47.3px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between text-2xl leading-10 font-medium">
                        <span>Итого:</span>
                        <span>от {totalPrice} ₽</span>
                    </div>

                    <div className="mt-2 flex h-13.5 items-center justify-center rounded-full bg-[#F3F3F3] text-sm">
                        {stepTitle}
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className={cn('fixed inset-x-4 bottom-4 z-(--z-footer) lg:hidden', className)}>
            <ButtonsGroup
                value={pathname}
                onValueChange={value => navigate({ to: value })}
                options={options}
                className="border-border-hard bg-background w-full rounded-full border shadow-sm"
                indicatorClassName="bg-green-500"
                activeButtonClassName="text-white"
                buttonClassName="flex flex-col items-center gap-1 py-2 text-xs font-medium"
            />
        </footer>
    )
}
