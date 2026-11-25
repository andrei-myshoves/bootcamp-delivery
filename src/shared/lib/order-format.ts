import type { AddressData, RecipientData } from '@/store/DeliveryCalculatorStore'

/** «Фамилия Имя Отчество, телефон»; empty parts are skipped, an empty person gives ''. */
export const formatPerson = (person: RecipientData) => {
    const fullName = [person.lastName, person.firstName, person.middleName].filter(Boolean).join(' ')

    return [fullName, person.phone].filter(Boolean).join(', ')
}

/** «улица, дом, квартира»; empty parts are skipped, an empty address gives ''. */
export const formatAddress = (address: AddressData) =>
    [address.street, address.house, address.apartment].filter(Boolean).join(', ')
