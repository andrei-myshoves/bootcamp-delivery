import {
    type CreateDeliveryOrderDto,
    type CreateDeliveryOrderPersonDto,
    type CreateDeliveryOrderSenderAddressDto,
    isDeliveryOptionType,
} from '@/shared/api/ky/entities/delivery-order.api'
import { isAddressComplete, isPersonComplete } from '@/shared/lib/checkout-validation'
import { type AddressData, isPayer, type Payer, type RecipientData } from '@/store/DeliveryCalculatorStore'

/** Exactly the draft values the order request is built from; the caller picks them from the store. */
export interface OrderDraft {
    /** Id of the package the tariffs were calculated for; null when it is unknown. */
    packageId: string | null
    /** `type` of the selected tariff; null while no tariff is selected. */
    optionType: string | null
    senderPointId: string
    receiverPointId: string
    sender: RecipientData
    receiver: RecipientData
    senderAddress: AddressData
    receiverAddress: AddressData
    isNonContact: boolean
    payer: Payer
}

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

const isFilled = (value: string | null): value is string => Boolean(value?.trim())

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
    const { packageId, optionType } = draft
    const missingFields: OrderDraftField[] = []

    if (!isFilled(packageId)) missingFields.push('package')
    if (!isDeliveryOptionType(optionType)) missingFields.push('deliveryOption')
    if (!isFilled(draft.senderPointId)) missingFields.push('fromCity')
    if (!isFilled(draft.receiverPointId)) missingFields.push('toCity')
    if (!isPersonComplete(draft.receiver)) missingFields.push('recipient')
    if (!isPersonComplete(draft.sender)) missingFields.push('sender')
    if (!isAddressComplete(draft.senderAddress)) missingFields.push('pickupAddress')
    if (!isAddressComplete(draft.receiverAddress)) missingFields.push('deliveryAddress')
    if (!isPayer(draft.payer)) missingFields.push('payer')

    // The repeated checks only narrow the types; the values were validated above.
    if (missingFields.length > 0 || !isFilled(packageId) || !isDeliveryOptionType(optionType)) {
        return { ok: false, missingFields }
    }

    return {
        ok: true,
        dto: {
            packageId,
            optionType,
            senderPointId: draft.senderPointId,
            senderAddress: toAddressDto(draft.senderAddress),
            sender: toPersonDto(draft.sender),
            receiverPointId: draft.receiverPointId,
            receiverAddress: {
                ...toAddressDto(draft.receiverAddress),
                isNonContact: draft.isNonContact,
            },
            receiver: toPersonDto(draft.receiver),
            payer: draft.payer,
        },
    }
}
