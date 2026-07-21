import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
    BottomSheet,
    BottomSheetContent,
    BottomSheetDescription,
    BottomSheetTitle,
    BottomSheetTrigger,
} from './BottomSheet'

describe('BottomSheet', () => {
    it('opens when trigger is clicked', async () => {
        const user = userEvent.setup()

        render(
            <BottomSheet>
                <BottomSheetTrigger>Open</BottomSheetTrigger>

                <BottomSheetContent>
                    <BottomSheetTitle>Title</BottomSheetTitle>
                    <BottomSheetDescription>Description</BottomSheetDescription>
                </BottomSheetContent>
            </BottomSheet>
        )

        await user.click(screen.getByRole('button', { name: 'Open' }))

        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('renders trigger', () => {
        render(
            <BottomSheet>
                <BottomSheetTrigger>Open</BottomSheetTrigger>
            </BottomSheet>
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    })
})
