import { observer } from 'mobx-react-lite'
import { ArrowLeft, ArrowRight, Package, Plane } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'
import { useStore } from '@/hooks/useStore'
import { useNavigate } from '@tanstack/react-router'

import BoxM from '@/shared/assets/Box M.svg'

const DeliveryMethodPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-5xl">
            <div className="hidden lg:block">
                <div className="text-muted-foreground mb-6 text-sm">
                    <span>⌂</span>
                    <span className="mx-2">›</span>
                    <span>Тип доставки</span>
                </div>

                <h1 className="mb-6 text-4xl font-bold">Тип доставки</h1>
            </div>

            <div className="lg:hidden">
                <div className="mb-6 flex items-center gap-3">
                    <Button
                        variant="wrapper"
                        className="bg-transparent"
                        size="icon"
                        aria-label="Назад"
                        onClick={() => navigate({ to: '/' })}
                    >
                        <ArrowLeft className="size-5" />
                    </Button>

                    <h1 className="text-2xl font-bold">Способ отправки</h1>
                </div>
            </div>

            <div className="mb-6">
                <p className="mb-2 text-sm">Шаг 1 из 7</p>

                <div className="bg-muted h-1 overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-[14%] rounded-full" />
                </div>
            </div>

            <div className="space-y-3">
                {deliveryCalculatorStore.deliveryOptions.map(option => {
                    const isSelected = deliveryCalculatorStore.selectedDeliveryOption?.id === option.id

                    return (
                        <div
                            key={option.id}
                            className={`flex w-full items-center rounded-2xl border p-4 transition ${
                                isSelected ? 'border-primary' : 'border-border'
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => deliveryCalculatorStore.selectDeliveryOption(option)}
                                className="flex min-w-0 flex-1 items-center gap-4 text-left"
                            >
                                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                                    {option.type === 'express' ? (
                                        <Plane className="size-5" />
                                    ) : (
                                        <Package className="size-5" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-muted-foreground text-sm">{option.name}</p>

                                    <p className="text-2xl font-medium">{option.price} ₽</p>

                                    <p className="text-muted-foreground text-sm">
                                        {option.days} {option.days === 1 ? 'рабочий день' : 'рабочих дня'}
                                    </p>
                                </div>
                            </button>

                            <Button
                                variant="wrapper"
                                className="bg-transparent"
                                size="icon"
                                aria-label="Продолжить"
                                disabled={!isSelected}
                                onClick={() => {
                                    // TODO: navigate to recipient page
                                }}
                            >
                                <ArrowRight className="size-5" />
                            </Button>
                        </div>
                    )
                })}
            </div>

            <ReferralBanner
                title="1+1=3"
                subtitle="3-я доставка в подарок!"
                image={BoxM}
                className="mt-4 h-28"
                imageClassName="right-4 bottom-0 h-full"
            />
        </div>
    )
}

export default observer(DeliveryMethodPage)
