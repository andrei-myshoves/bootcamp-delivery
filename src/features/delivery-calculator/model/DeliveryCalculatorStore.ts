import { makeAutoObservable } from 'mobx'

export interface DeliveryPoint {
    id: string
    name: string
    latitude: string
    longitude: string
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

    isFromCitySheetOpen = false
    isToCitySheetOpen = false

    constructor() {
        makeAutoObservable(this)
    }

    setFromCitySheetOpen = (open: boolean) => {
        this.isFromCitySheetOpen = open
    }

    openFromCitySheet = () => {
        this.setFromCitySheetOpen(true)
    }

    closeFromCitySheet = () => {
        this.setFromCitySheetOpen(false)
    }

    selectFromCity = (city: DeliveryPoint) => {
        this.fromCity = city
        this.closeFromCitySheet()
    }
}

export const deliveryCalculatorStore = new DeliveryCalculatorStore()
