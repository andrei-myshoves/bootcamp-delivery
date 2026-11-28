import { beforeEach, describe, expect, it } from 'vitest'

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
        id: 'box-m',
        name: 'Короб M',
        length: '30',
        width: '30',
        height: '30',
        weight: '10',
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
    let store: DeliveryCalculatorStore

    beforeEach(() => {
        store = new DeliveryCalculatorStore()
        store.cities = cities
        store.packageTypes = packages
    })

    it('has default cities', () => {
        expect(store.fromCity.name).toBe('Москва')
        expect(store.toCity.name).toBe('Санкт-Петербург')
    })

    it('selects departure city', () => {
        store.selectFromCity(cities[1])

        expect(store.fromCity).toEqual(cities[1])
    })

    it('selects destination city', () => {
        store.selectToCity(cities[2])

        expect(store.toCity).toEqual(cities[2])
    })

    it('selects package type', () => {
        store.selectPackageType(packages[1])

        expect(store.packageType).toEqual(packages[1])
    })

    it('returns popular departure cities', () => {
        expect(store.fromPopularCities.map(city => city.name)).toEqual(['Санкт-Петербург', 'Новосибирск'])
    })

    it('returns popular destination cities', () => {
        expect(store.toPopularCities.map(city => city.name)).toEqual(['Москва', 'Новосибирск'])
    })

    it('excludes bag and pallet from visible packages', () => {
        expect(store.visiblePackages.map(packageType => packageType.id)).toEqual(['envelope', 'box-s', 'box-m'])
    })

    describe('delivery address', () => {
        const address = {
            street: 'Евдокима Огнева',
            house: '19',
            apartment: '40',
            courierNote: 'Домофон не работает',
        }

        beforeEach(() => {
            localStorage.clear()
            store = new DeliveryCalculatorStore()
        })

        it('starts with an empty address and leaveAtDoor disabled', () => {
            expect(store.deliveryAddress).toEqual({ street: '', house: '', apartment: '', courierNote: '' })
            expect(store.leaveAtDoor).toBe(false)
        })

        it('stores the delivery address and persists it', () => {
            store.setDeliveryAddress(address)

            expect(store.deliveryAddress).toEqual(address)
            expect(JSON.parse(localStorage.getItem('deliveryAddress') ?? 'null')).toEqual(address)
        })

        it('stores leaveAtDoor and persists it', () => {
            store.setLeaveAtDoor(true)

            expect(store.leaveAtDoor).toBe(true)
            expect(localStorage.getItem('leaveAtDoor')).toBe('true')
        })

        it('persists and restores the selected cities', () => {
            store.selectFromCity(cities[2])
            store.selectToCity(cities[3])

            const restoredStore = new DeliveryCalculatorStore()

            expect(restoredStore.fromCity).toEqual(cities[2])
            expect(restoredStore.toCity).toEqual(cities[3])
        })

        it('defaults the payer to the receiver', () => {
            expect(store.payer).toBe('receiver')
        })

        it('stores the payer and persists it', () => {
            store.setPayer('sender')

            expect(store.payer).toBe('sender')
            expect(localStorage.getItem('payer')).toBe('sender')
        })

        it('restores a saved payer', () => {
            store.setPayer('sender')

            expect(new DeliveryCalculatorStore().payer).toBe('sender')
        })

        it('ignores an invalid saved payer', () => {
            localStorage.setItem('payer', 'nobody')

            expect(new DeliveryCalculatorStore().payer).toBe('receiver')
        })

        it('restores saved delivery address and leaveAtDoor', () => {
            store.setDeliveryAddress(address)
            store.setLeaveAtDoor(true)

            const restoredStore = new DeliveryCalculatorStore()

            expect(restoredStore.deliveryAddress).toEqual(address)
            expect(restoredStore.leaveAtDoor).toBe(true)
        })
    })
})
