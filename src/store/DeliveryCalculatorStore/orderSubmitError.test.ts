import { describe, expect, it } from 'vitest'

import { getBackendReason } from './orderSubmitError'

describe('getBackendReason', () => {
    it('reads the reason of DeliverResponse', () => {
        expect(getBackendReason({ success: false, reason: 'Неверный телефон' })).toBe('Неверный телефон')
    })

    it('reads a validation message, also when it is a list', () => {
        expect(getBackendReason({ message: 'phone must be a string' })).toBe('phone must be a string')
        expect(getBackendReason({ message: ['phone is empty', 'house is empty'] })).toBe(
            'phone is empty. house is empty'
        )
    })

    it('returns null for a body without an explanation', () => {
        expect(getBackendReason(undefined)).toBeNull()
        expect(getBackendReason('Bad Request')).toBeNull()
        expect(getBackendReason({ reason: '  ', message: [] })).toBeNull()
    })
})
