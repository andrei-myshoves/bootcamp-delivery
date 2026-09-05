import { makeAutoObservable, runInAction } from 'mobx'
import { apiClientV1 } from '@/shared/api/ky/instance'

export interface DeliveryPoint {
    id: string
    name: string
    latitude: number
    longitude: number
}

export interface DeliveryPointsResponse {
    success: boolean
    points: DeliveryPoint[]
}
export interface PackageType {
    id: string
    name: string
    length: string
    width: string
    weight: string
    height: string
}

export interface PackageTypesResponse {
    success: boolean
    reason: string
    packages: PackageType[]
}

const DEFAULT_FROM_CITY: DeliveryPoint = {
    id: '1',
    name: 'Москва',
    latitude: 0,
    longitude: 0,
}

const DEFAULT_TO_CITY: DeliveryPoint = {
    id: '2',
    name: 'Санкт-Петербург',
    latitude: 0,
    longitude: 0,
}

export class DeliveryCalculatorStore {
    fromCity = DEFAULT_FROM_CITY
    toCity = DEFAULT_TO_CITY

    cities: DeliveryPoint[] = []
    packageTypes: PackageType[] = []
    packageType: PackageType | null = null
    constructor() {
        makeAutoObservable(this)
    }

    private preparePopularCities(names: string[]): DeliveryPoint[] {
        const nameSet = new Set(names)

        return this.cities.filter(city => nameSet.has(city.name))
    }

    get fromPopularCities() {
        return this.preparePopularCities(['Санкт-Петербург', 'Новосибирск', 'Томск'])
    }

    get toPopularCities() {
        return this.preparePopularCities(['Новосибирск', 'Томск', 'Москва'])
    }

    get visiblePackages() {
        return this.packageTypes.filter(packageType => packageType.id !== 'bag' && packageType.id !== 'pallet')
    }

    selectFromCity = (city: DeliveryPoint) => {
        this.fromCity = city
    }

    selectToCity = (city: DeliveryPoint) => {
        this.toCity = city
    }

    selectPackageType = (packageType: PackageType) => {
        this.packageType = packageType
    }

    fetchCities = async () => {
        const response = await apiClientV1.get('delivery/points').json<DeliveryPointsResponse>()

        runInAction(() => {
            this.cities = response.points
        })
    }

    fetchPackageTypes = async () => {
        const response = await apiClientV1.get('delivery/package/types').json<PackageTypesResponse>()

        runInAction(() => {
            this.packageTypes = response.packages
        })
    }
}
