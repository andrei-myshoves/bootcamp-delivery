import type { TFunction } from 'i18next'

import type { OrderDraftField } from '@/store/createOrderDto'
import type { OrderSubmitError } from '@/store/orderSubmitError'

const MISSING_FIELD_KEYS: Record<OrderDraftField, string> = {
    package: 'orderSubmit.fields.package',
    deliveryOption: 'orderSubmit.fields.deliveryOption',
    fromCity: 'orderSubmit.fields.fromCity',
    toCity: 'orderSubmit.fields.toCity',
    recipient: 'orderSubmit.fields.recipient',
    sender: 'orderSubmit.fields.sender',
    pickupAddress: 'orderSubmit.fields.pickupAddress',
    deliveryAddress: 'orderSubmit.fields.deliveryAddress',
    payer: 'orderSubmit.fields.payer',
}

/** Text shown above the «Продолжить» button when the order was not created. */
export function getOrderSubmitErrorMessage(error: OrderSubmitError, t: TFunction): string {
    switch (error.kind) {
        case 'missingData':
            return t('orderSubmit.missingData', {
                fields: error.fields.map(field => t(MISSING_FIELD_KEYS[field])).join(', '),
            })
        case 'rejected':
            return error.reason
                ? t('orderSubmit.rejected', { reason: error.reason })
                : t('orderSubmit.rejectedWithoutReason')
        case 'server':
            return t('orderSubmit.server')
        case 'network':
            return t('orderSubmit.network')
    }
}
