import { createFileRoute } from '@tanstack/react-router'

import { guardCheckoutStep } from '@/app/router/checkoutGuard'
import SenderPage from '@/pages/SenderPage/SenderPage'

export const Route = createFileRoute('/sender')({
    beforeLoad: guardCheckoutStep('/sender'),
    component: SenderPage,
})
