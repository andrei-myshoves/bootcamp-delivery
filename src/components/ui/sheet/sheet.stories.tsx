import type { Meta, StoryObj } from '@storybook/react'

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './sheet'

import { Button } from '@/components/ui/button/Button'

const meta = {
    title: 'UI/Sheet',
    component: Sheet,
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Open sheet</Button>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Title</SheetTitle>
                    <SheetDescription>Description</SheetDescription>
                </SheetHeader>

                <div className="p-4">Content</div>
            </SheetContent>
        </Sheet>
    ),
}

export const Right: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Open sheet</Button>
            </SheetTrigger>

            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Right sheet</SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    ),
}
