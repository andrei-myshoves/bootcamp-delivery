import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { OrderSuccess } from './OrderSuccess'

const meta: Meta<typeof OrderSuccess> = {
    title: 'Checkout/OrderSuccess',
    component: OrderSuccess,
    args: {
        onStatusClick: fn(),
        onHomeClick: fn(),
    },
}

export default meta

type Story = StoryObj<typeof OrderSuccess>

/**
 * Figma «Заявка отправлена». Desktop: order details, «Статус заявки» and «На главную».
 * Mobile: centred icon, text and «Посмотреть статус», a close cross on top, no details.
 */
export const Default: Story = {
    args: {
        // The backend order id (`_id`) is shown as the order number.
        orderNumber: '6745f0c2a1b3c4d5e6f70812',
        totalValue: '780 ₽',
        rows: [
            { label: 'Тип доставки', value: 'Экспресс-доставка' },
            { label: 'Получатель', value: 'Климов Алексей Алексеевич, +7 999 999 99 99' },
            { label: 'Отправитель', value: 'Иванов Иван Иванович, +7 999 123 45 67' },
            { label: 'Откуда забрать', value: 'г. Москва, Новорогожская, 24, 17' },
            { label: 'Куда доставить', value: 'г. Санкт-Петербург, Евдокима Огнева, 19, 40' },
            { label: 'Кто оплачивает доставку', value: 'Получатель' },
        ],
    },
}
