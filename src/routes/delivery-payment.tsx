import { createFileRoute } from '@tanstack/react-router'
import DeliveryPaymentPage from '@/pages/DeliveryPaymentPage/DeliveryPaymentPage'

export const Route = createFileRoute('/delivery-payment')({
    component: DeliveryPaymentPage,
})
