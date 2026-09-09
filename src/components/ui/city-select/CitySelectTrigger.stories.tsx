import type { Meta, StoryObj } from '@storybook/react-vite'

import { CitySelectTrigger } from './CitySelectTrigger'

const meta = {
    title: 'UI/CitySelectTrigger',
    component: CitySelectTrigger,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Выберите город',
        value: 'Москва',
        selected: true,
    },
} satisfies Meta<typeof CitySelectTrigger>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Placeholder: Story = {
    args: {
        value: undefined,
        selected: false,
    },
}
