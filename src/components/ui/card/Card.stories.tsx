import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './card'

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
    render: () => <Card className="max-w-md">Card content</Card>,
}
