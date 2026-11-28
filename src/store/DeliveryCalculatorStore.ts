import { makeAutoObservable, runInAction } from 'mobx'
import { createDeliveryOrder } from '@/shared/api/ky/entities/delivery-order.api'
import { apiClientV1 } from '@/shared/api/ky/instance'

import { createOrderDto } from './createOrderDto'
import { type OrderSubmitError, toOrderSubmitError } from './orderSubmitError'

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
export interface DeliveryCalculationRequest {
    package: {
        length: number
        width: number
        weight: number
        height: number
    }
    senderPoint: {
        latitude: number
        longitude: number
    }
    receiverPoint: {
        latitude: number
        longitude: number
    }
}

export interface DeliveryOption {
    id: string
    price: number
    days: number
    name: string
    type: string
}

export interface DeliveryCalculationResponse {
    success: boolean
    reason: string
    options: DeliveryOption[]
}

export interface RecipientData {
    firstName: string
    middleName: string
    lastName: string
    phone: string
}
export interface AddressData {
    street: string
    house: string
    apartment: string
    courierNote: string
}

/** Who pays for the delivery; values match the `payer` field of the delivery order API. */
export type Payer = 'receiver' | 'sender'

export const PAYERS: readonly Payer[] = ['receiver', 'sender']

const DEFAULT_PAYER: Payer = 'receiver'

export const isPayer = (value: unknown): value is Payer => PAYERS.includes(value as Payer)

/**
 * A created order, kept for the success screen after the draft is cleared.
 * Everything except the id is copied from the draft the order was created from.
 */
export interface PlacedOrder {
    id: string
    /** Price of the selected tariff in kopecks, as shown on the review step. */
    price: number
    deliveryOptionName: string
    fromCityName: string
    toCityName: string
    recipient: RecipientData
    sender: RecipientData
    pickupAddress: AddressData
    deliveryAddress: AddressData
    payer: Payer
}

const EMPTY_PERSON: RecipientData = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
}

const EMPTY_ADDRESS: AddressData = {
    street: '',
    house: '',
    apartment: '',
    courierNote: '',
}

const DEFAULT_FROM_CITY: DeliveryPoint = {
    id: '1',
    name: 'Москва',
    latitude: 0,
    longitude: 0,
}

const DELIVERY_OPTIONS_LS_KEY = 'deliveryOptions'
const SELECTED_DELIVERY_OPTION_LS_KEY = 'selectedDeliveryOption'
const RECIPIENT_LS_KEY = 'recipient'
const SENDER_LS_KEY = 'sender'
const PICKUP_ADDRESS_LS_KEY = 'pickupAddress'
const DELIVERY_ADDRESS_LS_KEY = 'deliveryAddress'
const LEAVE_AT_DOOR_LS_KEY = 'leaveAtDoor'
const PAYER_LS_KEY = 'payer'
const FROM_CITY_LS_KEY = 'fromCity'
const TO_CITY_LS_KEY = 'toCity'
const CALCULATED_PACKAGE_ID_LS_KEY = 'calculatedPackageId'
const LAST_ORDER_LS_KEY = 'lastOrder'

/** Checkout keys removed once an order is created; the cities chosen in the calculator are kept. */
const ORDER_DRAFT_LS_KEYS = [
    DELIVERY_OPTIONS_LS_KEY,
    SELECTED_DELIVERY_OPTION_LS_KEY,
    CALCULATED_PACKAGE_ID_LS_KEY,
    RECIPIENT_LS_KEY,
    SENDER_LS_KEY,
    PICKUP_ADDRESS_LS_KEY,
    DELIVERY_ADDRESS_LS_KEY,
    LEAVE_AT_DOOR_LS_KEY,
    PAYER_LS_KEY,
]

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
    selectedDeliveryOption: DeliveryOption | null = null
    deliveryOptions: DeliveryOption[] = JSON.parse(localStorage.getItem(DELIVERY_OPTIONS_LS_KEY) ?? '[]')
    /**
     * Id of the package the current tariffs were calculated for: the order's `packageId`.
     * Saved separately from `packageType`, which the calculator form does not restore after a reload.
     */
    calculatedPackageId: string | null = localStorage.getItem(CALCULATED_PACKAGE_ID_LS_KEY)
    isCalculating = false
    calculationError: string | null = null
    recipient: RecipientData = EMPTY_PERSON
    sender: RecipientData = EMPTY_PERSON
    pickupAddress: AddressData = EMPTY_ADDRESS
    deliveryAddress: AddressData = EMPTY_ADDRESS

    leaveAtDoor = false

    payer: Payer = DEFAULT_PAYER

    isSubmittingOrder = false
    orderSubmitError: OrderSubmitError | null = null
    lastOrder: PlacedOrder | null = null

    constructor() {
        makeAutoObservable(this)

        const savedFromCity = localStorage.getItem(FROM_CITY_LS_KEY)
        const savedToCity = localStorage.getItem(TO_CITY_LS_KEY)

        if (savedFromCity) {
            this.fromCity = JSON.parse(savedFromCity) as DeliveryPoint
        }

        if (savedToCity) {
            this.toCity = JSON.parse(savedToCity) as DeliveryPoint
        }

        const savedLastOrder = localStorage.getItem(LAST_ORDER_LS_KEY)

        if (savedLastOrder) {
            this.lastOrder = JSON.parse(savedLastOrder) as PlacedOrder
        }

        const savedOption = localStorage.getItem(SELECTED_DELIVERY_OPTION_LS_KEY)
        const savedRecipient = localStorage.getItem(RECIPIENT_LS_KEY)
        const savedSender = localStorage.getItem(SENDER_LS_KEY)
        const savedPickupAddress = localStorage.getItem(PICKUP_ADDRESS_LS_KEY)
        const savedDeliveryAddress = localStorage.getItem(DELIVERY_ADDRESS_LS_KEY)
        const savedLeaveAtDoor = localStorage.getItem(LEAVE_AT_DOOR_LS_KEY)

        if (savedOption) {
            this.selectedDeliveryOption = JSON.parse(savedOption) as DeliveryOption
        }

        if (savedRecipient) {
            this.recipient = JSON.parse(savedRecipient) as RecipientData
        }

        if (savedSender) {
            this.sender = JSON.parse(savedSender) as RecipientData
        }
        if (savedPickupAddress) {
            this.pickupAddress = JSON.parse(savedPickupAddress) as AddressData
        }

        if (savedDeliveryAddress) {
            this.deliveryAddress = JSON.parse(savedDeliveryAddress) as AddressData
        }
        if (savedLeaveAtDoor) {
            this.leaveAtDoor = JSON.parse(savedLeaveAtDoor) as boolean
        }

        const savedPayer = localStorage.getItem(PAYER_LS_KEY)

        if (isPayer(savedPayer)) {
            this.payer = savedPayer
        }
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
        localStorage.setItem(FROM_CITY_LS_KEY, JSON.stringify(city))
    }

    selectToCity = (city: DeliveryPoint) => {
        this.toCity = city
        localStorage.setItem(TO_CITY_LS_KEY, JSON.stringify(city))
    }

    selectPackageType = (packageType: PackageType) => {
        this.packageType = packageType
    }

    setRecipient = (data: RecipientData) => {
        this.recipient = data
        localStorage.setItem(RECIPIENT_LS_KEY, JSON.stringify(data))
    }

    setSender = (data: RecipientData) => {
        this.sender = data
        localStorage.setItem(SENDER_LS_KEY, JSON.stringify(data))
    }

    setSelectedDeliveryOption = (option: DeliveryOption) => {
        this.selectedDeliveryOption = option
        localStorage.setItem(SELECTED_DELIVERY_OPTION_LS_KEY, JSON.stringify(option))
    }
    setPickupAddress = (data: AddressData) => {
        this.pickupAddress = data
        localStorage.setItem(PICKUP_ADDRESS_LS_KEY, JSON.stringify(data))
    }
    setDeliveryAddress = (data: AddressData) => {
        this.deliveryAddress = data
        localStorage.setItem(DELIVERY_ADDRESS_LS_KEY, JSON.stringify(data))
    }

    setLeaveAtDoor = (value: boolean) => {
        this.leaveAtDoor = value
        localStorage.setItem(LEAVE_AT_DOOR_LS_KEY, JSON.stringify(value))
    }

    setPayer = (value: Payer) => {
        this.payer = value
        localStorage.setItem(PAYER_LS_KEY, value)
    }

    calculateDelivery = async () => {
        if (!this.packageType || this.isCalculating) {
            return
        }

        const packageId = this.packageType.id

        this.isCalculating = true
        this.calculationError = null

        const request: DeliveryCalculationRequest = {
            package: {
                length: Number(this.packageType.length),
                width: Number(this.packageType.width),
                height: Number(this.packageType.height),
                weight: Number(this.packageType.weight),
            },
            senderPoint: {
                latitude: this.fromCity.latitude,
                longitude: this.fromCity.longitude,
            },
            receiverPoint: {
                latitude: this.toCity.latitude,
                longitude: this.toCity.longitude,
            },
        }

        try {
            const response = await apiClientV1
                .post('delivery/calc', {
                    json: request,
                })
                .json<DeliveryCalculationResponse>()

            runInAction(() => {
                this.deliveryOptions = response.options
                this.calculatedPackageId = packageId
                localStorage.setItem(DELIVERY_OPTIONS_LS_KEY, JSON.stringify(response.options))
                localStorage.setItem(CALCULATED_PACKAGE_ID_LS_KEY, packageId)
            })
        } catch {
            runInAction(() => {
                this.calculationError = 'Не удалось рассчитать доставку'
            })
        } finally {
            runInAction(() => {
                this.isCalculating = false
            })
        }
    }

    /**
     * Sends the draft as a delivery order. Returns the created order, or null when it was not created
     * (the reason is in `orderSubmitError`). A call while a request is in flight is ignored, so a double
     * click cannot create two orders. The draft is cleared only after the backend confirms the order.
     */
    submitOrder = async (): Promise<PlacedOrder | null> => {
        if (this.isSubmittingOrder) {
            return null
        }

        const dtoResult = createOrderDto(this)
        const { selectedDeliveryOption } = this

        if (!dtoResult.ok || !selectedDeliveryOption) {
            this.orderSubmitError = {
                kind: 'missingData',
                fields: dtoResult.ok ? ['deliveryOption'] : dtoResult.missingFields,
            }

            return null
        }

        // Taken before the request: the success screen shows exactly what was sent.
        const orderSummary: Omit<PlacedOrder, 'id'> = {
            price: selectedDeliveryOption.price,
            deliveryOptionName: selectedDeliveryOption.name,
            fromCityName: this.fromCity.name,
            toCityName: this.toCity.name,
            recipient: this.recipient,
            sender: this.sender,
            pickupAddress: this.pickupAddress,
            deliveryAddress: this.deliveryAddress,
            payer: this.payer,
        }

        this.isSubmittingOrder = true
        this.orderSubmitError = null

        try {
            const response = await createDeliveryOrder(dtoResult.dto)
            const orderId = response.order?._id

            if (!response.success) {
                runInAction(() => {
                    this.orderSubmitError = { kind: 'rejected', reason: response.reason }
                })

                return null
            }

            if (typeof orderId !== 'string' || !orderId) {
                runInAction(() => {
                    this.orderSubmitError = { kind: 'server' }
                })

                return null
            }

            const placedOrder: PlacedOrder = { id: orderId, ...orderSummary }

            runInAction(() => {
                this.lastOrder = placedOrder
                localStorage.setItem(LAST_ORDER_LS_KEY, JSON.stringify(placedOrder))
                this.clearOrderDraft()
            })

            return placedOrder
        } catch (error) {
            runInAction(() => {
                this.orderSubmitError = toOrderSubmitError(error)
            })

            return null
        } finally {
            runInAction(() => {
                this.isSubmittingOrder = false
            })
        }
    }

    resetOrderSubmitError = () => {
        this.orderSubmitError = null
    }

    /** Starts the next order from scratch: removes the checkout data, keeps the cities. */
    private clearOrderDraft() {
        this.deliveryOptions = []
        this.selectedDeliveryOption = null
        this.calculatedPackageId = null
        this.recipient = EMPTY_PERSON
        this.sender = EMPTY_PERSON
        this.pickupAddress = EMPTY_ADDRESS
        this.deliveryAddress = EMPTY_ADDRESS
        this.leaveAtDoor = false
        this.payer = DEFAULT_PAYER

        for (const key of ORDER_DRAFT_LS_KEYS) {
            localStorage.removeItem(key)
        }
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
