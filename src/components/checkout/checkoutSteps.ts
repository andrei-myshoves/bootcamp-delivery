import type { Payer } from '@/store/DeliveryCalculatorStore'

export const CHECKOUT_TOTAL_STEPS = 7

/** i18n keys of the checkout breadcrumbs, in step order (step 1 = delivery type). */
export const CHECKOUT_BREADCRUMB_KEYS = [
    'recipient.breadcrumbDeliveryType',
    'recipient.breadcrumbRecipient',
    'sender.breadcrumbSender',
    'pickupAddress.breadcrumbPickup',
    'deliveryAddress.breadcrumbDelivery',
    'deliveryPayment.breadcrumb',
    'orderReview.breadcrumb',
] as const

/** i18n keys of the payer labels. */
export const PAYER_LABEL_KEYS: Record<Payer, string> = {
    receiver: 'deliveryPayment.payerReceiver',
    sender: 'deliveryPayment.payerSender',
}
