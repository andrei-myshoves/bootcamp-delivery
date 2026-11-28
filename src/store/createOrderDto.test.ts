import { describe, expect, it } from 'vitest'

import { createOrderDto, type OrderDraft } from './createOrderDto'

const expressOption = { id: 'express', price: 78000, days: 1, name: 'Экспресс-доставка', type: 'express' }

const completeDraft: OrderDraft = {
    calculatedPackageId: 'envelope',
    selectedDeliveryOption: expressOption,
    fromCity: { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173 },
    toCity: { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351 },
    recipient: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    pickupAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
    deliveryAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: 'Позвонить за час' },
    leaveAtDoor: true,
    payer: 'sender',
}

describe('createOrderDto', () => {
    it('maps the draft to CreateDeliveryOrderDto field by field', () => {
        expect(createOrderDto(completeDraft)).toEqual({
            ok: true,
            dto: {
                packageId: 'envelope',
                optionType: 'express',
                senderPointId: '1',
                senderAddress: { street: 'Новорогожская', house: '24', apartment: '17' },
                sender: { firstname: 'Иван', lastname: 'Иванов', middlename: 'Иванович', phone: '+7 999 123 45 67' },
                receiverPointId: '2',
                receiverAddress: {
                    street: 'Евдокима Огнева',
                    house: '19',
                    apartment: '40',
                    comment: 'Позвонить за час',
                    isNonContact: true,
                },
                receiver: {
                    firstname: 'Алексей',
                    lastname: 'Климов',
                    middlename: 'Алексеевич',
                    phone: '+7 999 999 99 99',
                },
                payer: 'sender',
            },
        })
    })

    it('trims values, keeps the phone as entered and sends isNonContact false', () => {
        const result = createOrderDto({
            ...completeDraft,
            recipient: { ...completeDraft.recipient, firstName: '  Алексей ' },
            pickupAddress: { ...completeDraft.pickupAddress, courierNote: '  Домофон 17 ' },
            leaveAtDoor: false,
        })

        expect(result.ok && result.dto.receiver.firstname).toBe('Алексей')
        expect(result.ok && result.dto.receiver.phone).toBe('+7 999 999 99 99')
        expect(result.ok && result.dto.senderAddress.comment).toBe('Домофон 17')
        expect(result.ok && result.dto.receiverAddress.isNonContact).toBe(false)
    })

    it('leaves out an empty courier note instead of sending an empty comment', () => {
        const result = createOrderDto({
            ...completeDraft,
            deliveryAddress: { ...completeDraft.deliveryAddress, courierNote: '   ' },
        })

        expect(result.ok && result.dto.receiverAddress).not.toHaveProperty('comment')
    })

    it('reports a missing package instead of inventing a packageId', () => {
        expect(createOrderDto({ ...completeDraft, calculatedPackageId: null })).toEqual({
            ok: false,
            missingFields: ['package'],
        })
    })

    it('rejects a missing tariff or one whose type is not a known optionType', () => {
        for (const selectedDeliveryOption of [null, { ...expressOption, type: 'overnight' }]) {
            expect(createOrderDto({ ...completeDraft, selectedDeliveryOption })).toEqual({
                ok: false,
                missingFields: ['deliveryOption'],
            })
        }
    })

    it('lists every missing value in step order', () => {
        const result = createOrderDto({
            ...completeDraft,
            fromCity: { ...completeDraft.fromCity, id: '' },
            toCity: { ...completeDraft.toCity, id: ' ' },
            recipient: { lastName: '', firstName: '', middleName: '', phone: '' },
            sender: { ...completeDraft.sender, phone: '' },
            pickupAddress: { street: '', house: '', apartment: '', courierNote: '' },
            deliveryAddress: { ...completeDraft.deliveryAddress, apartment: '' },
        })

        expect(result).toEqual({
            ok: false,
            missingFields: ['fromCity', 'toCity', 'recipient', 'sender', 'pickupAddress', 'deliveryAddress'],
        })
    })
})
