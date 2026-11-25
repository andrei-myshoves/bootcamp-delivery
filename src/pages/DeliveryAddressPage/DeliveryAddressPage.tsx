import { observer } from 'mobx-react-lite'
import { ChevronLeft, ChevronRight, House } from 'lucide-react'
import { type ChangeEvent, Fragment, useId, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { InfoTooltip } from '@/components/ui/info-tooltip/InfoTooltip'
import { Input } from '@/components/ui/input/Input'
import { useStore } from '@/hooks/useStore'
import type { AddressData, RecipientData } from '@/store/DeliveryCalculatorStore'

type AddressField = keyof AddressData
type AddressErrors = Partial<Record<AddressField, string>>

interface OrderSummaryRow {
    label: string
    value: string
}

const formatPerson = (person: RecipientData) => {
    const fullName = [person.lastName, person.firstName, person.middleName].filter(Boolean).join(' ')

    return [fullName, person.phone].filter(Boolean).join(', ')
}

const formatAddress = (address: AddressData) =>
    [address.street, address.house, address.apartment].filter(Boolean).join(', ')

const getErrorId = (fieldId: string) => `${fieldId}-error`

const DeliveryAddressPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const fieldIdPrefix = useId()
    const leaveAtDoorId = useId()

    const [errors, setErrors] = useState<AddressErrors>({})

    const { deliveryAddress, leaveAtDoor, recipient, sender, selectedDeliveryOption, pickupAddress } =
        deliveryCalculatorStore

    const breadcrumbs = [
        t('recipient.breadcrumbDeliveryType'),
        t('recipient.breadcrumbRecipient'),
        t('sender.breadcrumbSender'),
        t('pickupAddress.breadcrumbPickup'),
    ]

    const addressFields: { name: AddressField; label: string }[] = [
        { name: 'street', label: t('pickupAddress.street') },
        { name: 'house', label: t('pickupAddress.house') },
        { name: 'apartment', label: t('pickupAddress.apartment') },
        { name: 'courierNote', label: t('pickupAddress.courierNote') },
    ]

    const fillFields = t('recipient.fillFields')

    const summaryRows: OrderSummaryRow[] = [
        { label: t('recipient.deliveryType'), value: selectedDeliveryOption?.name ?? t('recipient.notSelected') },
        { label: t('recipient.recipient'), value: formatPerson(recipient) || fillFields },
        { label: t('sender.sender'), value: formatPerson(sender) || fillFields },
        { label: t('pickupAddress.pickupAddress'), value: formatAddress(pickupAddress) || fillFields },
        { label: t('deliveryAddress.deliveryAddress'), value: formatAddress(deliveryAddress) || fillFields },
    ]

    if (leaveAtDoor) {
        summaryRows.push({ label: t('deliveryAddress.note'), value: t('deliveryAddress.leaveAtDoor') })
    }

    const handleBack = () => {
        void navigate({ to: '/pickup-address' })
    }

    const handleFieldChange = (field: AddressField) => (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setDeliveryAddress({
            ...deliveryAddress,
            [field]: event.target.value,
        })
    }

    const handleLeaveAtDoorChange = (checked: boolean | 'indeterminate') => {
        deliveryCalculatorStore.setLeaveAtDoor(checked === true)
    }

    const handleContinue = () => {
        const newErrors: AddressErrors = {}

        if (!deliveryAddress.street.trim()) {
            newErrors.street = t('deliveryAddress.fillStreet')
        }

        if (!deliveryAddress.house.trim()) {
            newErrors.house = t('deliveryAddress.fillHouse')
        }

        if (!deliveryAddress.apartment.trim()) {
            newErrors.apartment = t('deliveryAddress.fillApartment')
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }
    }

    return (
        // pb-14 keeps the last controls above the fixed mobile footer, which is taller than the layout's bottom padding.
        <div className="w-full pb-14 lg:pb-0">
            <div className="mb-6 flex items-center gap-4 lg:hidden">
                <Button
                    variant="wrapper"
                    className="bg-transparent"
                    size="icon"
                    aria-label={t('recipient.backAriaLabel')}
                    onClick={handleBack}
                >
                    <ChevronLeft className="size-6" />
                </Button>

                <h1 className="text-2xl leading-8 font-bold">{t('deliveryAddress.title')}</h1>
            </div>

            <div className="lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_482px] lg:items-start lg:gap-4">
                <div className="flex flex-col gap-4 lg:gap-6">
                    <nav aria-label={t('deliveryAddress.breadcrumbAriaLabel')} className="hidden lg:block">
                        <ol className="flex min-h-9 flex-wrap items-center gap-2 px-3 text-sm">
                            <li>
                                <House className="text-muted-foreground size-4" aria-hidden />
                            </li>

                            {breadcrumbs.map(crumb => (
                                <Fragment key={crumb}>
                                    <li aria-hidden>
                                        <ChevronRight className="text-muted-foreground size-4" />
                                    </li>
                                    <li className="text-muted-foreground">{crumb}</li>
                                </Fragment>
                            ))}

                            <li aria-hidden>
                                <ChevronRight className="text-muted-foreground size-4" />
                            </li>
                            <li aria-current="page" className="text-foreground font-semibold">
                                {t('deliveryAddress.breadcrumbDelivery')}
                            </li>
                        </ol>
                    </nav>

                    <h1 className="hidden text-2xl leading-8 font-bold lg:block">{t('deliveryAddress.title')}</h1>

                    <div>
                        <p className="pb-1 text-sm font-medium">{t('deliveryAddress.step')}</p>

                        <div className="bg-muted h-1 overflow-hidden rounded-full">
                            <div className="bg-progress-bar h-full w-5/7 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:max-w-85.5 lg:gap-6">
                        {addressFields.map(({ name, label }) => {
                            const fieldId = `${fieldIdPrefix}-${name}`
                            const error = errors[name]

                            return (
                                <div key={name} className="flex flex-col gap-1">
                                    <Input
                                        id={fieldId}
                                        label={label}
                                        value={deliveryAddress[name]}
                                        onChange={handleFieldChange(name)}
                                        aria-invalid={error ? true : undefined}
                                        aria-describedby={error ? getErrorId(fieldId) : undefined}
                                    />

                                    {error && (
                                        <p id={getErrorId(fieldId)} className="text-destructive text-sm">
                                            {error}
                                        </p>
                                    )}
                                </div>
                            )
                        })}

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id={leaveAtDoorId}
                                checked={leaveAtDoor}
                                onCheckedChange={handleLeaveAtDoorChange}
                            />

                            <label htmlFor={leaveAtDoorId} className="cursor-pointer text-base leading-6 font-medium">
                                {t('deliveryAddress.leaveAtDoor')}
                            </label>

                            <InfoTooltip
                                title={t('deliveryAddress.contactlessTitle')}
                                description={t('deliveryAddress.contactlessDescription')}
                                triggerLabel={t('deliveryAddress.contactlessTriggerLabel')}
                                closeLabel={t('deliveryAddress.contactlessCloseLabel')}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex w-full gap-4 lg:mt-0">
                        <Button variant="secondary" size="large" className="hidden flex-1 lg:flex" onClick={handleBack}>
                            {t('recipient.back')}
                        </Button>

                        <Button variant="primary" size="large" className="flex-1" onClick={handleContinue}>
                            {t('recipient.continue')}
                        </Button>
                    </div>
                </div>

                <aside className="bg-secondary hidden flex-col gap-4 rounded-3xl px-10 py-6 lg:flex">
                    <h2 className="text-2xl leading-8 font-bold">{t('recipient.order')}</h2>

                    <dl className="flex flex-col gap-4">
                        {summaryRows.map(row => (
                            <div key={row.label} className="flex flex-col gap-0.5">
                                <dt className="text-muted-foreground text-sm leading-5.5 font-medium">{row.label}</dt>
                                <dd className="text-lg leading-6.5">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>
        </div>
    )
}

export default observer(DeliveryAddressPage)
