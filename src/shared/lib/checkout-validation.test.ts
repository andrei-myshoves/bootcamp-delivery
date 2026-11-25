import { describe, expect, it } from 'vitest'

import { isAddressComplete, isPersonComplete } from './checkout-validation'

const person = { lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', phone: '+7 999 123 45 67' }
const address = { street: 'Новорогожская', house: '24', apartment: '17', courierNote: '' }

describe('isPersonComplete', () => {
    it('is true when every field is filled', () => {
        expect(isPersonComplete(person)).toBe(true)
    })

    it.each(['lastName', 'firstName', 'middleName', 'phone'] as const)('is false when %s is blank', field => {
        expect(isPersonComplete({ ...person, [field]: '   ' })).toBe(false)
    })
})

describe('isAddressComplete', () => {
    it('is true without the optional courier note', () => {
        expect(isAddressComplete(address)).toBe(true)
    })

    it.each(['street', 'house', 'apartment'] as const)('is false when %s is blank', field => {
        expect(isAddressComplete({ ...address, [field]: '' })).toBe(false)
    })
})
