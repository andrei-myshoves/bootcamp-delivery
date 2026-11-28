import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { DeliveryCalculatorStore } from '@/store/DeliveryCalculatorStore'

const expressOption = { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' }
const envelope = { id: 'envelope', name: 'Конверт', length: '42', width: '36', height: '5', weight: '2' }

/** Node's Request rejects the relative `/api/v1/...` URL a browser resolves against the page; resolve it the same way. */
class BrowserLikeRequest extends Request {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
        super(typeof input === 'string' ? new URL(input, window.location.href) : input, init)
    }
}

const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const createdOrder = { success: true, order: { _id: '6745f0c2a1b3c4d5e6f70812' } }

/** Fills the draft through the same actions the checkout steps use; the tariffs come from a real calculation call. */
const fillDraft = async (store: DeliveryCalculatorStore, fetchMock: ReturnType<typeof vi.fn<typeof fetch>>) => {
    store.selectFromCity({ id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173 })
    store.selectToCity({ id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351 })
    store.selectPackageType(envelope)
    fetchMock.mockResolvedValueOnce(jsonResponse({ success: true, options: [expressOption] }))
    await store.calculateDelivery()
    store.setSelectedDeliveryOption(expressOption)
    store.setRecipient({
        lastName: 'Климов',
        firstName: 'Алексей',
        middleName: 'Алексеевич',
        phone: '+7 999 999 99 99',
    })
    store.setSender({ lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' })
    store.setPickupAddress({ street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' })
    store.setDeliveryAddress({ street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: '' })
    store.setLeaveAtDoor(true)
    store.setPayer('sender')
    fetchMock.mockReset()
}

describe('DeliveryCalculatorStore.submitOrder', () => {
    const fetchMock = vi.fn<typeof fetch>()
    let store: DeliveryCalculatorStore

    beforeEach(async () => {
        localStorage.clear()
        fetchMock.mockReset()
        vi.stubGlobal('fetch', fetchMock)
        vi.stubGlobal('Request', BrowserLikeRequest)

        store = new DeliveryCalculatorStore()
        await fillDraft(store, fetchMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('keeps the id of the calculated package, also after a reload, without restoring the package form', () => {
        expect(store.calculatedPackageId).toBe('envelope')

        const reloaded = new DeliveryCalculatorStore()

        expect(reloaded.calculatedPackageId).toBe('envelope')
        expect(reloaded.packageType).toBeNull()
    })

    it('posts the order DTO to /api/v1/delivery/order', async () => {
        let sent: { url: string; method: string; body: unknown } | undefined

        // The body is read while the request is in flight: ky consumes it afterwards.
        fetchMock.mockImplementation(async input => {
            const request = new Request(input)
            sent = { url: request.url, method: request.method, body: await request.clone().json() }

            return jsonResponse(createdOrder)
        })

        await store.submitOrder()

        expect(sent?.method).toBe('POST')
        expect(new URL(sent?.url ?? '').pathname).toBe('/api/v1/delivery/order')
        expect(sent?.body).toMatchObject({
            packageId: 'envelope',
            optionType: 'express',
            senderPointId: '1',
            receiverPointId: '2',
            payer: 'sender',
            receiverAddress: { isNonContact: true },
        })
    })

    it('keeps the created order for the success screen and clears the draft', async () => {
        fetchMock.mockResolvedValue(jsonResponse(createdOrder))

        const placedOrder = await store.submitOrder()

        expect(placedOrder).toMatchObject({
            id: '6745f0c2a1b3c4d5e6f70812',
            price: 78000,
            deliveryOptionName: 'Экспресс-доставка',
            fromCityName: 'Москва',
            toCityName: 'Санкт-Петербург',
            payer: 'sender',
        })
        expect(store.lastOrder).toEqual(placedOrder)
        expect(JSON.parse(localStorage.getItem('lastOrder') ?? 'null')).toEqual(placedOrder)

        expect(store.selectedDeliveryOption).toBeNull()
        expect(store.deliveryOptions).toEqual([])
        expect(store.calculatedPackageId).toBeNull()
        expect(store.recipient.lastName).toBe('')
        expect(store.deliveryAddress.street).toBe('')
        expect(store.leaveAtDoor).toBe(false)
        expect(store.payer).toBe('receiver')

        for (const key of ['selectedDeliveryOption', 'calculatedPackageId', 'recipient', 'sender', 'pickupAddress']) {
            expect(localStorage.getItem(key)).toBeNull()
        }

        // The cities chosen in the calculator stay.
        expect(store.fromCity.name).toBe('Москва')
    })

    it('restores the created order after a reload without sending it again', async () => {
        fetchMock.mockResolvedValue(jsonResponse(createdOrder))
        await store.submitOrder()

        const reloaded = new DeliveryCalculatorStore()

        expect(reloaded.lastOrder?.id).toBe('6745f0c2a1b3c4d5e6f70812')
        expect(reloaded.selectedDeliveryOption).toBeNull()
        expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('sends one request when submitted twice in a row', async () => {
        let respond: (response: Response) => void = () => {}
        fetchMock.mockReturnValue(new Promise(resolve => (respond = resolve)))

        const first = store.submitOrder()
        const second = store.submitOrder()

        expect(store.isSubmittingOrder).toBe(true)
        await expect(second).resolves.toBeNull()

        respond(jsonResponse(createdOrder))
        await first

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(store.isSubmittingOrder).toBe(false)
    })

    it('keeps the draft and reports the backend reason when the order is rejected', async () => {
        fetchMock.mockResolvedValue(jsonResponse({ message: ['phone must be valid'], statusCode: 400 }, 400))

        await expect(store.submitOrder()).resolves.toBeNull()

        expect(store.orderSubmitError).toEqual({ kind: 'rejected', reason: 'phone must be valid' })
        expect(store.recipient.lastName).toBe('Климов')
        expect(store.selectedDeliveryOption).toEqual(expressOption)
        expect(store.lastOrder).toBeNull()
        expect(store.isSubmittingOrder).toBe(false)
    })

    it('treats success: false in a 200 response as a rejection', async () => {
        fetchMock.mockResolvedValue(jsonResponse({ success: false, reason: 'Пункт недоступен' }))

        await store.submitOrder()

        expect(store.orderSubmitError).toEqual({ kind: 'rejected', reason: 'Пункт недоступен' })
        expect(store.lastOrder).toBeNull()
    })

    it('reports a server error for 5xx and for a response without the order id', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Internal server error' }, 500))
        await store.submitOrder()
        expect(store.orderSubmitError).toEqual({ kind: 'server' })

        fetchMock.mockResolvedValueOnce(jsonResponse({ success: true }))
        await store.submitOrder()
        expect(store.orderSubmitError).toEqual({ kind: 'server' })

        expect(store.lastOrder).toBeNull()
        expect(store.recipient.lastName).toBe('Климов')
    })

    it('reports a network error and keeps the draft', async () => {
        fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

        await store.submitOrder()

        expect(store.orderSubmitError).toEqual({ kind: 'network' })
        expect(store.pickupAddress.street).toBe('Новорогожская')
        expect(store.isSubmittingOrder).toBe(false)
    })

    it('creates the order on a retry after an error', async () => {
        fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))
        fetchMock.mockResolvedValueOnce(jsonResponse(createdOrder))

        await store.submitOrder()
        const placedOrder = await store.submitOrder()

        expect(placedOrder?.id).toBe('6745f0c2a1b3c4d5e6f70812')
        expect(store.orderSubmitError).toBeNull()
        expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('sends nothing and names the missing value when the draft is incomplete', async () => {
        store.setSender({ lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '' })

        await store.submitOrder()

        expect(fetchMock).not.toHaveBeenCalled()
        expect(store.orderSubmitError).toEqual({ kind: 'missingData', fields: ['sender'] })
    })
})
