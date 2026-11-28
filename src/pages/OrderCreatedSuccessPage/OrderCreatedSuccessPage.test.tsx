import '@/app/i18n'

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { StoreContext } from '@/app/providers/StoreProvider'
import type { PlacedOrder } from '@/store/DeliveryCalculatorStore'
import { RootStore } from '@/store/RootStore'

import OrderCreatedSuccessPage from './OrderCreatedSuccessPage'

const router = vi.hoisted(() => ({ navigate: vi.fn(), redirects: [] as unknown[] }))

vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => router.navigate,
    Navigate: (props: unknown) => {
        router.redirects.push(props)

        return null
    },
}))

const placedOrder: PlacedOrder = {
    id: '6745f0c2a1b3c4d5e6f70812',
    price: 78000,
    deliveryOptionName: 'Экспресс-доставка',
    fromCityName: 'Москва',
    toCityName: 'Санкт-Петербург',
    recipient: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
    deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' },
    payer: 'sender',
}

const renderPage = (lastOrder: PlacedOrder | null) => {
    const store = new RootStore()
    store.deliveryCalculatorStore.lastOrder = lastOrder

    return render(
        <StoreContext value={store}>
            <OrderCreatedSuccessPage />
        </StoreContext>
    )
}

describe('OrderCreatedSuccessPage', () => {
    beforeEach(() => {
        localStorage.clear()
        router.navigate.mockReset()
        router.redirects.length = 0
    })

    it('shows the confirmation title and the payment hint', () => {
        renderPage(placedOrder)

        expect(screen.getByRole('heading', { level: 1, name: 'Заявка отправлена' })).toBeInTheDocument()
        expect(screen.getByText('Вы можете оплатить ваш заказ в разделе «Профиль»')).toBeInTheDocument()
    })

    it('lists the created order: number, rows, total and the SMS note', () => {
        renderPage(placedOrder)

        const details = within(screen.getByTestId('order-created-success-details'))
        const valueOf = (label: string) => details.getByText(label, { selector: 'dt' }).nextElementSibling

        expect(valueOf('Номер заказа')).toHaveTextContent('6745f0c2a1b3c4d5e6f70812')
        expect(valueOf('Тип доставки')).toHaveTextContent('Экспресс-доставка')
        expect(valueOf('Получатель')).toHaveTextContent('Климов Алексей Алексеевич, +7 999 999 99 99')
        expect(valueOf('Откуда забрать')).toHaveTextContent('г. Москва, Новорогожская, 24, 17')
        expect(valueOf('Кто оплачивает доставку')).toHaveTextContent('Отправитель')
        expect(details.getByText(/^780\s₽$/)).toBeInTheDocument()
        expect(details.getByText('Вся информация была продублирована в SMS')).toBeInTheDocument()
    })

    it('opens the profile from «Статус заявки» and «Посмотреть статус»', async () => {
        renderPage(placedOrder)

        await userEvent.click(screen.getByRole('button', { name: 'Статус заявки' }))
        await userEvent.click(screen.getByRole('button', { name: 'Посмотреть статус' }))

        expect(router.navigate).toHaveBeenNthCalledWith(1, { to: '/profile' })
        expect(router.navigate).toHaveBeenNthCalledWith(2, { to: '/profile' })
    })

    it('goes home from «На главную» and the close cross', async () => {
        renderPage(placedOrder)

        await userEvent.click(screen.getByRole('button', { name: 'На главную' }))
        await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }))

        expect(router.navigate).toHaveBeenCalledTimes(2)
        expect(router.navigate).toHaveBeenCalledWith({ to: '/' })
    })

    it('redirects to the calculator instead of rendering an empty page without a created order', () => {
        const { container } = renderPage(null)

        expect(router.redirects).toEqual([{ to: '/', replace: true }])
        expect(container).toBeEmptyDOMElement()
    })
})
