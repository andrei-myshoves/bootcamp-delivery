import { test, expect, type Page } from '@playwright/test'

const checkoutDraft = {
    selectedDeliveryOption: { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' },
    recipient: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
    deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' },
}

const viewports = [
    { name: 'desktop', size: { width: 1440, height: 900 } },
    { name: 'mobile', size: { width: 360, height: 740 } },
]

const seedCheckoutDraft = async (page: Page) => {
    // Seed once per test; later reloads must keep what the app itself saved.
    await page.goto('/')
    await page.evaluate(draft => {
        localStorage.clear()

        for (const [key, value] of Object.entries(draft)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, checkoutDraft)
}

type PayerLabel = 'Получатель' | 'Отправитель'

const payerRadio = (page: Page, name: PayerLabel) => page.getByRole('radio', { name })

// Clicks the option label inside the radio group (the order card repeats the same words).
const choosePayerByLabel = (page: Page, name: PayerLabel) =>
    page.getByRole('radiogroup', { name: 'Кто оплачивает доставку' }).getByText(name, { exact: true }).click()

for (const { name, size } of viewports) {
    test.describe(`Delivery payment (${name})`, () => {
        test.use({ viewport: size })

        test.beforeEach(async ({ page }) => {
            await seedCheckoutDraft(page)
        })

        test('continues from the delivery address step to the payment step', async ({ page }) => {
            await page.goto('/delivery-address')
            await page.getByRole('button', { name: 'Продолжить' }).click()

            await expect(page).toHaveURL(/\/delivery-payment$/)
            await expect(page.getByRole('heading', { level: 1, name: 'Оплата доставки' })).toBeVisible()
            await expect(page.getByText('Шаг 6 из 7')).toBeVisible()
        })

        test('shows both payers with the receiver preselected', async ({ page }) => {
            await page.goto('/delivery-payment')

            await expect(page.getByRole('radiogroup', { name: 'Кто оплачивает доставку' })).toBeVisible()
            await expect(payerRadio(page, 'Получатель')).toBeChecked()
            await expect(payerRadio(page, 'Отправитель')).not.toBeChecked()
        })

        test('selects the sender and keeps it after a reload', async ({ page }) => {
            await page.goto('/delivery-payment')

            await choosePayerByLabel(page, 'Отправитель')
            await expect(payerRadio(page, 'Отправитель')).toBeChecked()

            await page.reload()

            await expect(payerRadio(page, 'Отправитель')).toBeChecked()
            await expect(payerRadio(page, 'Получатель')).not.toBeChecked()
        })

        test('changes the payer with arrow keys', async ({ page }) => {
            await page.goto('/delivery-payment')

            await payerRadio(page, 'Получатель').focus()

            // Radix moves focus in a timeout after keydown and checks the radio only while the arrow is still held,
            // so hold the key like a real keypress instead of an instant press().
            await page.keyboard.down('ArrowDown')
            await page.waitForTimeout(50)
            await page.keyboard.up('ArrowDown')

            await expect(payerRadio(page, 'Отправитель')).toBeChecked()
        })

        test('goes back to the delivery address step and keeps the choice', async ({ page }) => {
            await page.goto('/delivery-payment')
            await choosePayerByLabel(page, 'Отправитель')

            // Desktop shows the «Назад» button, mobile the chevron in the header; only one is visible per viewport.
            await page.getByRole('button', { name: 'Назад' }).click()
            await expect(page).toHaveURL(/\/delivery-address$/)

            await page.getByRole('button', { name: 'Продолжить' }).click()
            await expect(payerRadio(page, 'Отправитель')).toBeChecked()
        })
    })
}

test.describe('Delivery payment layout', () => {
    test('desktop shows breadcrumbs and the order card with the payer', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await seedCheckoutDraft(page)
        await page.goto('/delivery-payment')

        const breadcrumbs = page.getByRole('navigation', { name: 'Шаги оформления заказа' })
        await expect(breadcrumbs).toBeVisible()
        await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveText('Оплата доставки')

        const orderCard = page.locator('aside')
        await expect(orderCard).toContainText('Кто оплачивает доставку')
        await expect(orderCard).toContainText('Получатель')

        await choosePayerByLabel(page, 'Отправитель')
        await expect(orderCard.locator('dd').last()).toHaveText('Отправитель')
    })

    test('mobile hides breadcrumbs and shows the step question in the footer', async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 740 })
        await seedCheckoutDraft(page)
        await page.goto('/delivery-payment')

        await expect(page.getByRole('navigation', { name: 'Шаги оформления заказа' })).toBeHidden()
        await expect(page.locator('footer')).toContainText('Кто оплачивает доставку?')

        const hasHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth
        )
        expect(hasHorizontalOverflow).toBe(false)
    })
})
