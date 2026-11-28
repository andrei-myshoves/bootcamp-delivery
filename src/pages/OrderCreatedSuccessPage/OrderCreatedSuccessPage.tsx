import { observer } from 'mobx-react-lite'
import { X } from 'lucide-react'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { OrderDetailItem, OrderDetailsList, OrderTotal } from '@/components/checkout/OrderDetailsList'
import { buildOrderSummaryRows } from '@/components/checkout/useOrderSummaryRows'
import { Button } from '@/components/ui/button/Button'
import { useStore } from '@/hooks/useStore'
import SuccessIconDesktop from '@/shared/assets/SuccessIconDesktop.svg'
import SuccessIconMobile from '@/shared/assets/SuccessIconMobile.svg'
import { formatPrice } from '@/shared/lib/order-format'

/**
 * «Заявка отправлена»: shown after the backend confirmed a created order. Desktop shows the order details and
 * two actions; mobile is a separate, vertically centred composition without details (Figma).
 */
const OrderCreatedSuccessPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { lastOrder } = deliveryCalculatorStore

    // The route guard already redirects a visit without a created order; this covers losing it while on the page.
    if (!lastOrder) {
        return <Navigate to="/" replace />
    }

    const rows = buildOrderSummaryRows(lastOrder, t, { includePayer: true })

    // Order status needs authorization (GET /delivery/orders); until it exists the status buttons open the profile.
    const handleStatusClick = () => {
        void navigate({ to: '/profile' })
    }

    const handleHomeClick = () => {
        void navigate({ to: '/' })
    }

    return (
        // On mobile the screen fills the viewport minus the Layout paddings (pt-4 + pb-24) to centre the content.
        <section className="flex min-h-[calc(100svh-7rem)] w-full flex-col lg:mt-10 lg:min-h-0">
            <div className="flex justify-end lg:hidden">
                <Button
                    variant="wrapper"
                    className="bg-transparent"
                    size="icon"
                    aria-label={t('orderCreatedSuccess.closeAriaLabel')}
                    onClick={handleHomeClick}
                >
                    <X className="size-6" />
                </Button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10 pb-4 lg:items-start lg:justify-start lg:gap-6 lg:pb-0">
                <header className="flex w-full flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                    {/* Figma exports the mobile icon as an 80px frame (56px circle with 12px padding), desktop as 56px. */}
                    <img src={SuccessIconMobile} alt="" aria-hidden className="size-20 lg:hidden" />
                    <img src={SuccessIconDesktop} alt="" aria-hidden className="hidden size-14 lg:block" />

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl leading-8 font-bold">{t('orderCreatedSuccess.title')}</h1>
                        <p className="text-base leading-6 font-medium">{t('orderCreatedSuccess.description')}</p>
                    </div>
                </header>

                <div data-testid="order-created-success-details" className="hidden w-full flex-col gap-4 lg:flex">
                    <h2 className="text-2xl leading-8 font-bold">{t('recipient.order')}</h2>

                    <dl>
                        <OrderDetailItem label={t('orderCreatedSuccess.orderNumber')} value={lastOrder.id} />
                    </dl>

                    {/* Figma: columns as wide as their content, 40px apart. */}
                    <OrderDetailsList rows={rows} className="lg:grid-cols-[repeat(2,max-content)]" />

                    <hr className="bg-secondary h-px rounded-full border-0" />

                    <OrderTotal label={t('orderReview.total')} value={formatPrice(lastOrder.price)} />

                    <p className="text-muted-foreground text-base leading-6 font-medium">
                        {t('orderCreatedSuccess.smsNote')}
                    </p>
                </div>

                <div className="flex w-full flex-col gap-4 lg:w-99.5">
                    <Button variant="secondary" size="large" className="hidden lg:flex" onClick={handleStatusClick}>
                        {t('orderCreatedSuccess.status')}
                    </Button>

                    <Button size="large" className="lg:hidden" onClick={handleStatusClick}>
                        {t('orderCreatedSuccess.viewStatus')}
                    </Button>

                    <Button size="large" className="hidden lg:flex" onClick={handleHomeClick}>
                        {t('orderCreatedSuccess.home')}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default observer(OrderCreatedSuccessPage)
