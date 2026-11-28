import { cn } from '@/shared/lib/utils'

import type { OrderSummaryRow } from './OrderSummaryCard'

/** One «label / value» pair of the order details; must be placed inside a `<dl>`. */
export function OrderDetailItem({ label, value }: OrderSummaryRow) {
    return (
        <div className="flex flex-col gap-1 lg:gap-0.5">
            <dt className="text-muted-foreground text-sm leading-5.5 font-medium">{label}</dt>
            <dd className="text-base leading-6 font-medium lg:text-lg lg:leading-6.5 lg:font-normal">{value}</dd>
        </div>
    )
}

interface OrderDetailsListProps {
    /** Rows in reading order; on desktop the first half fills the left column, the rest the right one. */
    rows: OrderSummaryRow[]
    className?: string
}

/** Order details of «Проверка данных» and «Заявка отправлена»: one column on mobile, two on desktop (Figma). */
export function OrderDetailsList({ rows, className }: OrderDetailsListProps) {
    const rowsPerColumn = Math.ceil(rows.length / 2)

    return (
        <dl
            className={cn('grid gap-4 lg:grid-flow-col lg:grid-cols-2 lg:gap-x-10', className)}
            style={{ gridTemplateRows: `repeat(${rowsPerColumn}, auto)` }}
        >
            {rows.map(row => (
                <OrderDetailItem key={row.label} {...row} />
            ))}
        </dl>
    )
}

interface OrderTotalProps {
    label: string
    value: string
}

/** «Итого: 780 ₽» of the review and success screens. */
export function OrderTotal({ label, value }: OrderTotalProps) {
    return (
        // Figma «title-lg» (Bold 32/40) has no project token yet.
        <p className="flex gap-1 text-[2rem] leading-10 font-bold">
            <span>{label}</span>
            <span>{value}</span>
        </p>
    )
}
