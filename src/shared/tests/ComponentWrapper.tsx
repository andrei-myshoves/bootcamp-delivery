import type { PropsWithChildren } from 'react'

import { I18nextProvider } from 'react-i18next'
import { Router } from 'wouter'

import i18n from '@/app/i18n'

export function ComponentWrapper({ children }: PropsWithChildren) {
    return (
        <Router>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </Router>
    )
}
