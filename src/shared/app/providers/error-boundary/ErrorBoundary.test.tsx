import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

function ThrowError(): never {
    throw new Error('Boom')
}

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Hello world</div>
            </ErrorBoundary>
        )

        expect(screen.getByText('Hello world')).toBeInTheDocument()
    })

    it('renders fallback when child throws an error', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        )

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()

        consoleError.mockRestore()
    })
})