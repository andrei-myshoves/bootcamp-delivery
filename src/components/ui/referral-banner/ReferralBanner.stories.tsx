import type { Meta, StoryObj } from '@storybook/react-vite'

import { ReferralBanner } from './ReferralBanner'

import ReferalBannerHands from '@/shared/assets/ReferalBannerHands.webp'

const meta = {
    title: 'UI/ReferralBanner',
    component: ReferralBanner,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Бесплатная доставка',
        subtitle: 'за приведенного друга',
        image: ReferalBannerHands,
    },
} satisfies Meta<typeof ReferralBanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    decorators: [
        Story => (
            <div className="w-full max-w-149 min-w-149">
                <Story />
            </div>
        ),
    ],
    args: {
        className: 'h-[172px] w-full p-8',
        imageClassName: 'right-0 bottom-0 h-[115%]',
    },
}
