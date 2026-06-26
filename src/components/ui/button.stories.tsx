import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'

import { Button } from './button'

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const PrimaryRegular: Story = {
    args: {
        variant: 'primary',
        size: 'regular',
        children: 'Выйти',
    },
    render: args => <Button {...args} />,
}

export const PrimaryLarge: Story = {
    args: {
        variant: 'primary',
        size: 'large',
        children: 'Рассчитать',
    },
    render: args => (
        <div style={{ width: '200px' }}>
            <Button {...args} className="w-full" />
        </div>
    ),
}

export const SecondaryRegular: Story = {
    args: {
        variant: 'secondary',
        size: 'regular',
        children: 'Подробнее',
    },
}

export const SecondaryLarge: Story = {
    args: {
        variant: 'secondary',
        size: 'large',
        children: 'Назад',
    },
    render: args => (
        <div style={{ width: '200px' }}>
            <Button {...args} className="w-full" />
        </div>
    ),
}

export const WithIcon: Story = {
    args: {
        variant: 'primary',
        size: 'large',
        children: (
            <>
                Рассчитать
                <ArrowRight size={16} />
            </>
        ),
    },
    render: args => (
        <div style={{ width: '200px' }}>
            <Button {...args} className="w-full" />
        </div>
    ),
}

export const Disabled: Story = {
    args: {
        variant: 'primary',
        size: 'large',
        disabled: true,
        children: 'Рассчитать',
    },
    render: args => (
        <div style={{ width: '200px' }}>
            <Button {...args} className="w-full" />
        </div>
    ),
}
