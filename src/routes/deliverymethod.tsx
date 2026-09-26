import { createFileRoute } from '@tanstack/react-router'

import DeliveryMethodPage from '@/pages/DeliveryMethodPage/DeliveryMethodPage'

export const Route = createFileRoute('/deliverymethod')({
    component: DeliveryMethodPage,
})
