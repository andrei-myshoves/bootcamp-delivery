import { describe, expect, it } from 'vitest'

import { formatAddress, formatPerson } from './order-format'

describe('formatPerson', () => {
    it('joins the full name and phone', () => {
        expect(
            formatPerson({
                lastName: 'Климов',
                firstName: 'Алексей',
                middleName: 'Алексеевич',
                phone: '+7 999 999 99 99',
            })
        ).toBe('Климов Алексей Алексеевич, +7 999 999 99 99')
    })

    it('skips empty parts', () => {
        expect(formatPerson({ lastName: 'Иванов', firstName: '', middleName: '', phone: '' })).toBe('Иванов')
    })

    it('returns an empty string for an empty person', () => {
        expect(formatPerson({ lastName: '', firstName: '', middleName: '', phone: '' })).toBe('')
    })
})

describe('formatAddress', () => {
    it('joins street, house and apartment and ignores the courier note', () => {
        expect(formatAddress({ street: 'Евдокима Огнева', house: '19', apartment: '40', courierNote: 'Домофон' })).toBe(
            'Евдокима Огнева, 19, 40'
        )
    })

    it('returns an empty string for an empty address', () => {
        expect(formatAddress({ street: '', house: '', apartment: '', courierNote: '' })).toBe('')
    })
})
