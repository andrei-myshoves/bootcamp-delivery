import type { Meta, StoryObj } from '@storybook/react-vite'

import { OrderSummaryCard } from './OrderSummaryCard'

const meta: Meta<typeof OrderSummaryCard> = {
    title: 'Checkout/OrderSummaryCard',
    component: OrderSummaryCard,
    args: {
        title: 'Ваш заказ',
        className: 'w-full max-w-120.5',
    },
}

export default meta

type Story = StoryObj<typeof OrderSummaryCard>

/** Figma «Оплата доставки» (step 6): every row is filled. */
export const DeliveryPaymentStep: Story = {
    args: {
        rows: [
            { label: 'Тип доставки', value: 'Экспресс-доставка' },
            { label: 'Получатель', value: 'Климов Алексей Алексеевич, +7 999 999 99 99' },
            { label: 'Отправитель', value: 'Иванов Иван Иванович, +7 999 123 45 67' },
            { label: 'Откуда забрать', value: 'Новорогожская, 24, 17' },
            { label: 'Куда доставить', value: 'Евдокима Огнева, 19, 40' },
            { label: 'Кто оплачивает доставку', value: 'Получатель' },
        ],
    },
}

/** Figma «Куда доставить» (step 5): the current step is not filled yet. */
export const WithUnfilledRow: Story = {
    args: {
        rows: [
            { label: 'Тип доставки', value: 'Экспресс-доставка' },
            { label: 'Получатель', value: 'Климов Алексей Алексеевич, +7 999 999 99 99' },
            { label: 'Отправитель', value: 'Иванов Иван Иванович, +7 999 123 45 67' },
            { label: 'Откуда забрать', value: 'Новорогожская, 24, 17' },
            { label: 'Куда доставить', value: 'Заполните поля' },
        ],
    },
}
