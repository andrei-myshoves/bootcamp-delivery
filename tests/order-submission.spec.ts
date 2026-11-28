import { test, expect, type Page, type Route } from '@playwright/test'

/**
 * Every test answers the backend itself (page.route), so no request reaches the real API
 * and no order is ever created.
 */
const ORDER_URL = '**/api/v1/delivery/order'

const ORDER_ID = '6745f0c2a1b3c4d5e6f70812'

const expressOption = { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' }

const completeDraft: Record<string, unknown> = {
    calculatedPackageId: 'envelope',
    deliveryOptions: [expressOption],
    selectedDeliveryOption: expressOption,
    fromCity: { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173 },
    toCity: { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351 },
    recipient: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: 'Домофон 17' },
    deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' },
    leaveAtDoor: true,
    payer: 'sender',
}

const seed = async (page: Page, draft: Record<string, unknown>) => {
    await page.goto('/')
    await page.evaluate(values => {
        localStorage.clear()

        for (const [key, value] of Object.entries(values)) {
            // The app stores plain strings (payer, package id) as-is and everything else as JSON.
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
        }
    }, draft)
}

const withoutKey = (draft: Record<string, unknown>, key: string) =>
    Object.fromEntries(Object.entries(draft).filter(([draftKey]) => draftKey !== key))

const fulfillJson = (route: Route, body: unknown, status = 200) =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })

/** Answers the order request with `respond` and records every request body. */
const mockOrderApi = async (page: Page, respond: (route: Route, callIndex: number) => Promise<void>) => {
    const requests: unknown[] = []

    await page.route(ORDER_URL, async route => {
        requests.push(route.request().postDataJSON())
        await respond(route, requests.length - 1)
    })

    return requests
}

const createdOrder = (route: Route) => fulfillJson(route, { success: true, order: { _id: ORDER_ID } })

const continueButton = (page: Page) => page.getByRole('button', { name: /^(Продолжить|Отправка…)$/ })

const viewports = [
    { name: 'desktop', size: { width: 1440, height: 900 } },
    { name: 'mobile', size: { width: 360, height: 740 } },
]

for (const { name, size } of viewports) {
    test.describe(`Order submission (${name})`, () => {
        test.use({ viewport: size })

        test('sends the draft as CreateDeliveryOrderDto and opens the success screen', async ({ page }) => {
            const requests = await mockOrderApi(page, createdOrder)
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await continueButton(page).click()

            await expect(page).toHaveURL(/\/order-success$/)
            await expect(page.getByRole('heading', { level: 1, name: 'Заявка отправлена' })).toBeVisible()
            expect(requests).toEqual([
                {
                    packageId: 'envelope',
                    optionType: 'express',
                    senderPointId: '1',
                    senderAddress: { street: 'Новорогожская', house: '24', apartment: '17', comment: 'Домофон 17' },
                    sender: {
                        firstname: 'Иван',
                        lastname: 'Иванов',
                        middlename: 'Иванович',
                        phone: '+7 999 123 45 67',
                    },
                    receiverPointId: '2',
                    receiverAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', isNonContact: true },
                    receiver: {
                        firstname: 'Алексей',
                        lastname: 'Климов',
                        middlename: 'Алексеевич',
                        phone: '+7 999 999 99 99',
                    },
                    payer: 'sender',
                },
            ])
        })

        test('shows loading and sends one request on a double click', async ({ page }) => {
            let releaseResponse: () => void = () => {}
            const responseReleased = new Promise<void>(resolve => (releaseResponse = resolve))
            const requests = await mockOrderApi(page, async route => {
                await responseReleased
                await createdOrder(route)
            })
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await continueButton(page).dblclick()

            await expect(page.getByRole('button', { name: 'Отправка…' })).toBeDisabled()
            await expect(page.getByRole('button', { name: 'Редактировать данные' })).toBeDisabled()
            releaseResponse()

            await expect(page).toHaveURL(/\/order-success$/)
            expect(requests).toHaveLength(1)
        })

        test('keeps the data on a backend rejection and creates the order on retry', async ({ page }) => {
            const requests = await mockOrderApi(page, (route, callIndex) =>
                callIndex === 0
                    ? fulfillJson(route, { message: ['phone must be a valid phone number'], statusCode: 400 }, 400)
                    : createdOrder(route)
            )
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await continueButton(page).click()

            await expect(page.getByRole('alert')).toHaveText('Заявка не принята: phone must be a valid phone number')
            await expect(page).toHaveURL(/\/order-review$/)
            await expect(page.getByText('Климов Алексей Алексеевич, +7 999 999 99 99')).toBeVisible()
            await expect(continueButton(page)).toBeEnabled()

            await continueButton(page).click()

            await expect(page).toHaveURL(/\/order-success$/)
            expect(requests).toHaveLength(2)
        })

        test('reports a server error', async ({ page }) => {
            await mockOrderApi(page, route => fulfillJson(route, { message: 'Internal server error' }, 500))
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await continueButton(page).click()

            await expect(page.getByRole('alert')).toHaveText('Сервер не смог создать заявку. Попробуйте ещё раз')
            await expect(page).toHaveURL(/\/order-review$/)
        })

        test('reports a network error and keeps the data', async ({ page }) => {
            await mockOrderApi(page, route => route.abort('internetdisconnected'))
            await seed(page, completeDraft)
            await page.goto('/order-review')

            await continueButton(page).click()

            await expect(page.getByRole('alert')).toHaveText(
                'Нет связи с сервером. Проверьте подключение и попробуйте ещё раз'
            )
            await expect(page.getByText('г. Москва, Новорогожская, 24, 17')).toBeVisible()
        })

        test('sends nothing without the calculated package and names the missing value', async ({ page }) => {
            const requests = await mockOrderApi(page, createdOrder)
            await seed(page, withoutKey(completeDraft, 'calculatedPackageId'))
            await page.goto('/order-review')

            await continueButton(page).click()

            await expect(page.getByRole('alert')).toContainText('не хватает данных — размер посылки')
            expect(requests).toHaveLength(0)
        })

        test('a reload of the success screen keeps it and sends nothing again; the draft is cleared', async ({
            page,
        }) => {
            const requests = await mockOrderApi(page, createdOrder)
            await seed(page, completeDraft)
            await page.goto('/order-review')
            await continueButton(page).click()
            await expect(page).toHaveURL(/\/order-success$/)

            await page.reload()

            await expect(page.getByRole('heading', { level: 1, name: 'Заявка отправлена' })).toBeVisible()
            expect(requests).toHaveLength(1)

            // The sent draft is gone, so the checkout starts again from the calculator.
            await page.goto('/order-review')
            await expect(page).toHaveURL(/\/$/)
            expect(await page.evaluate(() => localStorage.getItem('recipient'))).toBeNull()
        })
    })
}

test.describe('Order success screen', () => {
    const openSuccess = async (page: Page) => {
        await mockOrderApi(page, createdOrder)
        await seed(page, completeDraft)
        await page.goto('/order-review')
        await continueButton(page).click()
        await expect(page).toHaveURL(/\/order-success$/)
    }

    test('desktop shows the order details and both actions', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await openSuccess(page)

        const details = page.getByTestId('order-success-details')
        await expect(details.getByText(ORDER_ID)).toBeVisible()
        await expect(details.getByText('Экспресс-доставка')).toBeVisible()
        await expect(details.getByText('г. Санкт-Петербург, Евдокима Огнева, 19, 40')).toBeVisible()
        await expect(details.getByText(/^780\s₽$/)).toBeVisible()
        await expect(details.getByText('Вся информация была продублирована в SMS')).toBeVisible()

        await expect(page.getByRole('button', { name: 'Посмотреть статус' })).toBeHidden()
        await expect(page.getByRole('button', { name: 'Закрыть' })).toBeHidden()

        await page.getByRole('button', { name: 'Статус заявки' }).click()
        await expect(page).toHaveURL(/\/profile$/)

        await page.goBack()
        await page.getByRole('button', { name: 'На главную' }).click()
        await expect(page).toHaveURL(/\/$/)
    })

    test('mobile is centred, has no details and no footer', async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 740 })
        await openSuccess(page)

        await expect(page.getByTestId('order-success-details')).toBeHidden()
        await expect(page.getByRole('button', { name: 'Статус заявки' })).toBeHidden()
        await expect(page.getByRole('button', { name: 'На главную' })).toBeHidden()
        await expect(page.locator('footer')).toHaveCount(0)
        expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)

        const heading = await page.getByRole('heading', { level: 1 }).boundingBox()
        expect((heading?.x ?? 0) + (heading?.width ?? 0) / 2).toBeCloseTo(180, -1)

        await page.getByRole('button', { name: 'Посмотреть статус' }).click()
        await expect(page).toHaveURL(/\/profile$/)

        await page.goBack()
        await page.getByRole('button', { name: 'Закрыть' }).click()
        await expect(page).toHaveURL(/\/$/)
    })

    test('a direct visit without a created order opens the calculator', async ({ page }) => {
        await seed(page, completeDraft)

        await page.goto('/order-success')

        await expect(page).toHaveURL(/\/$/)
    })
})
