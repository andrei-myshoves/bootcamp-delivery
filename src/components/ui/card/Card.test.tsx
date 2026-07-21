import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './Card'

describe('Card', () => {
    it('renders children', () => {
        render(
            <Card>
                <p>Card content</p>
            </Card>
        )

        expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(
            <Card className="custom-class">
                <p>Card content</p>
            </Card>
        )

        expect(screen.getByText('Card content').parentElement).toHaveClass('custom-class')
    })
})
