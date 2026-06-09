import { apiClient } from '@/shared/api/ky/instance'

export interface DeliveryPoint {
    id: number
    city: string
}

export const getDeliveryPoints = async () => {
    return apiClient.get('delivery/points').json<DeliveryPoint[]>()
}
