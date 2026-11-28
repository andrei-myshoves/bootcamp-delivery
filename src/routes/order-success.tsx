import { createFileRoute } from '@tanstack/react-router'

import { guardOrderSuccess } from '@/app/router/checkoutGuard'
import OrderSuccessPage from '@/pages/OrderSuccessPage/OrderSuccessPage'

export const Route = createFileRoute('/order-success')({
    beforeLoad: guardOrderSuccess,
    component: OrderSuccessPage,
})
