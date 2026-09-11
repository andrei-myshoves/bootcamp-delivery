import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import Envelope from '@/shared/assets/Envelope.svg'
import BoxXS from '@/shared/assets/Box XS.svg'
import BoxS from '@/shared/assets/Box S.svg'
import BoxM from '@/shared/assets/Box M.svg'
import BoxL from '@/shared/assets/Box L.svg'
import BoxXL from '@/shared/assets/Box XL.svg'

import { PackageSelectSheet, type PackageSelectItem } from './PackageSelectSheet'

const packages: PackageSelectItem[] = [
    {
        id: 'envelope',
        name: 'Конверт',
        length: '30',
        width: '20',
        height: '1',
        weight: '1',
    },
    {
        id: 'box-xs',
        name: 'Короб XS',
        length: '15',
        width: '15',
        height: '15',
        weight: '3',
    },
    {
        id: 'box-s',
        name: 'Короб S',
        length: '20',
        width: '20',
        height: '20',
        weight: '5',
    },
    {
        id: 'box-m',
        name: 'Короб M',
        length: '30',
        width: '30',
        height: '30',
        weight: '10',
    },
    {
        id: 'box-l',
        name: 'Короб L',
        length: '40',
        width: '40',
        height: '40',
        weight: '15',
    },
    {
        id: 'box-xl',
        name: 'Короб XL',
        length: '50',
        width: '50',
        height: '50',
        weight: '20',
    },
]

const packageImages = {
    envelope: Envelope,
    'box-xs': BoxXS,
    'box-s': BoxS,
    'box-m': BoxM,
    'box-l': BoxL,
    'box-xl': BoxXL,
}

const meta = {
    title: 'Layout/PackageSelectSheet',
    component: PackageSelectSheet,
    parameters: {
        layout: 'centered',
    },
    args: {
        packages,
        value: null,
        images: packageImages,
        onChange: fn(),
    },
} satisfies Meta<typeof PackageSelectSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
