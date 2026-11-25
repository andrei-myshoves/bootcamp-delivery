import type { Meta, StoryObj } from '@storybook/react-vite'

import { StepProgress } from './StepProgress'

const meta: Meta<typeof StepProgress> = {
    title: 'Checkout/StepProgress',
    component: StepProgress,
}

export default meta

type Story = StoryObj<typeof StepProgress>

export const DeliveryAddressStep: Story = {
    args: { label: 'Шаг 5 из 7', step: 5 },
}

export const DeliveryPaymentStep: Story = {
    args: { label: 'Шаг 6 из 7', step: 6 },
}
