import { describe, expect, it } from 'vitest'

import { createOrderDto, type OrderDraft } from './createOrderDto'

const completeDraft: OrderDraft = {
    packageId: 'envelope',
    optionType: 'express',
    senderPointId: '1',
    receiverPointId: '2',
    sender: { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' },
    receiver: { lastName: 'Климов', firstName: 'Алексей', middleName: 'Алексеевич', phone: '+7 999 999 99 99' },
    senderAddress: { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' },
    receiverAddress: { street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: 'Позвонить за час' },
    isNonContact: true,
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
            receiver: { ...completeDraft.receiver, firstName: '  Алексей ' },
            senderAddress: { ...completeDraft.senderAddress, courierNote: '  Домофон 17 ' },
            isNonContact: false,
        })

        expect(result.ok && result.dto.receiver.firstname).toBe('Алексей')
        expect(result.ok && result.dto.receiver.phone).toBe('+7 999 999 99 99')
        expect(result.ok && result.dto.senderAddress.comment).toBe('Домофон 17')
        expect(result.ok && result.dto.receiverAddress.isNonContact).toBe(false)
    })

    it('leaves out an empty courier note instead of sending an empty comment', () => {
        const result = createOrderDto({
            ...completeDraft,
            receiverAddress: { ...completeDraft.receiverAddress, courierNote: '   ' },
        })

        expect(result.ok && result.dto.receiverAddress).not.toHaveProperty('comment')
    })

    it('reports a missing package instead of inventing a packageId', () => {
        expect(createOrderDto({ ...completeDraft, packageId: null })).toEqual({
            ok: false,
            missingFields: ['package'],
        })
    })

    it('rejects a missing tariff type or one that is not a known optionType', () => {
        for (const optionType of [null, 'overnight']) {
            expect(createOrderDto({ ...completeDraft, optionType })).toEqual({
                ok: false,
                missingFields: ['deliveryOption'],
            })
        }
    })

    it('lists every missing value in step order', () => {
        const result = createOrderDto({
            ...completeDraft,
            senderPointId: '',
            receiverPointId: ' ',
            receiver: { lastName: '', firstName: '', middleName: '', phone: '' },
            sender: { ...completeDraft.sender, phone: '' },
            senderAddress: { street: '', house: '', apartment: '', courierNote: '' },
            receiverAddress: { ...completeDraft.receiverAddress, apartment: '' },
        })

        expect(result).toEqual({
            ok: false,
            missingFields: ['fromCity', 'toCity', 'recipient', 'sender', 'pickupAddress', 'deliveryAddress'],
        })
    })
})
