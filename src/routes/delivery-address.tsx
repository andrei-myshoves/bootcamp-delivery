import { createFileRoute } from '@tanstack/react-router'
import DeliveryAddressPage from '@/pages/DeliveryAddressPage/DeliveryAddressPage'

export const Route = createFileRoute('/delivery-address')({
    component: DeliveryAddressPage,
})
