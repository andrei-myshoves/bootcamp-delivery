import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import DeliveryPaymentPage from '@/pages/DeliveryPaymentPage/DeliveryPaymentPage'

export const Route = createFileRoute('/delivery-payment')({
    beforeLoad: guardCheckoutStep('/delivery-payment'),
    component: DeliveryPaymentPage,
})
