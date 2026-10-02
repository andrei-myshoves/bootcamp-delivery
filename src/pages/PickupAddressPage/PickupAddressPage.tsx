import { observer } from 'mobx-react-lite'
import { ChevronLeft } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { useStore } from '@/hooks/useStore'

const PickupAddressPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [errors, setErrors] = useState<Record<string, string>>({})

    const { pickupAddress, recipient, sender, selectedDeliveryOption } = deliveryCalculatorStore

    const handleBack = () => {
        void navigate({ to: '/sender' })
    }

    const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setPickupAddress({
            ...pickupAddress,
            street: event.target.value,
        })
    }

    const handleHouseChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setPickupAddress({
            ...pickupAddress,
            house: event.target.value,
        })
    }

    const handleApartmentChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setPickupAddress({
            ...pickupAddress,
            apartment: event.target.value,
        })
    }

    const handleCourierNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setPickupAddress({
            ...pickupAddress,
            courierNote: event.target.value,
        })
    }

    const handleContinue = () => {
        const newErrors: Record<string, string> = {}

        if (!pickupAddress.street.trim()) {
            newErrors.street = t('pickupAddress.fillStreet')
        }

        if (!pickupAddress.house.trim()) {
            newErrors.house = t('pickupAddress.fillHouse')
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        void navigate({ to: '/delivery-address' })
    }

    const recipientName = `${recipient.lastName} ${recipient.firstName} ${recipient.middleName}`.trim()
    const senderName = `${sender.lastName} ${sender.firstName} ${sender.middleName}`.trim()

    const pickupAddressText = [pickupAddress.street, pickupAddress.house, pickupAddress.apartment]
        .filter(Boolean)
        .join(', ')

    return (
        <div className="w-full">
            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="text-muted-foreground mt-12 mb-6 flex items-center text-sm">
                    <span>⌂</span>
                    <span className="mx-2">›</span>
                    <span>{t('recipient.breadcrumbDeliveryType')}</span>
                    <span className="mx-2">›</span>
                    <span>{t('recipient.breadcrumbRecipient')}</span>
                    <span className="mx-2">›</span>
                    <span>{t('sender.breadcrumbSender')}</span>
                    <span className="mx-2">›</span>
                    <span className="text-primary">{t('pickupAddress.breadcrumbPickup')}</span>
                </div>

                <h1 className="mb-6 text-2xl font-bold">{t('pickupAddress.title')}</h1>
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
                <div className="mb-6 flex items-center gap-4">
                    <Button
                        variant="wrapper"
                        className="bg-transparent"
                        size="icon"
                        aria-label={t('recipient.backAriaLabel')}
                        onClick={handleBack}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>

                    <h1 className="text-2xl font-bold">{t('pickupAddress.title')}</h1>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_482px]">
                <div>
                    <div className="mb-6">
                        <p className="mb-1 text-sm">{t('pickupAddress.step')}</p>

                        <div className="bg-muted h-1 overflow-hidden rounded-full">
                            <div className="bg-progress-bar h-full w-1/2 rounded-full" />
                        </div>
                    </div>

                    <div className="max-w-118.75">
                        <div className="space-y-4">
                            <Input
                                label={t('pickupAddress.street')}
                                placeholder={t('pickupAddress.streetPlaceholder')}
                                value={pickupAddress.street}
                                onChange={handleStreetChange}
                            />

                            {errors.street && <p className="text-destructive text-sm">{errors.street}</p>}

                            <Input
                                label={t('pickupAddress.house')}
                                placeholder={t('pickupAddress.housePlaceholder')}
                                value={pickupAddress.house}
                                onChange={handleHouseChange}
                            />

                            {errors.house && <p className="text-destructive text-sm">{errors.house}</p>}

                            <Input
                                label={t('pickupAddress.apartment')}
                                placeholder={t('pickupAddress.apartmentPlaceholder')}
                                value={pickupAddress.apartment}
                                onChange={handleApartmentChange}
                            />

                            <Input
                                label={t('pickupAddress.courierNote')}
                                placeholder={t('pickupAddress.courierNotePlaceholder')}
                                value={pickupAddress.courierNote}
                                onChange={handleCourierNoteChange}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex w-full gap-3">
                        <Button variant="secondary" size="form" className="hidden flex-1 lg:flex" onClick={handleBack}>
                            {t('recipient.back')}
                        </Button>

                        <Button variant="primary" size="form" className="flex-1" onClick={handleContinue}>
                            {t('recipient.continue')}
                        </Button>
                    </div>
                </div>

                {/* Order */}
                <div className="bg-muted hidden self-start rounded-3xl px-10 py-6 lg:-mt-25 lg:block">
                    <h2 className="text-2xl font-bold">{t('recipient.order')}</h2>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('recipient.deliveryType')}</p>

                        <p className="mt-1 text-sm">{selectedDeliveryOption?.name ?? t('recipient.notSelected')}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('recipient.recipient')}</p>

                        <p className="mt-1 text-sm">{recipientName || t('recipient.fillFields')}</p>

                        {recipient.phone && <p className="mt-1 text-sm">{recipient.phone}</p>}
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('sender.sender')}</p>

                        <p className="mt-1 text-sm">{senderName || t('recipient.fillFields')}</p>

                        {sender.phone && <p className="mt-1 text-sm">{sender.phone}</p>}
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('pickupAddress.pickupAddress')}</p>

                        <p className="mt-1 text-sm">{pickupAddressText || t('recipient.fillFields')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(PickupAddressPage)
