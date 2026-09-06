import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CitySelectSheet } from './CitySelectSheet'
import type { DeliveryPoint } from '@/store/DeliveryCalculatorStore'

const cities: DeliveryPoint[] = [
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
]

const popularCities = [cities[1], cities[2]]

describe('CitySelectSheet', () => {
    it('opens city sheet', async () => {
        const user = userEvent.setup()

        render(
            <CitySelectSheet
                sheetTitle="Город отправления"
                placeholder="Выберите город"
                cities={cities}
                popularCities={popularCities}
                value={cities[0]}
            />
        )

        await user.click(screen.getByTestId('city-select-trigger'))

        expect(screen.getByRole('heading', { name: 'Город отправления' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Москва' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Санкт-Петербург' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Новосибирск' })).toBeInTheDocument()
    })

    it('calls onChange when city is selected', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <CitySelectSheet
                sheetTitle="Город отправления"
                placeholder="Выберите город"
                cities={cities}
                popularCities={popularCities}
                value={cities[0]}
                onChange={onChange}
            />
        )

        await user.click(screen.getByTestId('city-select-trigger'))
        await user.click(screen.getByRole('button', { name: 'Санкт-Петербург' }))

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(cities[1])
    })

    it('closes sheet after city selection', async () => {
        const user = userEvent.setup()

        render(
            <CitySelectSheet
                sheetTitle="Город отправления"
                placeholder="Выберите город"
                cities={cities}
                popularCities={popularCities}
                value={cities[0]}
                onChange={vi.fn()}
            />
        )

        await user.click(screen.getByTestId('city-select-trigger'))

        expect(screen.getByRole('heading', { name: 'Город отправления' })).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Санкт-Петербург' }))

        expect(screen.queryByRole('heading', { name: 'Город отправления' })).not.toBeInTheDocument()
    })

    it('selects popular city', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <CitySelectSheet
                sheetTitle="Город отправления"
                placeholder="Выберите город"
                cities={cities}
                popularCities={popularCities}
                value={cities[0]}
                onChange={onChange}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Санкт-Петербург' }))

        expect(onChange).toHaveBeenCalledWith(cities[1])
    })
})