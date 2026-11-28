import { Button } from '@/components/ui/button/Button'

import { OrderDetailsList, OrderTotal } from './OrderDetailsList'
import type { OrderSummaryRow } from './OrderSummaryCard'

interface OrderReviewDetailsProps {
    title: string
    /** Rows in reading order; on desktop the first half fills the left column, the rest the right one. */
    rows: OrderSummaryRow[]
    totalLabel: string
    totalValue: string
    editLabel: string
    onEdit: () => void
    /** Blocks editing while the order is being sent. */
    disabled?: boolean
}

/** «Ваш заказ» block of the «Проверка данных» step: one column on mobile, two columns on desktop (Figma). */
export function OrderReviewDetails({
    title,
    rows,
    totalLabel,
    totalValue,
    editLabel,
    onEdit,
    disabled = false,
}: OrderReviewDetailsProps) {
    return (
        <section className="flex flex-col gap-4 px-4 py-6 lg:p-0">
            <h2 className="text-2xl leading-8 font-bold">{title}</h2>

            <OrderDetailsList rows={rows} />

            <hr className="bg-secondary h-px rounded-full border-0" />

            <OrderTotal label={totalLabel} value={totalValue} />

            <Button
                variant="secondary"
                size="regular"
                className="h-10 w-full px-6"
                onClick={onEdit}
                disabled={disabled}
            >
                {editLabel}
            </Button>
        </section>
    )
}
