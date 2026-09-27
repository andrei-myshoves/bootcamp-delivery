import { observer } from 'mobx-react-lite'
import { ChevronLeft } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { useStore } from '@/hooks/useStore'

const RecipientPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()

    const [errors, setErrors] = useState<Record<string, string>>({})

    const { recipient, selectedDeliveryOption } = deliveryCalculatorStore

    const handleBack = () => {
        void navigate({ to: '/deliverymethod' })
    }

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setRecipient({
            ...recipient,
            lastName: event.target.value,
        })
    }

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setRecipient({
            ...recipient,
            firstName: event.target.value,
        })
    }

    const handleMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setRecipient({
            ...recipient,
            middleName: event.target.value,
        })
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        deliveryCalculatorStore.setRecipient({
            ...recipient,
            phone: event.target.value.replace(/[^\d+() -]/g, ''),
        })
    }

    const handleContinue = () => {
        const newErrors: Record<string, string> = {}

        if (!recipient.lastName.trim()) {
            newErrors.lastName = 'Заполните фамилию'
        }

        if (!recipient.firstName.trim()) {
            newErrors.firstName = 'Заполните имя'
        }

        if (!recipient.middleName.trim()) {
            newErrors.middleName = 'Заполните отчество'
        }

        if (!recipient.phone.trim()) {
            newErrors.phone = 'Заполните телефон'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        void navigate({ to: '/sender' })
    }

    return (
        <div className="w-full">
            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="text-muted-foreground mt-12 mb-6 flex items-center text-sm">
                    <span>⌂</span>
                    <span className="mx-2">›</span>
                    <span>Тип доставки</span>
                    <span className="mx-2">›</span>
                    <span className="text-primary">Получатель</span>
                </div>

                <h1 className="mb-6 text-2xl font-bold">Получатель</h1>
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
                <div className="mb-6 flex items-center gap-4">
                    <Button
                        variant="wrapper"
                        className="bg-transparent"
                        size="icon"
                        aria-label="Назад"
                        onClick={handleBack}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>

                    <h1 className="text-2xl font-bold">Получатель</h1>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_482px]">
                <div>
                    <div className="mb-6">
                        <p className="mb-1 text-sm">Шаг 2 из 7</p>

                        <div className="bg-muted h-1 overflow-hidden rounded-full">
                            <div className="bg-progress-bar h-full w-1/4 rounded-full" />
                        </div>
                    </div>

                    <div className="max-w-118.75">
                        <div className="space-y-4">
                            <Input
                                label="Фамилия"
                                placeholder="Иванов"
                                value={recipient.lastName}
                                onChange={handleLastNameChange}
                            />

                            {errors.lastName && <p className="text-destructive text-sm">{errors.lastName}</p>}

                            <Input
                                label="Имя"
                                placeholder="Иван"
                                value={recipient.firstName}
                                onChange={handleFirstNameChange}
                            />

                            {errors.firstName && <p className="text-destructive text-sm">{errors.firstName}</p>}

                            <Input
                                label="Отчество"
                                placeholder="Иванович"
                                value={recipient.middleName}
                                onChange={handleMiddleNameChange}
                            />

                            {errors.middleName && <p className="text-destructive text-sm">{errors.middleName}</p>}

                            <Input
                                label="Телефон"
                                placeholder="+7"
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9+() -]*"
                                value={recipient.phone}
                                onChange={handlePhoneChange}
                            />

                            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="mt-6 flex w-full gap-3">
                        <Button variant="secondary" size="form" className="hidden flex-1 lg:flex" onClick={handleBack}>
                            Назад
                        </Button>

                        <Button variant="primary" size="form" className="flex-1" onClick={handleContinue}>
                            Продолжить
                        </Button>
                    </div>
                </div>

                <div className="bg-muted hidden self-start rounded-3xl px-10 py-6 lg:-mt-25 lg:block">
                    <h2 className="text-2xl font-bold">Ваш заказ</h2>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">Тип доставки</p>

                        <p className="mt-1 text-sm">{selectedDeliveryOption?.name ?? 'Не выбрано'}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-muted-foreground text-sm">Получатель</p>

                        <p className="mt-1 text-sm">
                            {recipient.lastName || recipient.firstName || recipient.middleName
                                ? `${recipient.lastName} ${recipient.firstName} ${recipient.middleName}`.trim()
                                : 'Заполните поля'}
                        </p>

                        {recipient.phone && <p className="mt-1 text-sm">{recipient.phone}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(RecipientPage)
