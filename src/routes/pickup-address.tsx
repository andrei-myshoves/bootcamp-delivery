import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import PickupAddressPage from '@/pages/PickupAddressPage/PickupAddressPage'

export const Route = createFileRoute('/pickup-address')({
    beforeLoad: guardCheckoutStep('/pickup-address'),
    component: PickupAddressPage,
})
