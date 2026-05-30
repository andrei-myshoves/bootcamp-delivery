import { apiClient } from '@/api/base'

export interface DeliveryPoint {
    id: number
    city: string
}

export const getDeliveryPoints = async () => {
    return apiClient.get('delivery/points').json<DeliveryPoint[]>()
}
