import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'

import { InfoTooltip } from './InfoTooltip'

const LABEL = 'Оставить заказ у двери'
const TITLE = 'Бесконтактная доставка'

const meta: Meta<typeof InfoTooltip> = {
    title: 'UI/InfoTooltip',
    component: InfoTooltip,
    args: {
        title: TITLE,
        description:
            'Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен',
        triggerLabel: 'Что такое бесконтактная доставка',
        closeLabel: 'Закрыть подсказку',
    },
    decorators: [
        Story => (
            // Leaves room above the trigger: the tooltip opens upwards and is captured by the screenshot tests.
            <div className="flex min-h-48 items-end justify-center p-8">
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof InfoTooltip>

const openTooltip: Story['play'] = async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button', { name: args.triggerLabel })

    await userEvent.click(trigger)

    // The content is portalled outside the canvas.
    await expect(await within(canvasElement.ownerDocument.body).findByText(TITLE)).toBeVisible()

    // Drop the programmatic focus ring so the screenshot shows the Figma state; blur alone keeps the tooltip open.
    trigger.blur()
}

export const Closed: Story = {}

export const Open: Story = {
    play: openTooltip,
}

export const OpenNextToLabel: Story = {
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox id="leave-at-door" />
            <label htmlFor="leave-at-door" className="cursor-pointer text-base leading-6 font-medium">
                {LABEL}
            </label>
            <InfoTooltip {...args} />
        </div>
    ),
    play: openTooltip,
}
