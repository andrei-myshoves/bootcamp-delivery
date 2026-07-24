import type { Meta, StoryObj } from '@storybook/react-vite'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/app/i18n'
import { Footer } from './Footer'

const meta = {
    title: 'Layout/Footer',
    component: Footer,
    args: {
        className: '!block static',
    },
    decorators: [
        Story => (
            <I18nextProvider i18n={i18n}>
                <div className="mx-auto max-w-md border bg-background">
                    <Story />
                </div>
            </I18nextProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
