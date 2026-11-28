import {
    type CreateDeliveryOrderDto,
    type CreateDeliveryOrderPersonDto,
    type CreateDeliveryOrderSenderAddressDto,
    isDeliveryOptionType,
} from '@/shared/api/ky/entities/delivery-order.api'
import { isAddressComplete, isPersonComplete } from '@/shared/lib/checkout-validation'

import type { AddressData, DeliveryCalculatorStore, RecipientData } from './DeliveryCalculatorStore'
import { isPayer } from './DeliveryCalculatorStore'

/** Draft values the order request is built from. */
export type OrderDraft = Pick<
    DeliveryCalculatorStore,
    | 'calculatedPackageId'
    | 'selectedDeliveryOption'
    | 'fromCity'
    | 'toCity'
    | 'recipient'
    | 'sender'
    | 'pickupAddress'
    | 'deliveryAddress'
    | 'leaveAtDoor'
    | 'payer'
>

/** A draft value the request cannot be built without; the UI maps each one to a readable name. */
export type OrderDraftField =
    | 'package'
    | 'deliveryOption'
    | 'fromCity'
    | 'toCity'
    | 'recipient'
    | 'sender'
    | 'pickupAddress'
    | 'deliveryAddress'
    | 'payer'

export type CreateOrderDtoResult =
    { ok: true; dto: CreateDeliveryOrderDto } | { ok: false; missingFields: OrderDraftField[] }

const isFilled = (value: string | null | undefined): value is string => Boolean(value?.trim())

const toPersonDto = (person: RecipientData): CreateDeliveryOrderPersonDto => ({
    firstname: person.firstName.trim(),
    lastname: person.lastName.trim(),
    middlename: person.middleName.trim(),
    phone: person.phone.trim(),
})

/** The courier note becomes the optional `comment`; an empty note is left out instead of being sent as ''. */
const toAddressDto = (address: AddressData): CreateDeliveryOrderSenderAddressDto => {
    const comment = address.courierNote.trim()

    return {
        street: address.street.trim(),
        house: address.house.trim(),
        apartment: address.apartment.trim(),
        ...(comment && { comment }),
    }
}

/**
 * Maps the checkout draft to `CreateDeliveryOrderDto`. Nothing is guessed: when a required value is missing,
 * the result lists it and no request may be sent.
 */
export function createOrderDto(draft: OrderDraft): CreateOrderDtoResult {
    const { calculatedPackageId, selectedDeliveryOption } = draft
    const optionType = selectedDeliveryOption?.type
    const missingFields: OrderDraftField[] = []

    if (!isFilled(calculatedPackageId)) missingFields.push('package')
    if (!isDeliveryOptionType(optionType)) missingFields.push('deliveryOption')
    if (!isFilled(draft.fromCity.id)) missingFields.push('fromCity')
    if (!isFilled(draft.toCity.id)) missingFields.push('toCity')
    if (!isPersonComplete(draft.recipient)) missingFields.push('recipient')
    if (!isPersonComplete(draft.sender)) missingFields.push('sender')
    if (!isAddressComplete(draft.pickupAddress)) missingFields.push('pickupAddress')
    if (!isAddressComplete(draft.deliveryAddress)) missingFields.push('deliveryAddress')
    if (!isPayer(draft.payer)) missingFields.push('payer')

    // The repeated checks only narrow the types; the values were validated above.
    if (missingFields.length > 0 || !isFilled(calculatedPackageId) || !isDeliveryOptionType(optionType)) {
        return { ok: false, missingFields }
    }

    return {
        ok: true,
        dto: {
            packageId: calculatedPackageId,
            optionType,
            senderPointId: draft.fromCity.id,
            senderAddress: toAddressDto(draft.pickupAddress),
            sender: toPersonDto(draft.sender),
            receiverPointId: draft.toCity.id,
            receiverAddress: {
                ...toAddressDto(draft.deliveryAddress),
                isNonContact: draft.leaveAtDoor,
            },
            receiver: toPersonDto(draft.recipient),
            payer: draft.payer,
        },
    }
}
