import ky from 'ky'

export const apiClient = ky.extend({
    prefix: '/api',

    headers: {
        'Content-Type': 'application/json',
    },
})