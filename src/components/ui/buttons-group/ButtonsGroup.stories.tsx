import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { ButtonsGroup } from './ButtonsGroup'
import type { ButtonsGroupOption, ButtonsGroupProps } from './ButtonsGroup'

const meta: Meta<typeof ButtonsGroup> = {
    title: 'UI/ButtonsGroup',
    component: ButtonsGroup,
}

export default meta

type Story = StoryObj<typeof ButtonsGroup>

function renderButtonsGroup(options: ButtonsGroupOption[], initialValue: string, props?: Partial<ButtonsGroupProps>) {
    return function Render() {
        const [value, setValue] = useState(initialValue)

        return (
            <div className="mx-auto w-full max-w-120">
                <ButtonsGroup value={value} onValueChange={setValue} options={options} {...props} />
            </div>
        )
    }
}

export const Default: Story = {
    render: renderButtonsGroup(
        [
            {
                value: 'approximate',
                label: 'Примерные',
            },
            {
                value: 'exact',
                label: 'Точные',
            },
        ],
        'approximate'
    ),
}

export const Sizes: Story = {
    render: renderButtonsGroup(
        [
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
        ],
        'm'
    ),
}

export const Cities: Story = {
    render: renderButtonsGroup(
        [
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
        ],
        'warsaw'
    ),
}

export const Customized: Story = {
    render: renderButtonsGroup(
        [
            {
                value: 'calculate',
                label: 'Calculate',
            },
            {
                value: 'history',
                label: 'History',
            },
            {
                value: 'profile',
                label: 'Profile',
            },
        ],
        'calculate',
        {
            className: 'rounded-full border border-border-hard bg-background shadow-sm',
            indicatorClassName: 'bg-green-500',
            activeButtonClassName: 'text-white',
            buttonClassName: 'flex flex-col items-center gap-1 py-2 text-xs font-medium',
        }
    ),
}
