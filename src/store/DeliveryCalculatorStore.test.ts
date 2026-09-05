import { describe, expect, it } from 'vitest'

import { DeliveryCalculatorStore, type DeliveryPoint, type PackageType } from './DeliveryCalculatorStore'

const cities: DeliveryPoint[] = [
    {
        id: '1',
        name: 'Москва',
        latitude: 55.7558,
        longitude: 37.6173,
    },
    {
        id: '2',
        name: 'Санкт-Петербург',
        latitude: 59.9343,
        longitude: 30.3351,
    },
    {
        id: '3',
        name: 'Новосибирск',
        latitude: 55.0084,
        longitude: 82.9357,
    },
    {
        id: '4',
        name: 'Казань',
        latitude: 55.7879,
        longitude: 49.1233,
    },
]

const packages: PackageType[] = [
    {
        id: 'envelope',
        name: 'Конверт',
        length: '30',
        width: '20',
        height: '1',
        weight: '1',
    },
    {
        id: 'box-s',
        name: 'Короб S',
        length: '20',
        width: '20',
        height: '20',
        weight: '5',
    },
    {
        id: 'bag',
        name: 'Пакет',
        length: '30',
        width: '20',
        height: '10',
        weight: '3',
    },
    {
        id: 'pallet',
        name: 'Палета',
        length: '120',
        width: '80',
        height: '15',
        weight: '500',
    },
]

describe('DeliveryCalculatorStore', () => {
    it('has default cities', () => {
        const store = new DeliveryCalculatorStore()

        expect(store.fromCity.name).toBe('Москва')
        expect(store.toCity.name).toBe('Санкт-Петербург')
    })

    it('selects departure city', () => {
        const store = new DeliveryCalculatorStore()

        store.selectFromCity(cities[2])

        expect(store.fromCity).toEqual(cities[2])
    })

    it('selects destination city', () => {
        const store = new DeliveryCalculatorStore()

        store.selectToCity(cities[2])

        expect(store.toCity).toEqual(cities[2])
    })

    it('selects package type', () => {
        const store = new DeliveryCalculatorStore()

        store.selectPackageType(packages[1])

        expect(store.packageType).toEqual(packages[1])
    })

    it('returns popular departure cities', () => {
        const store = new DeliveryCalculatorStore()

        store.cities = cities

        expect(store.fromPopularCities.map(city => city.name)).toEqual(['Санкт-Петербург', 'Новосибирск'])
    })

    it('returns popular destination cities', () => {
        const store = new DeliveryCalculatorStore()

        store.cities = cities

        expect(store.toPopularCities.map(city => city.name)).toEqual(['Москва', 'Новосибирск'])
    })

    it('excludes bag and pallet from visible packages', () => {
        const store = new DeliveryCalculatorStore()

        store.packageTypes = packages

        expect(store.visiblePackages.map(packageType => packageType.id)).toEqual(['envelope', 'box-s'])
    })
})
