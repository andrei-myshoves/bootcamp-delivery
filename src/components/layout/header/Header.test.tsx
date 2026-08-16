import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentWrapper } from '@/shared/tests/ComponentWrapper'

import { Header } from './Header'

vi.mock('./Logo', () => ({
    Logo: () => <div>Logo</div>,
}))

describe('Header', () => {
    it('renders history and profile buttons', () => {
        render(
            <ComponentWrapper>
                <Header />
            </ComponentWrapper>
        )

        expect(
            screen.getByRole('button', {
                name: 'History',
                hidden: true,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Profile',
                hidden: true,
            })
        ).toBeInTheDocument()
    })

    it('renders logout button', () => {
        render(
            <ComponentWrapper>
                <Header />
            </ComponentWrapper>
        )
        expect(
            screen.getByRole('button', {
                name: 'Logout',
            })
        ).toBeInTheDocument()
    })
})
