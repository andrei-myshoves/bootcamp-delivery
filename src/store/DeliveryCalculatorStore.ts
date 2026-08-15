import { makeAutoObservable, runInAction } from 'mobx'
import { apiClientV1 } from '@/shared/api/ky/instance'

export interface DeliveryPoint {
    id: string
    name: string
    latitude: string
    longitude: string
}

export interface DeliveryPointsResponse {
    success: boolean
    points: DeliveryPoint[]
}

const DEFAULT_FROM_CITY: DeliveryPoint = {
    id: '1',
    name: 'Москва',
    latitude: '',
    longitude: '',
}

const DEFAULT_TO_CITY: DeliveryPoint = {
    id: '2',
    name: 'Санкт-Петербург',
    latitude: '',
    longitude: '',
}

export class DeliveryCalculatorStore {
    fromCity = DEFAULT_FROM_CITY
    toCity = DEFAULT_TO_CITY

    cities: DeliveryPoint[] = []
    constructor() {
        makeAutoObservable(this)
    }

    selectFromCity = (city: DeliveryPoint) => {
        this.fromCity = city
    }

    selectToCity = (city: DeliveryPoint) => {
        this.toCity = city
    }

    fetchCities = async () => {
        const response = await apiClientV1.get('delivery/points').json<DeliveryPointsResponse>()

        runInAction(() => {
            this.cities = response.points
        })
    }
}
