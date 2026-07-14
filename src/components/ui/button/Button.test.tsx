import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>)

        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()

        render(<Button onClick={onClick}>Click me</Button>)

        await user.click(screen.getByRole('button'))

        expect(onClick).toHaveBeenCalledOnce()
    })

    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()

        render(
            <Button disabled onClick={onClick}>
                Click me
            </Button>
        )

        await user.click(screen.getByRole('button'))

        expect(onClick).not.toHaveBeenCalled()
    })

    it('renders disabled button', () => {
        render(<Button disabled>Click me</Button>)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders children', () => {
        render(
            <Button>
                <span>Custom content</span>
            </Button>
        )

        expect(screen.getByText('Custom content')).toBeInTheDocument()
    })
})
