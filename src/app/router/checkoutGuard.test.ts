import { describe, expect, it } from 'vitest'

import type { DeliveryOption } from '@/store/DeliveryCalculatorStore'

import { CHECKOUT_PATHS, type CheckoutState, getCheckoutRedirect } from './checkoutGuard'

const option: DeliveryOption = { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' }
const person = { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' }
const address = { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' }
const emptyPerson = { lastName: '', firstName: '', middleName: '', phone: '' }
const emptyAddress = { street: '', house: '', apartment: '', courierNote: '' }

const completeState: CheckoutState = {
    deliveryOptions: [option],
    selectedDeliveryOption: option,
    recipient: person,
    sender: person,
    pickupAddress: address,
    deliveryAddress: address,
    payer: 'receiver',
}

const emptyState: CheckoutState = {
    deliveryOptions: [],
    selectedDeliveryOption: null,
    recipient: emptyPerson,
    sender: emptyPerson,
    pickupAddress: emptyAddress,
    deliveryAddress: emptyAddress,
    payer: 'receiver',
}

describe('getCheckoutRedirect', () => {
    it('allows every step when all data is filled', () => {
        for (const path of CHECKOUT_PATHS) {
            expect(getCheckoutRedirect(completeState, path)).toBeNull()
        }
    })

    it('sends every checkout step to the calculator when nothing is calculated', () => {
        for (const path of CHECKOUT_PATHS.slice(1)) {
            expect(getCheckoutRedirect(emptyState, path)).toBe('/')
        }
    })

    it('never guards the calculator itself', () => {
        expect(getCheckoutRedirect(emptyState, '/')).toBeNull()
    })

    it('redirects to the first incomplete step', () => {
        const state = { ...completeState, sender: { ...person, phone: '  ' }, deliveryAddress: emptyAddress }

        expect(getCheckoutRedirect(state, '/order-review')).toBe('/sender')
    })

    it('requires a selected tariff after calculation', () => {
        expect(getCheckoutRedirect({ ...completeState, selectedDeliveryOption: null }, '/recipient')).toBe(
            '/deliverymethod'
        )
    })

    it('requires the apartment for both addresses', () => {
        const withoutPickupApartment = { ...completeState, pickupAddress: { ...address, apartment: '' } }
        const withoutDeliveryApartment = { ...completeState, deliveryAddress: { ...address, apartment: '' } }

        expect(getCheckoutRedirect(withoutPickupApartment, '/delivery-address')).toBe('/pickup-address')
        expect(getCheckoutRedirect(withoutDeliveryApartment, '/delivery-payment')).toBe('/delivery-address')
    })

    it('does not block going back to an earlier step with incomplete later data', () => {
        const state = { ...completeState, deliveryAddress: emptyAddress }

        expect(getCheckoutRedirect(state, '/pickup-address')).toBeNull()
        expect(getCheckoutRedirect(state, '/delivery-address')).toBeNull()
    })

    it('never redirects to a step that would redirect again (no loops)', () => {
        const partialStates: CheckoutState[] = [
            emptyState,
            { ...emptyState, deliveryOptions: [option] },
            { ...completeState, selectedDeliveryOption: null },
            { ...completeState, recipient: emptyPerson },
            { ...completeState, sender: emptyPerson, pickupAddress: emptyAddress },
            { ...completeState, deliveryAddress: emptyAddress },
        ]

        for (const state of partialStates) {
            for (const path of CHECKOUT_PATHS) {
                const redirectPath = getCheckoutRedirect(state, path)

                if (redirectPath) {
                    expect(getCheckoutRedirect(state, redirectPath)).toBeNull()
                }
            }
        }
    })
})
