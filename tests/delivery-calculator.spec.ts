import { test, expect } from '@playwright/test'

const cities = {
    success: true,
    points: [
        {
            id: '1',
            name: 'Москва',
            latitude: 55.7558,
            longitude: 37.6173,
        },
        {
            id: '2',
            name: 'Санкт-Петербург',
            latitude: 59.9343,
            longitude: 30.3351,
        },
        {
            id: '3',
            name: 'Новосибирск',
            latitude: 55.0084,
            longitude: 82.9357,
        },
    ],
}

const packages = {
    success: true,
    reason: '',
    packages: [
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
            id: 'bag',
            name: 'Пакет',
            length: '30',
            width: '20',
            height: '10',
            weight: '3',
        },
        {
            id: 'pallet',
            name: 'Палета',
            length: '120',
            width: '80',
            height: '15',
            weight: '500',
        },
    ],
}

test.describe('Delivery calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/delivery/points', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(cities),
            })
        })

        await page.route('**/delivery/package/types', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(packages),
            })
        })

        await page.goto('/')
    })

    test('user can select a departure city', async ({ page }) => {
        const cityTrigger = page.getByTestId('city-select-trigger').first()

        await cityTrigger.click()

        const dialog = page.getByRole('dialog')

        await expect(dialog).toBeVisible()

        await dialog
            .getByRole('button', {
                name: 'Санкт-Петербург',
            })
            .click()

        await expect(cityTrigger).toContainText('Санкт-Петербург')
    })

    test('user can close city sheet', async ({ page }) => {
        const cityTrigger = page.getByTestId('city-select-trigger').first()

        await cityTrigger.click()

        const dialog = page.getByRole('dialog')

        await expect(dialog).toBeVisible()

        await dialog
            .getByRole('button', {
                name: /close/i,
            })
            .click()

        await expect(dialog).not.toBeVisible()
    })

    test('user can select a package type', async ({ page }) => {
        const packageTrigger = page.getByRole('button', { name: 'Выберите размер' })

        await packageTrigger.click()

        const dialog = page.getByRole('dialog')

        await expect(dialog).toBeVisible()

        await dialog.getByRole('button', { name: /Короб M/ }).click()

        await expect(page.getByRole('button', { name: /Короб M/ })).toBeVisible()
    })

    test('user can switch to exact package size', async ({ page }) => {
        const packageTrigger = page.getByRole('button', {
            name: 'Выберите размер',
        })

        await packageTrigger.click()

        const dialog = page.getByRole('dialog')

        await dialog
            .getByRole('button', {
                name: 'Точные',
            })
            .click()

        await expect(dialog.getByLabel('Длина')).toBeVisible()
        await expect(dialog.getByLabel('Ширина')).toBeVisible()
        await expect(dialog.getByLabel('Высота')).toBeVisible()
        await expect(dialog.getByLabel('Вес')).toBeVisible()
    })
})
