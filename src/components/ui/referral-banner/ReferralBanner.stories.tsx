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

export const Mobile: Story = {
    args: {
        className: 'h-[90px] w-[328px]',
        imageClassName: 'right-0 bottom-0 h-full',
    },
}

export const Desktop: Story = {
    args: {
        className: 'h-[172px] w-[596px] p-8',
        imageClassName: 'right-0 bottom-0 h-[115%]',
    },
}
