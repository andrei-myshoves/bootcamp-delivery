import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from './Header'

describe('Header', () => {
    it('renders history and profile buttons', () => {
        render(<Header />)

        expect(screen.getByRole('button', { name: 'History' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
    })

    it('renders logout button', () => {
        render(<Header />)

        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
    })
})
