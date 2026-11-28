import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { runInAction } from 'mobx'

import { StoreContext } from '@/app/providers/StoreProvider'
import { RootStore } from '@/store/RootStore'

import OrderCreatedSuccessPage from './OrderCreatedSuccessPage'

/** Provides a store with a created order, as after a confirmed `POST /delivery/order`. */
const withCreatedOrder: Decorator = Story => {
    const store = new RootStore()

    runInAction(() => {
        store.deliveryCalculatorStore.lastOrder = {
            // The backend order id (`_id`) is shown as the order number.
            id: '6745f0c2a1b3c4d5e6f70812',
            price: 78000,
            deliveryOptionName: 'Экспресс-доставка',
            fromCityName: 'Москва',
            toCityName: 'Санкт-Петербург',
            recipient: {
                lastName: 'Климов',
                firstName: 'Алексей',
                middleName: 'Алексеевич',
                phone: '+7 999 999 99 99',
            },
            sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
            pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
            deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' },
            payer: 'receiver',
        }
    })

    return (
        <StoreContext value={store}>
            <Story />
        </StoreContext>
    )
}

const meta: Meta<typeof OrderCreatedSuccessPage> = {
    title: 'Pages/OrderCreatedSuccessPage',
    component: OrderCreatedSuccessPage,
    decorators: [withCreatedOrder],
}

export default meta

type Story = StoryObj<typeof OrderCreatedSuccessPage>

/**
 * Figma «Заявка отправлена». Desktop: order details, «Статус заявки» and «На главную».
 * Mobile: centred icon, text and «Посмотреть статус», a close cross on top, no details.
 */
export const Default: Story = {}
