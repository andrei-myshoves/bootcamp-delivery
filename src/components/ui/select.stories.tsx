import type { Meta, StoryObj } from '@storybook/react-vite'

import { UiSelect } from './ui-select'

const meta: Meta<typeof UiSelect> = {
    title: 'UI/Select',
    component: UiSelect,
}

export default meta

type Story = StoryObj<typeof UiSelect>

export const Default: Story = {
    args: {
        placeholder: 'Выберите город',
        options: [
            { value: 'moscow', label: 'Москва' },
            { value: 'spb', label: 'Санкт-Петербург' },
            { value: 'tomsk', label: 'Томск' },
        ],
    },
}

export const WithValue: Story = {
    args: {
        defaultValue: 'spb',
        options: [
            { value: 'moscow', label: 'Москва' },
            { value: 'spb', label: 'Санкт-Петербург' },
            { value: 'tomsk', label: 'Томск' },
        ],
    },
}
