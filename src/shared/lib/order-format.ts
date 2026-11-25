import type { AddressData, RecipientData } from '@/store/DeliveryCalculatorStore'

const KOPECKS_IN_RUBLE = 100

const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
})

/** «Фамилия Имя Отчество, телефон»; empty parts are skipped, an empty person gives ''. */
export const formatPerson = (person: RecipientData) => {
    const fullName = [person.lastName, person.firstName, person.middleName].filter(Boolean).join(' ')

    return [fullName, person.phone].filter(Boolean).join(', ')
}

/**
 * «г. Город, улица, дом, квартира»; empty parts are skipped.
 * An address without street, house and apartment gives '' even when the city is known.
 */
export const formatAddress = (address: AddressData, cityName?: string) => {
    const addressParts = [address.street, address.house, address.apartment].filter(Boolean)

    if (addressParts.length === 0) {
        return ''
    }

    const cityPart = cityName ? `г. ${cityName}` : ''

    return [cityPart, ...addressParts].filter(Boolean).join(', ')
}

/**
 * Formats a delivery price. The delivery API returns prices in kopecks («Цена доставки в копейках»),
 * so 78000 → «780 ₽» and 63389 → «633,89 ₽».
 */
export const formatPrice = (priceInKopecks: number) => priceFormatter.format(priceInKopecks / KOPECKS_IN_RUBLE)
