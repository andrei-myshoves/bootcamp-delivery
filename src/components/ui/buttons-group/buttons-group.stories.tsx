import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { ButtonsGroup } from './buttons-group'

const meta: Meta<typeof ButtonsGroup> = {
    title: 'UI/ButtonsGroup',
    component: ButtonsGroup,
}

export default meta

type Story = StoryObj<typeof ButtonsGroup>

export const DeliveryType: Story = {
    render: () => {
        const [value, setValue] = useState('approximate')

        return (
            <ButtonsGroup
                value={value}
                onValueChange={setValue}
                options={[
                    {
                        value: 'approximate',
                        label: 'Примерные',
                    },
                    {
                        value: 'exact',
                        label: 'Точные',
                    },
                ]}
            />
        )
    },
}

export const Sizes: Story = {
    render: () => {
        const [value, setValue] = useState('m')

        return (
            <ButtonsGroup
                value={value}
                onValueChange={setValue}
                options={[
                    {
                        value: 'xs',
                        label: 'XS',
                    },
                    {
                        value: 's',
                        label: 'S',
                    },
                    {
                        value: 'm',
                        label: 'M',
                    },
                    {
                        value: 'l',
                        label: 'L',
                    },
                    {
                        value: 'xl',
                        label: 'XL',
                    },
                ]}
            />
        )
    },
}

export const Cities: Story = {
    render: () => {
        const [value, setValue] = useState('gdansk')

        return (
            <ButtonsGroup
                value={value}
                onValueChange={setValue}
                options={[
                    {
                        value: 'gdansk',
                        label: 'Gdańsk',
                    },
                    {
                        value: 'warsaw',
                        label: 'Warszawa',
                    },
                    {
                        value: 'krakow',
                        label: 'Kraków',
                    },
                ]}
            />
        )
    },
}