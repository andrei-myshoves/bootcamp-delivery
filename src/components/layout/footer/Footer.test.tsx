import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'footer.calculate': 'Расчёт',
                'footer.history': 'История',
                'footer.profile': 'Профиль',
            }

            return translations[key] ?? key
        },
    }),
}))

vi.mock('@tanstack/react-router', () => ({
    useLocation: () => ({
        pathname: '/',
    }),
    useNavigate: () => vi.fn(),
}))

describe('Footer', () => {
    it('renders footer', () => {
        render(<Footer />)

        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('renders three navigation buttons', () => {
        render(<Footer />)

        expect(screen.getByTestId('footer-tab-calculate')).toBeInTheDocument()
        expect(screen.getByTestId('footer-tab-history')).toBeInTheDocument()
        expect(screen.getByTestId('footer-tab-profile')).toBeInTheDocument()
    })

    it('renders all tabs', () => {
        render(<Footer />)

        expect(screen.getByText('Расчёт')).toBeInTheDocument()
        expect(screen.getByText('История')).toBeInTheDocument()
        expect(screen.getByText('Профиль')).toBeInTheDocument()
    })
})
