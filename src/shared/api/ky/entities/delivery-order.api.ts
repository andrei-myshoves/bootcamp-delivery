import { apiClientV1 } from '@/shared/api/ky/instance'

/** `DeliveryOptionType` of the delivery API. */
export type DeliveryOptionType = 'default' | 'express'

const DELIVERY_OPTION_TYPES: readonly DeliveryOptionType[] = ['default', 'express']

export const isDeliveryOptionType = (value: unknown): value is DeliveryOptionType =>
    DELIVERY_OPTION_TYPES.includes(value as DeliveryOptionType)

/** `CreateDeliveryOrderPersonDto`: firstname, lastname and phone are required, middlename is optional. */
export interface CreateDeliveryOrderPersonDto {
    firstname: string
    lastname: string
    middlename?: string
    phone: string
}

/** `CreateDeliveryOrderSenderAddressDto`: street, house and apartment are required. */
export interface CreateDeliveryOrderSenderAddressDto {
    street: string
    house: string
    apartment: string
    comment?: string
}

/** `CreateDeliveryOrderReceiverAddressDto`. */
export interface CreateDeliveryOrderReceiverAddressDto extends CreateDeliveryOrderSenderAddressDto {
    isNonContact?: boolean
}

/** Body of `POST /api/v1/delivery/order` (`CreateDeliveryOrderDto`); every top-level field is required. */
export interface CreateDeliveryOrderDto {
    packageId: string
    optionType: DeliveryOptionType
    senderPointId: string
    senderAddress: CreateDeliveryOrderSenderAddressDto
    sender: CreateDeliveryOrderPersonDto
    receiverPointId: string
    receiverAddress: CreateDeliveryOrderReceiverAddressDto
    receiver: CreateDeliveryOrderPersonDto
    payer: 'receiver' | 'sender'
}

/**
 * `DeliverResponse`. The created `DeliveryOrder` carries the whole order; the app reads only its id,
 * everything shown afterwards comes from the draft that was sent.
 */
export interface CreateDeliveryOrderResponse {
    success: boolean
    reason?: string
    order?: { _id: string }
}

/** Creates a delivery order. ky never retries POST requests, so one call sends exactly one request. */
export const createDeliveryOrder = (dto: CreateDeliveryOrderDto) =>
    apiClientV1.post('delivery/order', { json: dto }).json<CreateDeliveryOrderResponse>()
