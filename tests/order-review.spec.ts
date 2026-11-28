import { test, expect, type Page } from '@playwright/test'

const expressOption = { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' }

/** A complete draft up to step 6 (the payer defaults to the receiver). */
const completeDraft: Record<string, unknown> = {
    deliveryOptions: [expressOption],
    selectedDeliveryOption: expressOption,
    fromCity: { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173 },
    toCity: { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351 },
    recipient: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
    deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' },
}

const withoutKey = (draft: Record<string, unknown>, key: string) =>
    Object.fromEntries(Object.entries(draft).filter(([draftKey]) => draftKey !== key))

const seed = async (page: Page, draft: Record<string, unknown>) => {
    await page.goto('/')
    await page.evaluate(values => {
        localStorage.clear()

        for (const [key, value] of Object.entries(values)) {
            // The app stores plain strings (the payer) as-is and everything else as JSON.
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
        }
    }, draft)
}

const detailValue = (page: Page, label: string) =>
    page
        .locator('dl > div')
        .filter({ has: page.getByRole('term').getByText(label, { exact: true }) })
        .getByRole('definition')

const viewports = [
    { name: 'desktop', size: { width: 1440, height: 900 } },
    { name: 'mobile', size: { width: 360, height: 740 } },
]

for (const { name, size } of viewports) {
    test.describe(`Order review (${name})`, () => {
        test.use({ viewport: size })

        test('shows every entered value, the payer and the total in rubles', async ({ page }) => {
            await seed(page, { ...completeDraft, payer: 'sender' })
            await page.goto('/order-review')

            await expect(page.getByRole('heading', { level: 1, name: 'Проверка данных' })).toBeVisible()
            await expect(page.getByText('Шаг 7 из 7')).toBeVisible()

            await expect(detailValue(page, 'Тип доставки')).toHaveText('Экспресс-доставка')
            await expect(detailValue(page, 'Получатель')).toHaveText('Климов Алексей Алексеевич, +7 999 999 99 99')
            await expect(detailValue(page, 'Отправитель')).toHaveText('Иванов Иван Иванович, +7 999 123 45 67')
            await expect(detailValue(page, 'Откуда забрать')).toHaveText('г. Москва, Новорогожская, 24, 17')
            await expect(detailValue(page, 'Куда доставить')).toHaveText('г. Санкт-Петербург, Евдокима Огнева, 19, 40')
            await expect(detailValue(page, 'Кто оплачивает доставку')).toHaveText('Отправитель')

            await expect(page.getByText(/^780\s₽$/)).toBeVisible()
        })

        test('keeps all data after a reload', async ({ page }) => {
            await seed(page, completeDraft)
            await page.goto('/order-review')
            await page.reload()

            await expect(page).toHaveURL(/\/order-review$/)
            await expect(detailValue(page, 'Куда доставить')).toHaveText('г. Санкт-Петербург, Евдокима Огнева, 19, 40')
        })

        test('continues from the payment step and reflects a changed payer', async ({ page }) => {
            await seed(page, completeDraft)
            await page.goto('/delivery-payment')

            await page.getByRole('radiogroup').getByText('Отправитель', { exact: true }).click()
            await page.getByRole('button', { name: 'Продолжить' }).click()

            await expect(page).toHaveURL(/\/order-review$/)
            await expect(detailValue(page, 'Кто оплачивает доставку')).toHaveText('Отправитель')
        })

        test('«Назад» returns to the payment step', async ({ page }) => {
            await seed(page, completeDraft)
            await page.goto('/order-review')

            // Desktop shows the «Назад» button, mobile the chevron in the header; one is visible per viewport.
            await page.getByRole('button', { name: 'Назад' }).click()

            await expect(page).toHaveURL(/\/delivery-payment$/)
        })

        test('«Редактировать данные» opens the recipient step with the data kept', async ({ page }) => {
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await page.getByRole('button', { name: 'Редактировать данные' }).click()

            await expect(page).toHaveURL(/\/recipient$/)
            await expect(page.getByLabel('Фамилия')).toHaveValue('Климов')
        })
    })
}

test.describe('Order review layout', () => {
    test('desktop shows breadcrumbs and two columns', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await seed(page, completeDraft)
        await page.goto('/order-review')

        const breadcrumbs = page.getByRole('navigation', { name: 'Шаги оформления заказа' })
        await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveText('Проверка данных')

        const typeBox = await detailValue(page, 'Тип доставки').boundingBox()
        const pickupBox = await detailValue(page, 'Откуда забрать').boundingBox()
        expect(pickupBox?.x).toBeGreaterThan((typeBox?.x ?? 0) + 300)
        expect(pickupBox?.y).toBeCloseTo(typeBox?.y ?? 0, 0)
    })

    test('mobile shows one column and no footer panel', async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 740 })
        await seed(page, completeDraft)
        await page.goto('/order-review')

        const typeBox = await detailValue(page, 'Тип доставки').boundingBox()
        const pickupBox = await detailValue(page, 'Откуда забрать').boundingBox()
        expect(pickupBox?.x).toBeCloseTo(typeBox?.x ?? 0, 0)
        expect(pickupBox?.y).toBeGreaterThan(typeBox?.y ?? 0)

        await expect(page.locator('footer')).toHaveCount(0)
        expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)
    })
})

test.describe('Checkout route guards', () => {
    test('sends a direct visit without a calculation to the calculator', async ({ page }) => {
        await seed(page, {})

        for (const path of ['/deliverymethod', '/recipient', '/delivery-payment', '/order-review']) {
            await page.goto(path)
            await expect(page).toHaveURL(/\/$/)
        }
    })

    test('redirects to the first incomplete step', async ({ page }) => {
        await seed(page, withoutKey(completeDraft, 'sender'))

        await page.goto('/order-review')

        await expect(page).toHaveURL(/\/sender$/)
        await expect(page.getByRole('heading', { level: 1, name: 'Отправитель' }).first()).toBeAttached()
    })

    test('requires the pickup apartment before the delivery address step', async ({ page }) => {
        await seed(page, {
            ...completeDraft,
            pickupAddress: { street: 'Новорогожская', house: '24', apartment: '', courierNote: '' },
        })

        await page.goto('/delivery-address')

        await expect(page).toHaveURL(/\/pickup-address$/)
    })

    test('lets the user go back to earlier steps', async ({ page }) => {
        await seed(page, withoutKey(completeDraft, 'deliveryAddress'))

        for (const path of ['/deliverymethod', '/recipient', '/sender', '/pickup-address', '/delivery-address']) {
            await page.goto(path)
            await expect(page).toHaveURL(new RegExp(`${path}$`))
        }
    })

    test('step 4 shows an apartment error and does not continue without it', async ({ page }) => {
        await seed(page, {
            ...completeDraft,
            pickupAddress: { street: 'Новорогожская', house: '24', apartment: '', courierNote: '' },
        })
        await page.goto('/pickup-address')

        await page.getByRole('button', { name: 'Продолжить' }).click()

        await expect(page.getByText('Заполните квартиру')).toBeVisible()
        await expect(page).toHaveURL(/\/pickup-address$/)
    })
})
