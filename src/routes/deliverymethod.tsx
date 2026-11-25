import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'

import DeliveryMethodPage from '@/pages/DeliveryMethodPage/DeliveryMethodPage'

export const Route = createFileRoute('/deliverymethod')({
    beforeLoad: guardCheckoutStep('/deliverymethod'),
    component: DeliveryMethodPage,
})
