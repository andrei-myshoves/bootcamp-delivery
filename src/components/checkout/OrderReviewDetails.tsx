import { Button } from '@/components/ui/button/Button'

import type { OrderSummaryRow } from './OrderSummaryCard'

interface OrderReviewDetailsProps {
    title: string
    /** Rows in reading order; on desktop the first half fills the left column, the rest the right one. */
    rows: OrderSummaryRow[]
    totalLabel: string
    totalValue: string
    editLabel: string
    onEdit: () => void
}

/** «Ваш заказ» block of the «Проверка данных» step: one column on mobile, two columns on desktop (Figma). */
export function OrderReviewDetails({
    title,
    rows,
    totalLabel,
    totalValue,
    editLabel,
    onEdit,
}: OrderReviewDetailsProps) {
    const rowsPerColumn = Math.ceil(rows.length / 2)

    return (
        <section className="flex flex-col gap-4 px-4 py-6 lg:p-0">
            <h2 className="text-2xl leading-8 font-bold">{title}</h2>

            <dl
                className="grid gap-4 lg:grid-flow-col lg:grid-cols-2 lg:gap-x-10"
                style={{ gridTemplateRows: `repeat(${rowsPerColumn}, auto)` }}
            >
                {rows.map(row => (
                    <div key={row.label} className="flex flex-col gap-1 lg:gap-0.5">
                        <dt className="text-muted-foreground text-sm leading-5.5 font-medium">{row.label}</dt>
                        <dd className="text-base leading-6 font-medium lg:text-lg lg:leading-6.5 lg:font-normal">
                            {row.value}
                        </dd>
                    </div>
                ))}
            </dl>

            <hr className="bg-secondary h-px rounded-full border-0" />

            {/* Figma «title-lg» (Bold 32/40) has no project token yet. */}
            <p className="flex gap-1 text-[2rem] leading-10 font-bold">
                <span>{totalLabel}</span>
                <span>{totalValue}</span>
            </p>

            <Button variant="secondary" size="regular" className="h-10 w-full px-6" onClick={onEdit}>
                {editLabel}
            </Button>
        </section>
    )
}
