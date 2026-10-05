import { observer } from 'mobx-react-lite'
import { ChevronLeft } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { useStore } from '@/hooks/useStore'

const SenderPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { sender, recipient, selectedDeliveryOption } = deliveryCalculatorStore

    const handleBack = () => {
        void navigate({ to: '/recipient' })
    }

    const handleContinue = () => {
        const newErrors: Record<string, string> = {}

        if (!sender.lastName.trim()) {
            newErrors.lastName = t('recipient.fillLastName')
        }

        if (!sender.firstName.trim()) {
            newErrors.firstName = t('recipient.fillFirstName')
        }

        if (!sender.middleName.trim()) {
            newErrors.middleName = t('recipient.fillMiddleName')
        }

        if (!sender.phone.trim()) {
            newErrors.phone = t('recipient.fillPhone')
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        void navigate({ to: '/pickup-address' })
    }

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setSender({
            ...sender,
            lastName: event.target.value,
        })
    }

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setSender({
            ...sender,
            firstName: event.target.value,
        })
    }

    const handleMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setSender({
            ...sender,
            middleName: event.target.value,
        })
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setSender({
            ...sender,
            phone: event.target.value.replace(/[^\d+() -]/g, ''),
        })
    }

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
                    <span className="text-primary">{t('sender.breadcrumbSender')}</span>
                </div>

                <h1 className="mb-6 text-2xl font-bold">{t('sender.title')}</h1>
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

                    <h1 className="text-2xl font-bold">{t('sender.title')}</h1>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_482px]">
                <div>
                    <div className="mb-6">
                        <p className="mb-1 text-sm">{t('sender.step')}</p>

                        <div className="bg-muted h-1 overflow-hidden rounded-full">
                            <div className="bg-progress-bar h-full w-[43%] rounded-full" />
                        </div>
                    </div>

                    <div className="max-w-118.75">
                        <div className="space-y-4">
                            <Input
                                label={t('recipient.lastName')}
                                placeholder={t('recipient.lastNamePlaceholder')}
                                value={sender.lastName}
                                onChange={handleLastNameChange}
                            />

                            {errors.lastName && <p className="text-destructive text-sm">{errors.lastName}</p>}

                            <Input
                                label={t('recipient.firstName')}
                                placeholder={t('recipient.firstNamePlaceholder')}
                                value={sender.firstName}
                                onChange={handleFirstNameChange}
                            />

                            {errors.firstName && <p className="text-destructive text-sm">{errors.firstName}</p>}

                            <Input
                                label={t('recipient.middleName')}
                                placeholder={t('recipient.middleNamePlaceholder')}
                                value={sender.middleName}
                                onChange={handleMiddleNameChange}
                            />

                            {errors.middleName && <p className="text-destructive text-sm">{errors.middleName}</p>}

                            <Input
                                label={t('recipient.phone')}
                                placeholder={t('recipient.phonePlaceholder')}
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9+() -]*"
                                value={sender.phone}
                                onChange={handlePhoneChange}
                            />

                            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
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

                <div className="bg-muted hidden self-start rounded-3xl px-10 py-6 lg:-mt-25 lg:block">
                    <h2 className="text-2xl font-bold">{t('recipient.order')}</h2>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('recipient.deliveryType')}</p>

                        <p className="mt-1 text-sm">{selectedDeliveryOption?.name ?? t('recipient.notSelected')}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('recipient.recipient')}</p>

                        <p className="mt-1 text-sm">
                            {recipient.lastName || recipient.firstName || recipient.middleName
                                ? `${recipient.lastName} ${recipient.firstName} ${recipient.middleName}`.trim()
                                : t('recipient.fillFields')}
                        </p>

                        {recipient.phone && <p className="mt-1 text-sm">{recipient.phone}</p>}
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">{t('sender.sender')}</p>

                        <p className="mt-1 text-sm">
                            {sender.lastName || sender.firstName || sender.middleName
                                ? `${sender.lastName} ${sender.firstName} ${sender.middleName}`.trim()
                                : t('recipient.fillFields')}
                        </p>

                        {sender.phone && <p className="mt-1 text-sm">{sender.phone}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(SenderPage)
