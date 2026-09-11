import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from './sheet'

describe('Sheet', () => {
    it('opens after trigger click', async () => {
        const user = userEvent.setup()

        render(
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>

                <SheetContent>
                    <SheetTitle>Sheet title</SheetTitle>
                </SheetContent>
            </Sheet>
        )

        expect(screen.queryByText('Sheet title')).not.toBeInTheDocument()

        await user.click(screen.getByText('Open'))

        expect(screen.getByText('Sheet title')).toBeInTheDocument()
    })

    it('closes after pressing Escape', async () => {
        const user = userEvent.setup()

        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetTitle>Sheet title</SheetTitle>
                </SheetContent>
            </Sheet>
        )

        expect(screen.getByText('Sheet title')).toBeInTheDocument()

        await user.keyboard('{Escape}')

        expect(screen.queryByText('Sheet title')).not.toBeInTheDocument()
    })
})
