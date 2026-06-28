import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
    args: {
        placeholder: 'Введите текст',
    },
}

export const WithLabel: Story = {
    args: {
        label: 'Фамилия',
        placeholder: 'Иванов',
    },
}

export const WithValue: Story = {
    args: {
        label: 'Имя',
        value: 'Андрей',
        readOnly: true,
    },
}

export const Disabled: Story = {
    args: {
        label: 'Телефон',
        placeholder: '+7',
        disabled: true,
    },
}

export const Large: Story = {
    args: {
        inputSize: 'large',
        placeholder: 'Номер заказа',
    },
}

export const LargeWithLabel: Story = {
    args: {
        inputSize: 'large',
        label: 'Телефон',
        placeholder: '+7',
    },
}