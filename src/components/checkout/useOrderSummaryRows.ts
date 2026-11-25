import { useTranslation } from 'react-i18next'

import { useStore } from '@/hooks/useStore'
import { formatAddress, formatPerson } from '@/shared/lib/order-format'

import type { OrderSummaryRow } from './OrderSummaryCard'

/**
 * Rows shared by the «Ваш заказ» card from step 5 on: delivery type, recipient, sender and both addresses.
 * Must be called from an `observer` component so the card reacts to store changes.
 */
export function useOrderSummaryRows(): OrderSummaryRow[] {
    const { deliveryCalculatorStore } = useStore()
    const { t } = useTranslation()

    const { selectedDeliveryOption, recipient, sender, pickupAddress, deliveryAddress } = deliveryCalculatorStore
    const fillFields = t('recipient.fillFields')

    return [
        { label: t('recipient.deliveryType'), value: selectedDeliveryOption?.name ?? t('recipient.notSelected') },
        { label: t('recipient.recipient'), value: formatPerson(recipient) || fillFields },
        { label: t('sender.sender'), value: formatPerson(sender) || fillFields },
        { label: t('pickupAddress.pickupAddress'), value: formatAddress(pickupAddress) || fillFields },
        { label: t('deliveryAddress.deliveryAddress'), value: formatAddress(deliveryAddress) || fillFields },
    ]
}
