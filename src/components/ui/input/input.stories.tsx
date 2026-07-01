import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

const renderInput: Story['render'] = args => (
    <div style={{ width: '200px' }}>
        <Input {...args} />
    </div>
)

export const Default: Story = {
    args: {
        placeholder: 'Введите текст',
    },
    render: renderInput,
}

export const WithLabel: Story = {
    args: {
        label: 'Фамилия',
        placeholder: 'Иванов',
    },
    render: renderInput,
}

export const WithValue: Story = {
    args: {
        label: 'Имя',
        value: 'Андрей',
        readOnly: true,
    },
    render: renderInput,
}

export const Disabled: Story = {
    args: {
        label: 'Телефон',
        placeholder: '+7',
        disabled: true,
    },
    render: renderInput,
}

export const Large: Story = {
    args: {
        inputSize: 'large',
        placeholder: 'Номер заказа',
    },
    render: renderInput,
}

export const LargeWithLabel: Story = {
    args: {
        inputSize: 'large',
        label: 'Телефон',
        placeholder: '+7',
    },
    render: renderInput,
}
