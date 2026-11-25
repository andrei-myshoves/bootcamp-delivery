import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { InfoTooltip } from './InfoTooltip'

// jsdom has no ResizeObserver; Radix Popover uses it to measure the arrow.
beforeAll(() => {
    vi.stubGlobal(
        'ResizeObserver',
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        }
    )
})

const props = {
    title: 'Бесконтактная доставка',
    description: 'Курьер оставит заказ у двери',
    triggerLabel: 'Что такое бесконтактная доставка',
    closeLabel: 'Закрыть подсказку',
}

const getTrigger = () => screen.getByRole('button', { name: props.triggerLabel })

describe('InfoTooltip', () => {
    it('is closed by default', () => {
        render(<InfoTooltip {...props} />)

        expect(screen.queryByText(props.title)).not.toBeInTheDocument()
    })

    it('opens on mouse hover', () => {
        render(<InfoTooltip {...props} />)

        fireEvent.pointerEnter(getTrigger(), { pointerType: 'mouse' })

        expect(screen.getByText(props.title)).toBeInTheDocument()
        expect(screen.getByText(props.description)).toBeInTheDocument()
    })

    it('ignores touch pointer enter and opens on tap instead', () => {
        render(<InfoTooltip {...props} />)

        fireEvent.pointerEnter(getTrigger(), { pointerType: 'touch' })
        expect(screen.queryByText(props.title)).not.toBeInTheDocument()

        fireEvent.pointerDown(getTrigger(), { pointerType: 'touch' })
        fireEvent.click(getTrigger())
        expect(screen.getByText(props.title)).toBeInTheDocument()
    })

    it('toggles with Enter and keeps focus on the trigger', async () => {
        const user = userEvent.setup()

        render(<InfoTooltip {...props} />)

        getTrigger().focus()
        await user.keyboard('{Enter}')

        expect(screen.getByText(props.title)).toBeInTheDocument()
        expect(getTrigger()).toHaveFocus()

        await user.keyboard('{Enter}')

        expect(screen.queryByText(props.title)).not.toBeInTheDocument()
    })

    it('closes on Escape', async () => {
        const user = userEvent.setup()

        render(<InfoTooltip {...props} />)

        getTrigger().focus()
        await user.keyboard('{Enter}')
        await user.keyboard('{Escape}')

        expect(screen.queryByText(props.title)).not.toBeInTheDocument()
    })

    it('closes with the close button', async () => {
        const user = userEvent.setup()

        render(<InfoTooltip {...props} />)

        getTrigger().focus()
        await user.keyboard('{Enter}')
        await user.click(screen.getByRole('button', { name: props.closeLabel }))

        expect(screen.queryByText(props.title)).not.toBeInTheDocument()
    })
})
