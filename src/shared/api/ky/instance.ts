import ky from 'ky'

export const apiClientV1 = ky.extend({
    prefix: '/api/v1',

    headers: {
        'Content-Type': 'application/json',
    },
})
