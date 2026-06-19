import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        children: 'Рассчитать',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Назад',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Закрыть',
    },
}
