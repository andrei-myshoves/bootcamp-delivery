import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import { Card } from './card'
import { Input } from '../input/input'

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
    render: () => <Card className="max-w-md">Card content</Card>,
}

export const DeliveryForm: Story = {
    render: () => (
        <Card className="max-w-md">
            <h3 className="text-xl font-semibold">Рассчитать доставку</h3>

            <Input placeholder="Откуда" />

            <Input placeholder="Куда" />

            <Button className="w-full" size="large">
                Рассчитать
            </Button>
        </Card>
    ),
}

export const Banner: Story = {
    render: () => (
        <Card className="max-w-md">
            <h3 className="text-xl font-semibold">Бесплатная доставка</h3>

            <p className="text-muted-foreground">За приведенного друга</p>
        </Card>
    ),
}
