import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PackageSelectSheet, type PackageSelectItem } from './PackageSelectSheet'

const packages: PackageSelectItem[] = [
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
]

describe('PackageSelectSheet', () => {
    it('opens package sheet', async () => {
        const user = userEvent.setup()

        render(<PackageSelectSheet packages={packages} value={null} onChange={vi.fn()} />)

        await user.click(
            screen.getByRole('button', {
                name: 'Выберите размер',
            })
        )

        expect(screen.getByRole('heading', { name: 'Размер посылки' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Короб S/ })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Короб M/ })).toBeInTheDocument()
    })

    it('calls onChange when package is selected', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<PackageSelectSheet packages={packages} value={null} onChange={onChange} />)

        await user.click(
            screen.getByRole('button', {
                name: 'Выберите размер',
            })
        )

        await user.click(
            screen.getByRole('button', {
                name: /Короб M/,
            })
        )

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(packages[1])
    })

    it('shows exact size inputs when exact mode is selected', async () => {
        const user = userEvent.setup()

        render(<PackageSelectSheet packages={packages} value={null} onChange={vi.fn()} />)

        await user.click(
            screen.getByRole('button', {
                name: 'Выберите размер',
            })
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Точные',
            })
        )

        expect(screen.getByLabelText('Длина')).toBeInTheDocument()
        expect(screen.getByLabelText('Ширина')).toBeInTheDocument()
        expect(screen.getByLabelText('Высота')).toBeInTheDocument()
        expect(screen.getByLabelText('Вес')).toBeInTheDocument()
    })
})
