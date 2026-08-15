import { AppStore } from './AppStore'
import { DeliveryCalculatorStore } from './DeliveryCalculatorStore'

export class RootStore {
    readonly appStore: AppStore
    readonly deliveryCalculatorStore: DeliveryCalculatorStore

    constructor() {
        this.appStore = new AppStore()
        this.deliveryCalculatorStore = new DeliveryCalculatorStore()
    }
}

export const rootStore = new RootStore()
