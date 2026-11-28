import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button/Button'
import SuccessIconDesktop from '@/shared/assets/SuccessIconDesktop.svg'
import SuccessIconMobile from '@/shared/assets/SuccessIconMobile.svg'

import { OrderDetailItem, OrderDetailsList, OrderTotal } from './OrderDetailsList'
import type { OrderSummaryRow } from './OrderSummaryCard'

interface OrderSuccessProps {
    orderNumber: string
    /** Order rows in Figma order; shown on desktop only. */
    rows: OrderSummaryRow[]
    totalValue: string
    /** «Статус заявки» (desktop) and «Посмотреть статус» (mobile). */
    onStatusClick: () => void
    /** «На главную» (desktop) and the close cross (mobile). */
    onHomeClick: () => void
}

/**
 * «Заявка отправлена» screen. Desktop shows the order details and two actions; mobile is a separate,
 * vertically centred composition without details (Figma).
 */
export function OrderSuccess({ orderNumber, rows, totalValue, onStatusClick, onHomeClick }: OrderSuccessProps) {
    const { t } = useTranslation()

    return (
        // On mobile the screen fills the viewport minus the Layout paddings (pt-4 + pb-24) to centre the content.
        <section className="flex min-h-[calc(100svh-7rem)] w-full flex-col lg:mt-10 lg:min-h-0">
            <div className="flex justify-end lg:hidden">
                <Button
                    variant="wrapper"
                    className="bg-transparent"
                    size="icon"
                    aria-label={t('orderSuccess.closeAriaLabel')}
                    onClick={onHomeClick}
                >
                    <X className="size-6" />
                </Button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10 pb-4 lg:items-start lg:justify-start lg:gap-6 lg:pb-0">
                <header className="flex w-full flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                    <img src={SuccessIconMobile} alt="" aria-hidden className="size-20 lg:hidden" />
                    <img src={SuccessIconDesktop} alt="" aria-hidden className="hidden size-14 lg:block" />

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl leading-8 font-bold">{t('orderSuccess.title')}</h1>
                        <p className="text-base leading-6 font-medium">{t('orderSuccess.description')}</p>
                    </div>
                </header>

                <div data-testid="order-success-details" className="hidden w-full flex-col gap-4 lg:flex">
                    <h2 className="text-2xl leading-8 font-bold">{t('recipient.order')}</h2>

                    <dl>
                        <OrderDetailItem label={t('orderSuccess.orderNumber')} value={orderNumber} />
                    </dl>

                    {/* Figma: columns as wide as their content, 40px apart. */}
                    <OrderDetailsList rows={rows} className="lg:grid-cols-[repeat(2,max-content)]" />

                    <hr className="bg-secondary h-px rounded-full border-0" />

                    <OrderTotal label={t('orderReview.total')} value={totalValue} />

                    <p className="text-muted-foreground text-base leading-6 font-medium">{t('orderSuccess.smsNote')}</p>
                </div>

                <div className="flex w-full flex-col gap-4 lg:w-99.5">
                    <Button variant="secondary" size="large" className="hidden lg:flex" onClick={onStatusClick}>
                        {t('orderSuccess.status')}
                    </Button>

                    <Button variant="primary" size="large" className="lg:hidden" onClick={onStatusClick}>
                        {t('orderSuccess.viewStatus')}
                    </Button>

                    <Button variant="primary" size="large" className="hidden lg:flex" onClick={onHomeClick}>
                        {t('orderSuccess.home')}
                    </Button>
                </div>
            </div>
        </section>
    )
}
