import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
    it('renders input', () => {
        render(<Input />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders label', () => {
        render(<Input label="Username" />)

        expect(screen.getByLabelText('Username')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
        render(<Input placeholder="Enter username" />)

        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
    })

    it('calls onChange', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<Input onChange={onChange} />)

        await user.type(screen.getByRole('textbox'), 'Hello')

        expect(onChange).toHaveBeenCalled()
    })

    it('renders default value', () => {
        render(<Input defaultValue="John" />)

        expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    })

    it('renders disabled input', () => {
        render(<Input disabled />)

        expect(screen.getByRole('textbox')).toBeDisabled()
    })
})
