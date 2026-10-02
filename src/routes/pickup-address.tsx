import { createFileRoute } from '@tanstack/react-router'
import PickupAddressPage from '@/pages/PickupAddressPage/PickupAddressPage'

export const Route = createFileRoute('/pickup-address')({
    component: PickupAddressPage,
})
