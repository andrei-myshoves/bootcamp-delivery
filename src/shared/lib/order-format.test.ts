import { describe, expect, it } from 'vitest'

import { formatAddress, formatPerson, formatPrice } from './order-format'

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

describe('formatAddress with a city', () => {
    const address = { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' }

    it('prefixes the city', () => {
        expect(formatAddress(address, 'Москва')).toBe('г. Москва, Новорогожская, 24, 17')
    })

    it('does not show a lone city for an empty address', () => {
        expect(formatAddress({ street: '', house: '', apartment: '', courierNote: '' }, 'Москва')).toBe('')
    })
})

describe('formatPrice', () => {
    // Intl uses a non-breaking space before the ruble sign.
    const normalizeSpaces = (value: string) => value.replace(/\s/g, ' ')

    it('converts kopecks to whole rubles', () => {
        expect(normalizeSpaces(formatPrice(78000))).toBe('780 ₽')
    })

    it('keeps kopecks when the price is not a whole number of rubles', () => {
        expect(normalizeSpaces(formatPrice(63389))).toBe('633,89 ₽')
    })

    it('groups thousands', () => {
        expect(normalizeSpaces(formatPrice(1_234_500))).toBe('12 345 ₽')
    })
})
