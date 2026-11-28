import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { OrderReviewDetails } from './OrderReviewDetails'

const meta: Meta<typeof OrderReviewDetails> = {
    title: 'Checkout/OrderReviewDetails',
    component: OrderReviewDetails,
    args: {
        title: 'Ваш заказ',
        totalLabel: 'Итого:',
        editLabel: 'Редактировать данные',
        onEdit: fn(),
    },
    decorators: [
        Story => (
            <div className="max-w-211">
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof OrderReviewDetails>

/** Figma «Проверка данных»: two columns on desktop, one column on mobile. */
export const Filled: Story = {
    args: {
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

/** While the order is being sent «Редактировать данные» is blocked. */
export const Disabled: Story = {
    args: {
        ...Filled.args,
        disabled: true,
    },
}
