import type { Decorator } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/app/i18n'

export const I18nDecorator: Decorator = Story => (
    <I18nextProvider i18n={i18n}>
        <Story />
    </I18nextProvider>
)
