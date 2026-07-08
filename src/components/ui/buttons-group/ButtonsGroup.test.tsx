import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ButtonsGroup } from './buttons-group'

describe('ButtonsGroup', () => {
    const options = [
        {
            value: 'first',
            label: 'First',
        },
        {
            value: 'second',
            label: 'Second',
        },
        {
            value: 'third',
            label: 'Third',
        },
    ]

    it('renders two buttons when two options are provided', () => {
        render(<ButtonsGroup value="first" onValueChange={vi.fn()} options={options.slice(0, 2)} />)

        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('renders three buttons when three options are provided', () => {
        render(<ButtonsGroup value="first" onValueChange={vi.fn()} options={options} />)

        expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('calls onValueChange when a button is clicked', async () => {
        const user = userEvent.setup()
        const onValueChange = vi.fn()

        render(<ButtonsGroup value="first" onValueChange={onValueChange} options={options.slice(0, 2)} />)

        await user.click(
            screen.getByRole('button', {
                name: 'Second',
            })
        )

        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledWith('second')
    })

    it('moves indicator when selected value changes', () => {
        const { rerender } = render(
            <ButtonsGroup value="first" onValueChange={vi.fn()} options={options.slice(0, 2)} />
        )

        const indicator = screen.getByTestId('buttons-group-indicator')

        expect(indicator.style.transform).toBe('translateX(0%)')

        rerender(<ButtonsGroup value="second" onValueChange={vi.fn()} options={options.slice(0, 2)} />)
				
        expect(indicator.style.transform).toBe('translateX(100%)')
    })
})
