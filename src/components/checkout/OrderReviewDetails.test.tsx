import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OrderReviewDetails } from './OrderReviewDetails'

const rows = [
    { label: 'Тип доставки', value: 'Экспресс-доставка' },
    { label: 'Получатель', value: 'Климов Алексей Алексеевич, +7 999 999 99 99' },
    { label: 'Кто оплачивает доставку', value: 'Получатель' },
]

const renderDetails = (onEdit = vi.fn()) =>
    render(
        <OrderReviewDetails
            title="Ваш заказ"
            rows={rows}
            totalLabel="Итого:"
            totalValue="780 ₽"
            editLabel="Редактировать данные"
            onEdit={onEdit}
        />
    )

describe('OrderReviewDetails', () => {
    it('renders the title and every row as a term/description pair', () => {
        renderDetails()

        expect(screen.getByRole('heading', { name: 'Ваш заказ' })).toBeInTheDocument()

        const terms = screen.getAllByRole('term').map(term => term.textContent)
        const definitions = screen.getAllByRole('definition').map(definition => definition.textContent)

        expect(terms).toEqual(rows.map(row => row.label))
        expect(definitions).toEqual(rows.map(row => row.value))
    })

    it('renders the total', () => {
        renderDetails()

        const total = screen.getByText('Итого:').parentElement as HTMLElement

        expect(within(total).getByText('780 ₽')).toBeInTheDocument()
    })

    it('calls onEdit from «Редактировать данные»', async () => {
        const user = userEvent.setup()
        const onEdit = vi.fn()

        renderDetails(onEdit)

        await user.click(screen.getByRole('button', { name: 'Редактировать данные' }))

        expect(onEdit).toHaveBeenCalledOnce()
    })
})
