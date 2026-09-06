import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReferralBanner } from './ReferralBanner'

describe('ReferralBanner', () => {
    const props = {
        title: 'Пригласите друга',
        subtitle: 'Получите бонус за приглашение',
        image: '/referral.png',
    }

    it('renders title and subtitle', () => {
        render(<ReferralBanner {...props} />)

        expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument()
        expect(screen.getByText(props.subtitle)).toBeInTheDocument()
    })

    it('renders image', () => {
        render(<ReferralBanner {...props} imageAlt="Referral" />)

        expect(screen.getByRole('img', { name: 'Referral' })).toHaveAttribute('src', props.image)
    })

    it('hides decorative image from accessibility tree', () => {
        render(<ReferralBanner {...props} />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
})
