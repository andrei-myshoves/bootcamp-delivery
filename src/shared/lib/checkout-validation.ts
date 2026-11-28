import type { AddressData, RecipientData } from '@/store/DeliveryCalculatorStore'

const isFilled = (value: string) => value.trim().length > 0

/** Same required fields as the «Получатель» / «Отправитель» forms: last, first and middle name, phone. */
export const isPersonComplete = (person: RecipientData) =>
    [person.lastName, person.firstName, person.middleName, person.phone].every(isFilled)

/** Same required fields as the address forms: street, house and apartment (the courier note is optional). */
export const isAddressComplete = (address: AddressData) =>
    [address.street, address.house, address.apartment].every(isFilled)
