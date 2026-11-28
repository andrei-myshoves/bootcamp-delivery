import { useTranslation } from 'react-i18next'

import { useStore } from '@/hooks/useStore'
import { formatAddress, formatPerson } from '@/shared/lib/order-format'

import { PAYER_LABEL_KEYS } from './checkoutSteps'
import type { OrderSummaryRow } from './OrderSummaryCard'

interface OrderSummaryRowsOptions {
    /** Adds «Кто оплачивает доставку» (from the «Оплата доставки» step on). */
    includePayer?: boolean
}

/**
 * Rows of the «Ваш заказ» card from step 5 on: delivery type, recipient, sender, both addresses and optionally the payer.
 * Must be called from an `observer` component so the card reacts to store changes.
 */
export function useOrderSummaryRows({ includePayer = false }: OrderSummaryRowsOptions = {}): OrderSummaryRow[] {
    const { deliveryCalculatorStore } = useStore()
    const { t } = useTranslation()

    const { selectedDeliveryOption, recipient, sender, pickupAddress, deliveryAddress, fromCity, toCity, payer } =
        deliveryCalculatorStore
    const fillFields = t('recipient.fillFields')

    const rows: OrderSummaryRow[] = [
        { label: t('recipient.deliveryType'), value: selectedDeliveryOption?.name ?? t('recipient.notSelected') },
        { label: t('recipient.recipient'), value: formatPerson(recipient) || fillFields },
        { label: t('sender.sender'), value: formatPerson(sender) || fillFields },
        { label: t('pickupAddress.pickupAddress'), value: formatAddress(pickupAddress, fromCity.name) || fillFields },
        {
            label: t('deliveryAddress.deliveryAddress'),
            value: formatAddress(deliveryAddress, toCity.name) || fillFields,
        },
    ]

    if (includePayer) {
        rows.push({ label: t('deliveryPayment.whoPays'), value: t(PAYER_LABEL_KEYS[payer]) })
    }

    return rows
}
