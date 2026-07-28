import '@testing-library/jest-dom/vitest'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComponentWrapper } from '@/shared/tests/ComponentWrapper'

import { Footer } from './Footer'

function renderFooter() {
    return render(<Footer />, {
        wrapper: ComponentWrapper,
    })
}

describe('Footer', () => {
    it('renders navigation', () => {
        renderFooter()

        expect(
            screen.getByRole('navigation', {
                name: /bottom navigation/i,
            })
        ).toBeInTheDocument()
    })

    it('renders three navigation buttons', () => {
        renderFooter()

        expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('renders all tabs', () => {
        renderFooter()

        expect(screen.getByTestId('footer-tab-calculate')).toBeInTheDocument()
        expect(screen.getByTestId('footer-tab-history')).toBeInTheDocument()
        expect(screen.getByTestId('footer-tab-profile')).toBeInTheDocument()
    })
})
