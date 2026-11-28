import '@/app/i18n'

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OrderSuccess } from './OrderSuccess'

const rows = [
    { label: 'Тип доставки', value: 'Экспресс-доставка' },
    { label: 'Кто оплачивает доставку', value: 'Отправитель' },
]

const renderSuccess = () => {
    const onStatusClick = vi.fn()
    const onHomeClick = vi.fn()

    render(
        <OrderSuccess
            orderNumber="6745f0c2a1b3c4d5e6f70812"
            rows={rows}
            totalValue="780 ₽"
            onStatusClick={onStatusClick}
            onHomeClick={onHomeClick}
        />
    )

    return { onStatusClick, onHomeClick }
}

describe('OrderSuccess', () => {
    it('shows the confirmation title and the payment hint', () => {
        renderSuccess()

        expect(screen.getByRole('heading', { level: 1, name: 'Заявка отправлена' })).toBeInTheDocument()
        expect(screen.getByText('Вы можете оплатить ваш заказ в разделе «Профиль»')).toBeInTheDocument()
    })

    it('lists the order number, the order rows, the total and the SMS note in the desktop details', () => {
        renderSuccess()

        const details = within(screen.getByTestId('order-success-details'))

        expect(details.getByText('Номер заказа').nextElementSibling).toHaveTextContent('6745f0c2a1b3c4d5e6f70812')
        expect(details.getByText('Тип доставки').nextElementSibling).toHaveTextContent('Экспресс-доставка')
        expect(details.getByText('Кто оплачивает доставку').nextElementSibling).toHaveTextContent('Отправитель')
        expect(details.getByText('780 ₽')).toBeInTheDocument()
        expect(details.getByText('Вся информация была продублирована в SMS')).toBeInTheDocument()
    })

    it('opens the status from «Статус заявки» and «Посмотреть статус»', async () => {
        const { onStatusClick } = renderSuccess()

        await userEvent.click(screen.getByRole('button', { name: 'Статус заявки' }))
        await userEvent.click(screen.getByRole('button', { name: 'Посмотреть статус' }))

        expect(onStatusClick).toHaveBeenCalledTimes(2)
    })

    it('goes home from «На главную» and the close cross', async () => {
        const { onHomeClick } = renderSuccess()

        await userEvent.click(screen.getByRole('button', { name: 'На главную' }))
        await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }))

        expect(onHomeClick).toHaveBeenCalledTimes(2)
    })
})
