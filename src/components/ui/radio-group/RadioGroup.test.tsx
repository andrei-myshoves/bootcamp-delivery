import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from './RadioGroup'

const RECEIVER = 'Получатель'
const SENDER = 'Отправитель'

const renderGroup = (props: Partial<React.ComponentProps<typeof RadioGroup>> = {}) =>
    render(
        <RadioGroup aria-label="Кто оплачивает доставку" {...props}>
            <div>
                <RadioGroupItem id="receiver" value="receiver" />
                <label htmlFor="receiver">{RECEIVER}</label>
            </div>
            <div>
                <RadioGroupItem id="sender" value="sender" />
                <label htmlFor="sender">{SENDER}</label>
            </div>
        </RadioGroup>
    )

describe('RadioGroup', () => {
    it('renders a radio group with its options', () => {
        renderGroup()

        expect(screen.getByRole('radiogroup', { name: 'Кто оплачивает доставку' })).toBeInTheDocument()
        expect(screen.getAllByRole('radio')).toHaveLength(2)
    })

    it('marks the selected value as checked', () => {
        renderGroup({ value: 'receiver' })

        expect(screen.getByRole('radio', { name: RECEIVER })).toBeChecked()
        expect(screen.getByRole('radio', { name: SENDER })).not.toBeChecked()
    })

    it('calls onValueChange when an option is clicked', async () => {
        const user = userEvent.setup()
        const onValueChange = vi.fn()

        renderGroup({ value: 'receiver', onValueChange })

        await user.click(screen.getByRole('radio', { name: SENDER }))

        expect(onValueChange).toHaveBeenCalledWith('sender')
    })

    it('selects an option by clicking its label', async () => {
        const user = userEvent.setup()
        const onValueChange = vi.fn()

        renderGroup({ value: 'receiver', onValueChange })

        await user.click(screen.getByText(SENDER))

        expect(onValueChange).toHaveBeenCalledWith('sender')
    })
})
