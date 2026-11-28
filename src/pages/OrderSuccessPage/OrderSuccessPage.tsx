import { observer } from 'mobx-react-lite'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { OrderSuccess } from '@/components/checkout/OrderSuccess'
import { buildOrderSummaryRows } from '@/components/checkout/useOrderSummaryRows'
import { useStore } from '@/hooks/useStore'
import { formatPrice } from '@/shared/lib/order-format'

const OrderSuccessPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { lastOrder } = deliveryCalculatorStore

    // The route guard opens this page only with a created order.
    if (!lastOrder) {
        return null
    }

    const rows = buildOrderSummaryRows(lastOrder, t, { includePayer: true })

    // Order status needs authorization (GET /delivery/orders); until it exists the status buttons open the profile.
    const handleStatusClick = () => {
        void navigate({ to: '/profile' })
    }

    const handleHomeClick = () => {
        void navigate({ to: '/' })
    }

    return (
        <OrderSuccess
            orderNumber={lastOrder.id}
            rows={rows}
            totalValue={formatPrice(lastOrder.price)}
            onStatusClick={handleStatusClick}
            onHomeClick={handleHomeClick}
        />
    )
}

export default observer(OrderSuccessPage)
