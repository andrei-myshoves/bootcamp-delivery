import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';

const meta = {
    title: 'Layout/Header/Logo',
    component: Logo,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};