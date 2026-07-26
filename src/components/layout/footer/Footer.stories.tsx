import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'

const meta = {
    title: 'Layout/Footer',
    component: Footer,
    args: {
        className: '!static !block',
    },
    decorators: [
        Story => (
            <div className="mx-auto max-w-md border bg-background">
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
