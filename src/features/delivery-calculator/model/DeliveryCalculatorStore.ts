import { makeAutoObservable } from 'mobx'
import type { DeliveryPoint } from './types'

export class DeliveryCalculatorStore {
    fromCity?: DeliveryPoint
    toCity?: DeliveryPoint

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
