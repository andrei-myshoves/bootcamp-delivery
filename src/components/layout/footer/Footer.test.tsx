import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

const mockLocation = vi.hoisted(() => ({ pathname: '/' }))

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
    useLocation: () => mockLocation,
    useNavigate: () => vi.fn(),
}))

describe('Footer', () => {
    beforeEach(() => {
        mockLocation.pathname = '/'
    })

    it.each([
        ['/recipient', 'footer.stepRecipient'],
        ['/sender', 'footer.stepSender'],
        ['/pickup-address', 'footer.stepPickupAddress'],
        ['/delivery-address', 'footer.stepDeliveryAddress'],
        ['/delivery-payment', 'footer.stepDeliveryPayment'],
    ])('shows the checkout total panel with the step question on %s', (pathname, titleKey) => {
        mockLocation.pathname = pathname

        render(<Footer />)

        expect(screen.getByText(titleKey)).toBeInTheDocument()
        expect(screen.queryByTestId('footer-tab-calculate')).not.toBeInTheDocument()
    })

    it.each(['/deliverymethod', '/order-review'])('renders no footer on %s', pathname => {
        mockLocation.pathname = pathname

        render(<Footer />)

        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
    })

    it('shows the fallback total in rubles, not kopecks, before a tariff is selected', () => {
        mockLocation.pathname = '/recipient'

        render(<Footer />)

        expect(screen.getByText(/^от 250\s₽$/)).toBeInTheDocument()
    })

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
