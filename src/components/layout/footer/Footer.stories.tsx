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
            <div className="bg-background mx-auto max-w-md border">
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
