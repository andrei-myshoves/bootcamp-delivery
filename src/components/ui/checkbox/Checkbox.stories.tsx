import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './Checkbox'

const LABEL = 'Оставить заказ у двери'

const meta: Meta<typeof Checkbox> = {
    title: 'UI/Checkbox',
    component: Checkbox,
    args: {
        'aria-label': 'Оставить заказ у двери',
    },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {}

export const Checked: Story = {
    args: {
        defaultChecked: true,
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}

export const WithLabel: Story = {
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox {...args} id="leave-at-door" aria-label={undefined} />
            <label htmlFor="leave-at-door" className="cursor-pointer text-base leading-6 font-medium">
                {LABEL}
            </label>
        </div>
    ),
}
