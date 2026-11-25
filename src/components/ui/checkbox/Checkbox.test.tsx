import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from './Checkbox'

const LABEL = 'Оставить у двери'

describe('Checkbox', () => {
    it('renders unchecked by default', () => {
        render(<Checkbox aria-label="Оставить у двери" />)

        expect(screen.getByRole('checkbox', { name: 'Оставить у двери' })).not.toBeChecked()
    })

    it('renders checked state', () => {
        render(<Checkbox aria-label="Оставить у двери" checked />)

        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('calls onCheckedChange on click', async () => {
        const user = userEvent.setup()
        const onCheckedChange = vi.fn()

        render(<Checkbox aria-label="Оставить у двери" onCheckedChange={onCheckedChange} />)

        await user.click(screen.getByRole('checkbox'))

        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('toggles with keyboard', async () => {
        const user = userEvent.setup()
        const onCheckedChange = vi.fn()

        render(<Checkbox aria-label="Оставить у двери" onCheckedChange={onCheckedChange} />)

        screen.getByRole('checkbox').focus()
        await user.keyboard(' ')

        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('is toggled by its associated label', async () => {
        const user = userEvent.setup()
        const onCheckedChange = vi.fn()

        render(
            <>
                <Checkbox id="door" onCheckedChange={onCheckedChange} />
                <label htmlFor="door">{LABEL}</label>
            </>
        )

        await user.click(screen.getByText(LABEL))

        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('does not toggle when disabled', async () => {
        const user = userEvent.setup()
        const onCheckedChange = vi.fn()

        render(<Checkbox aria-label="Оставить у двери" disabled onCheckedChange={onCheckedChange} />)

        await user.click(screen.getByRole('checkbox'))

        expect(onCheckedChange).not.toHaveBeenCalled()
    })
})
