import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UiSelect } from './Select'

const options = [
    {
        value: 'apple',
        label: 'Apple',
    },
    {
        value: 'banana',
        label: 'Banana',
    },
]

describe('UiSelect', () => {
    it('renders placeholder', () => {
        render(<UiSelect placeholder="Select fruit" options={options} />)

        expect(screen.getByText('Select fruit')).toBeInTheDocument()
    })

    it('renders combobox', () => {
        render(<UiSelect placeholder="Select fruit" options={options} />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders without crashing', () => {
        const { container } = render(<UiSelect placeholder="Select fruit" options={options} />)

        expect(container).toBeTruthy()
    })
})
