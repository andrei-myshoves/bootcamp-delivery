import ky from 'ky'

export const apiClient = ky.extend({
    prefix: '/api/v1',

    headers: {
        'Content-Type': 'application/json',
    },
})
