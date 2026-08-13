import { test, expect } from '@playwright/test'

const cities = {
    success: true,
    points: [
        {
            id: '1',
            name: 'Warszawa',
            latitude: '',
            longitude: '',
        },
        {
            id: '2',
            name: 'Gdańsk',
            latitude: '',
            longitude: '',
        },
        {
            id: '3',
            name: 'Kraków',
            latitude: '',
            longitude: '',
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

        await page.goto('/')
    })

    test('user can select a departure city', async ({ page }) => {
        const cityTrigger = page.getByTestId('city-select-trigger').first()

        await cityTrigger.click()

        const dialog = page.getByRole('dialog')

        await expect(dialog).toBeVisible()

        await dialog
            .getByRole('button', {
                name: 'Gdańsk',
            })
            .click()

        await expect(cityTrigger).toContainText('Gdańsk')
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
})
