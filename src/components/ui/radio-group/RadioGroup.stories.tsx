import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { RadioGroup, RadioGroupItem } from './RadioGroup'

const OPTIONS = [
    { value: 'receiver', label: 'Получатель' },
    { value: 'sender', label: 'Отправитель' },
]

const meta: Meta<typeof RadioGroup> = {
    title: 'UI/RadioGroup',
    component: RadioGroup,
    args: {
        'aria-label': 'Кто оплачивает доставку',
        defaultValue: 'receiver',
        className: 'gap-4',
    },
    render: args => (
        <RadioGroup {...args}>
            {OPTIONS.map(({ value, label }) => (
                <div key={value} className="flex items-center gap-4">
                    <RadioGroupItem id={`payer-${value}`} value={value} />
                    <label htmlFor={`payer-${value}`} className="cursor-pointer text-base leading-6 font-medium">
                        {label}
                    </label>
                </div>
            ))}
        </RadioGroup>
    ),
}

export default meta

type Story = StoryObj<typeof RadioGroup>

/** Figma «Оплата доставки»: the receiver is selected. */
export const ReceiverSelected: Story = {}

export const SenderSelected: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await userEvent.click(canvas.getByText('Отправитель'))

        await expect(canvas.getByRole('radio', { name: 'Отправитель' })).toBeChecked()

        // Drop the programmatic focus ring so the screenshot shows the resting selected state.
        canvas.getByRole('radio', { name: 'Отправитель' }).blur()
    },
}
