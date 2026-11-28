import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import RecipientPage from '@/pages/RecipientPage/RecipientPage'

export const Route = createFileRoute('/recipient')({
    beforeLoad: guardCheckoutStep('/recipient'),
    component: RecipientPage,
})
