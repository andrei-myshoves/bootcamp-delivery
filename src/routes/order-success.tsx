import { createFileRoute } from '@tanstack/react-router'

import { guardOrderCreatedSuccess } from '@/app/router/checkoutGuard'
import OrderCreatedSuccessPage from '@/pages/OrderCreatedSuccessPage/OrderCreatedSuccessPage'

export const Route = createFileRoute('/order-success')({
    beforeLoad: guardOrderCreatedSuccess,
    component: OrderCreatedSuccessPage,
})
