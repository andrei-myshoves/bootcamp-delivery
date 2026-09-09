import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, userEvent, within } from 'storybook/test'

import { CitySelectSheet } from './CitySelectSheet'

const cities = [
    {
        id: '1',
        name: 'Москва',
        latitude: 55.7558,
        longitude: 37.6173,
    },
    {
        id: '2',
        name: 'Санкт-Петербург',
        latitude: 59.9343,
        longitude: 30.3351,
    },
    {
        id: '3',
        name: 'Новосибирск',
        latitude: 55.0084,
        longitude: 82.9357,
    },
    {
        id: '4',
        name: 'Казань',
        latitude: 55.7879,
        longitude: 49.1233,
    },
]

const meta = {
    title: 'UI/CitySelectSheet',
    component: CitySelectSheet,
    parameters: {
        layout: 'centered',
    },
    args: {
        sheetTitle: 'Город отправления',
        placeholder: 'Выберите город',
        cities,
        popularCities: cities.slice(1, 3),
        value: cities[0],
        onChange: fn(),
    },
} satisfies Meta<typeof CitySelectSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await userEvent.click(canvas.getByTestId('city-select-trigger'))
    },
}
