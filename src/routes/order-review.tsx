import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import OrderReviewPage from '@/pages/OrderReviewPage/OrderReviewPage'

export const Route = createFileRoute('/order-review')({
    beforeLoad: guardCheckoutStep('/order-review'),
    component: OrderReviewPage,
})
