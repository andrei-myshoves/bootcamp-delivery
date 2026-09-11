import { apiClientV1 } from '@/shared/api/ky/instance'

export interface DeliveryPoint {
    id: number
    city: string
}

export const getDeliveryPoints = async () => {
    return apiClientV1.get('delivery/points').json<DeliveryPoint[]>()
}
