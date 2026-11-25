import { cn } from '@/shared/lib/utils'

export interface OrderSummaryRow {
    label: string
    value: string
}

interface OrderSummaryCardProps {
    title: string
    rows: OrderSummaryRow[]
    className?: string
}

/** «Ваш заказ» side card of the desktop checkout steps. */
export function OrderSummaryCard({ title, rows, className }: OrderSummaryCardProps) {
    return (
        <aside className={cn('bg-secondary flex flex-col gap-4 rounded-3xl px-10 py-6', className)}>
            <h2 className="text-2xl leading-8 font-bold">{title}</h2>

            <dl className="flex flex-col gap-4">
                {rows.map(row => (
                    <div key={row.label} className="flex flex-col gap-0.5">
                        <dt className="text-muted-foreground text-sm leading-5.5 font-medium">{row.label}</dt>
                        <dd className="text-lg leading-6.5">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </aside>
    )
}
