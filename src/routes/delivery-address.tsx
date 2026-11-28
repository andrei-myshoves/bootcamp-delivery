import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import DeliveryAddressPage from '@/pages/DeliveryAddressPage/DeliveryAddressPage'

export const Route = createFileRoute('/delivery-address')({
    beforeLoad: guardCheckoutStep('/delivery-address'),
    component: DeliveryAddressPage,
})
