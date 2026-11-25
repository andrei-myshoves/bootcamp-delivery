import type { Meta, StoryObj } from '@storybook/react-vite'

import { InfoTooltip } from './InfoTooltip'

const LABEL = 'Оставить заказ у двери'

const meta: Meta<typeof InfoTooltip> = {
    title: 'UI/InfoTooltip',
    component: InfoTooltip,
    args: {
        title: 'Бесконтактная доставка',
        description:
            'Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен',
        triggerLabel: 'Что такое бесконтактная доставка',
        closeLabel: 'Закрыть подсказку',
    },
    decorators: [
        Story => (
            <div className="flex min-h-48 items-end justify-center p-8">
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof InfoTooltip>

export const Default: Story = {}

export const NextToLabel: Story = {
    render: args => (
        <div className="flex items-center gap-2">
            <span className="text-base leading-6 font-medium">{LABEL}</span>
            <InfoTooltip {...args} />
        </div>
    ),
}
