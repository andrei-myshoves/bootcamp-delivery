import { observer } from 'mobx-react-lite'
import { ChevronLeft } from 'lucide-react'
import { useId } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { CheckoutBreadcrumbs } from '@/components/checkout/CheckoutBreadcrumbs'
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard'
import { StepProgress } from '@/components/checkout/StepProgress'
import { useOrderSummaryRows } from '@/components/checkout/useOrderSummaryRows'
import { Button } from '@/components/ui/button/Button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group/RadioGroup'
import { useStore } from '@/hooks/useStore'
import { isPayer, type Payer, PAYERS } from '@/store/DeliveryCalculatorStore'

const STEP = 6

const PAYER_LABEL_KEYS: Record<Payer, string> = {
    receiver: 'deliveryPayment.payerReceiver',
    sender: 'deliveryPayment.payerSender',
}

const DeliveryPaymentPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const fieldIdPrefix = useId()
    const whoPaysId = useId()

    const { payer } = deliveryCalculatorStore
    const baseSummaryRows = useOrderSummaryRows()

    const summaryRows = [...baseSummaryRows, { label: t('deliveryPayment.whoPays'), value: t(PAYER_LABEL_KEYS[payer]) }]

    const handleBack = () => {
        void navigate({ to: '/delivery-address' })
    }

    const handlePayerChange = (value: string) => {
        if (isPayer(value)) {
            deliveryCalculatorStore.setPayer(value)
        }
    }

    const handleContinue = () => {
        // Persist the payer even if the preselected value was never changed.
        deliveryCalculatorStore.setPayer(payer)

        // Переход на шаг «Проверка данных» появится вместе с этой страницей (BOO-49).
    }

    return (
        // pb-14 keeps the last controls above the fixed mobile footer, which is taller than the layout's bottom padding.
        <div className="w-full pb-14 lg:pb-0">
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

                <h1 className="text-2xl leading-8 font-bold">{t('deliveryPayment.title')}</h1>
            </div>

            <div className="lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_482px] lg:gap-4">
                {/* On desktop the column stretches to the order card height and the actions sit at its bottom (Figma). */}
                <div className="flex flex-col gap-4 lg:justify-between lg:gap-6">
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <CheckoutBreadcrumbs step={STEP} className="hidden lg:block" />

                        <h1 className="hidden text-2xl leading-8 font-bold lg:block">{t('deliveryPayment.title')}</h1>

                        <StepProgress label={t('deliveryPayment.step')} step={STEP} />

                        <p id={whoPaysId} className="text-lg leading-6.5">
                            {t('deliveryPayment.whoPays')}
                        </p>

                        <RadioGroup
                            value={payer}
                            onValueChange={handlePayerChange}
                            aria-labelledby={whoPaysId}
                            className="gap-3 lg:gap-4"
                        >
                            {PAYERS.map(value => {
                                const optionId = `${fieldIdPrefix}-${value}`

                                return (
                                    <div key={value} className="flex items-center gap-2 lg:gap-4">
                                        <RadioGroupItem id={optionId} value={value} />

                                        <label
                                            htmlFor={optionId}
                                            className="cursor-pointer text-base leading-6 font-medium"
                                        >
                                            {t(PAYER_LABEL_KEYS[value])}
                                        </label>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </div>

                    <div className="mt-4 flex w-full gap-4 lg:mt-0">
                        <Button variant="secondary" size="large" className="hidden flex-1 lg:flex" onClick={handleBack}>
                            {t('recipient.back')}
                        </Button>

                        <Button variant="primary" size="large" className="flex-1" onClick={handleContinue}>
                            {t('recipient.continue')}
                        </Button>
                    </div>
                </div>

                <OrderSummaryCard
                    title={t('recipient.order')}
                    rows={summaryRows}
                    className="hidden lg:flex lg:self-start"
                />
            </div>
        </div>
    )
}

export default observer(DeliveryPaymentPage)
