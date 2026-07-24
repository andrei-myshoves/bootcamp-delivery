import '@testing-library/jest-dom/vitest'

import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { describe, expect, it } from 'vitest'
import { Router } from 'wouter'

import i18n from '@/app/i18n'

import { Footer } from './Footer'

function renderFooter() {
    return render(
        <Router>
            <I18nextProvider i18n={i18n}>
                <Footer className="block static" />
            </I18nextProvider>
        </Router>
    )
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

    it('renders all navigation labels', () => {
        renderFooter()

        expect(screen.getByText('Расчёт')).toBeInTheDocument()
        expect(screen.getByText('История')).toBeInTheDocument()
        expect(screen.getByText('Профиль')).toBeInTheDocument()
    })
})
