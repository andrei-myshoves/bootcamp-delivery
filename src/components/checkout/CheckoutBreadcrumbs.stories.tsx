import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckoutBreadcrumbs } from './CheckoutBreadcrumbs'

const meta: Meta<typeof CheckoutBreadcrumbs> = {
    title: 'Checkout/CheckoutBreadcrumbs',
    component: CheckoutBreadcrumbs,
}

export default meta

type Story = StoryObj<typeof CheckoutBreadcrumbs>

export const DeliveryAddressStep: Story = {
    args: { step: 5 },
}

export const DeliveryPaymentStep: Story = {
    args: { step: 6 },
}

/** Figma content column width (702px): the crumbs wrap to a second line from step 6. */
export const DeliveryPaymentStepWrapped: Story = {
    args: { step: 6 },
    decorators: [
        Story => (
            <div className="max-w-175.5">
                <Story />
            </div>
        ),
    ],
}

/** Figma «Проверка данных» (844px column): crumbs wrap and a «›» never starts a line; the break point depends on the font. */
export const OrderReviewStepWrapped: Story = {
    args: { step: 7 },
    decorators: [
        Story => (
            <div className="max-w-211">
                <Story />
            </div>
        ),
    ],
}
