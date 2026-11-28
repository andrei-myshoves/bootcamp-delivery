import { observer } from 'mobx-react-lite'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { CheckoutBreadcrumbs } from '@/components/checkout/CheckoutBreadcrumbs'
import { OrderReviewDetails } from '@/components/checkout/OrderReviewDetails'
import { StepProgress } from '@/components/checkout/StepProgress'
import { useOrderSummaryRows } from '@/components/checkout/useOrderSummaryRows'
import { Button } from '@/components/ui/button/Button'
import { useStore } from '@/hooks/useStore'
import { formatPrice } from '@/shared/lib/order-format'

const STEP = 7

const OrderReviewPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const summaryRows = useOrderSummaryRows({ includePayer: true })
    const price = deliveryCalculatorStore.selectedDeliveryOption?.price
    // The route guard guarantees a selected tariff; the fallback only covers an unexpected empty store.
    const totalValue = price === undefined ? t('recipient.notSelected') : formatPrice(price)

    const handleBack = () => {
        void navigate({ to: '/delivery-payment' })
    }

    const handleEdit = () => {
        void navigate({ to: '/recipient' })
    }

    const handleContinue = () => {
        // Отправка заявки и экран успеха появятся в BOO-50.
    }

    return (
        <div className="w-full lg:max-w-211">
            <div className="mb-6 flex items-center gap-4 lg:hidden">
                <Button
                    variant="wrapper"
                    className="bg-transparent"
                    size="icon"
                    aria-label={t('recipient.backAriaLabel')}
                    onClick={handleBack}
                >
                    <ChevronLeft className="size-6" />
                </Button>

                <h1 className="text-2xl leading-8 font-bold">{t('orderReview.title')}</h1>
            </div>

            <div className="flex flex-col gap-4 lg:mt-10 lg:gap-6">
                <CheckoutBreadcrumbs step={STEP} className="hidden lg:block" />

                <h1 className="hidden text-2xl leading-8 font-bold lg:block">{t('orderReview.title')}</h1>

                <StepProgress label={t('orderReview.step')} step={STEP} />

                <OrderReviewDetails
                    title={t('recipient.order')}
                    rows={summaryRows}
                    totalLabel={t('orderReview.total')}
                    totalValue={totalValue}
                    editLabel={t('orderReview.edit')}
                    onEdit={handleEdit}
                />

                <div className="mt-4 flex w-full gap-4 lg:mt-0">
                    <Button variant="secondary" size="large" className="hidden flex-1 lg:flex" onClick={handleBack}>
                        {t('recipient.back')}
                    </Button>

                    <Button variant="primary" size="large" className="flex-1" onClick={handleContinue}>
                        {t('recipient.continue')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default observer(OrderReviewPage)
