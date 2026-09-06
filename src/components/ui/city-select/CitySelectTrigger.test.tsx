import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CitySelectTrigger } from './CitySelectTrigger'

describe('CitySelectTrigger', () => {
    it('renders selected value', () => {
        render(<CitySelectTrigger value="Москва" placeholder="Выберите город" />)

        expect(screen.getByText('Москва')).toBeInTheDocument()
    })

    it('renders placeholder when value is not provided', () => {
        render(<CitySelectTrigger placeholder="Выберите город" />)

        expect(screen.getByText('Выберите город')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()

        render(<CitySelectTrigger value="Москва" placeholder="Выберите город" onClick={onClick} />)

        await user.click(screen.getByTestId('city-select-trigger'))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('shows selected indicator', () => {
        render(<CitySelectTrigger value="Москва" placeholder="Выберите город" selected />)

        const trigger = screen.getByTestId('city-select-trigger')
        const indicator = trigger.querySelector('div > div')

        expect(indicator).toHaveClass('border-green-500')
    })
})
