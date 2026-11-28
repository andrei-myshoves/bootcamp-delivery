import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import { useStore } from '@/hooks/useStore'
import { formatAddress, formatPerson } from '@/shared/lib/order-format'
import type { AddressData, Payer, RecipientData } from '@/store/DeliveryCalculatorStore'

import { PAYER_LABEL_KEYS } from './checkoutSteps'
import type { OrderSummaryRow } from './OrderSummaryCard'

interface OrderSummaryRowsOptions {
    /** Adds «Кто оплачивает доставку» (from the «Оплата доставки» step on). */
    includePayer?: boolean
}

/** Order values behind the summary rows: the live draft or a created order. */
export interface OrderSummaryData {
    /** Undefined while no tariff is selected. */
    deliveryOptionName?: string
    recipient: RecipientData
    sender: RecipientData
    pickupAddress: AddressData
    deliveryAddress: AddressData
    fromCityName: string
    toCityName: string
    payer: Payer
}

/** Rows «Тип доставки», «Получатель», «Отправитель», both addresses and optionally the payer, in Figma order. */
export function buildOrderSummaryRows(
    data: OrderSummaryData,
    t: TFunction,
    { includePayer = false }: OrderSummaryRowsOptions = {}
): OrderSummaryRow[] {
    const fillFields = t('recipient.fillFields')

    const rows: OrderSummaryRow[] = [
        { label: t('recipient.deliveryType'), value: data.deliveryOptionName ?? t('recipient.notSelected') },
        { label: t('recipient.recipient'), value: formatPerson(data.recipient) || fillFields },
        { label: t('sender.sender'), value: formatPerson(data.sender) || fillFields },
        {
            label: t('pickupAddress.pickupAddress'),
            value: formatAddress(data.pickupAddress, data.fromCityName) || fillFields,
        },
        {
            label: t('deliveryAddress.deliveryAddress'),
            value: formatAddress(data.deliveryAddress, data.toCityName) || fillFields,
        },
    ]

    if (includePayer) {
        rows.push({ label: t('deliveryPayment.whoPays'), value: t(PAYER_LABEL_KEYS[data.payer]) })
    }

    return rows
}

/**
 * Rows of the «Ваш заказ» card from step 5 on, built from the checkout draft.
 * Must be called from an `observer` component so the card reacts to store changes.
 */
export function useOrderSummaryRows(options: OrderSummaryRowsOptions = {}): OrderSummaryRow[] {
    const { deliveryCalculatorStore } = useStore()
    const { t } = useTranslation()

    const { selectedDeliveryOption, recipient, sender, pickupAddress, deliveryAddress, fromCity, toCity, payer } =
        deliveryCalculatorStore

    return buildOrderSummaryRows(
        {
            deliveryOptionName: selectedDeliveryOption?.name,
            recipient,
            sender,
            pickupAddress,
            deliveryAddress,
            fromCityName: fromCity.name,
            toCityName: toCity.name,
            payer,
        },
        t,
        options
    )
}
