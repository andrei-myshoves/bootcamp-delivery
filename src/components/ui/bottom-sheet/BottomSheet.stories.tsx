import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/src/components/ui/button/Button'
import {
    BottomSheet,
    BottomSheetTrigger,
    BottomSheetContent,
    BottomSheetHeader,
    BottomSheetTitle,
    BottomSheetDescription,
    BottomSheetFooter,
    BottomSheetClose,
} from './BottomSheet'

const meta: Meta<typeof BottomSheet> = {
    title: 'UI/BottomSheet',
    component: BottomSheet,
}

export default meta

type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {
    render: () => (
        <BottomSheet>
            <BottomSheetTrigger asChild>
                <Button>Open BottomSheet</Button>
            </BottomSheetTrigger>

            <BottomSheetContent>
                <BottomSheetHeader>
                    <BottomSheetTitle>BottomSheet</BottomSheetTitle>

                    <BottomSheetDescription>This is an example of BottomSheet content.</BottomSheetDescription>
                </BottomSheetHeader>

                <div className="py-4">
                    <p>Any React content can be placed here.</p>
                </div>

                <BottomSheetFooter>
                    <BottomSheetClose asChild>
                        <Button size="large">Close</Button>
                    </BottomSheetClose>
                </BottomSheetFooter>
            </BottomSheetContent>
        </BottomSheet>
    ),
}
