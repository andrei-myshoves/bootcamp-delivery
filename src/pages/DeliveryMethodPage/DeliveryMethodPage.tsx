import { observer } from 'mobx-react-lite'
import { BusFront, ChevronLeft, ChevronRight, House, Plane } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'
import { useStore } from '@/hooks/useStore'
import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'

import ReferalBox1 from '@/shared/assets/ReferalBox1.webp'
import ReferalBox2 from '@/shared/assets/ReferalBox2.webp'
import ReferalBox3 from '@/shared/assets/ReferalBox3.webp'

const DeliveryMethodPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()
    const deliveryOptions = useMemo(
        () =>
            [...deliveryCalculatorStore.deliveryOptions].sort((a, b) => {
                if (a.type === 'express') return -1
                if (b.type === 'express') return 1
                return 0
            }),
        [deliveryCalculatorStore.deliveryOptions]
    )
    const handleContinue = () => {
        // TODO: navigate to recipient page
    }
    const referralImages = [
        {
            src: ReferalBox3,
            className:
                'z-(--z-referral-banner-image-back) right-7 bottom-9 w-16 h-12 rotate-2 lg:left-60 lg:bottom-14 lg:w-27 lg:h-21',
        },
        {
            src: ReferalBox1,
            className:
                'z-(--z-referral-banner-image-middle) right-0 bottom-0 w-23 h-18 rotate-2 lg:left-65 lg:bottom-0 lg:w-38 lg:h-30',
        },
        {
            src: ReferalBox2,
            className:
                'z-(--z-referral-banner-image-front) right-2.5 bottom-10 w-12 h-9 rotate-2 lg:left-77 lg:bottom-16 lg:w-20 lg:h-16',
        },
    ]

    return (
        <div className="w-full max-w-5xl lg:max-w-184">
            <div className="hidden lg:block">
                <div className="text-muted-foreground mt-40 mb-6 flex items-center text-sm">
                    <House className="size-4" />
                    <ChevronRight className="mx-2 size-4">›</ChevronRight>
                    <span className="text-black">Тип доставки</span>
                </div>

                <h1 className="mb-6 text-2xl font-bold">Тип доставки</h1>
            </div>

            <div className="lg:hidden">
                <div className="mb-6 flex items-center gap-4">
                    <Button
                        variant="wrapper"
                        className="bg-transparent"
                        size="icon"
                        aria-label="Назад"
                        onClick={() => navigate({ to: '/' })}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>

                    <h1 className="text-2xl font-bold">Способ отправки</h1>
                </div>
            </div>

            <div className="mb-6">
                <p className="mb-1 text-sm">Шаг 1 из 7</p>

                <div className="bg-muted h-1 overflow-hidden rounded-full">
                    <div className="h-full w-[10%] rounded-full bg-green-500" />
                </div>
            </div>

            <div className="space-y-3">
                {deliveryOptions.map(option => {
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
                                        <BusFront className="size-5" />
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
                                onClick={handleContinue}
                            >
                                <ChevronRight className="size-6" />
                            </Button>
                        </div>
                    )
                })}
            </div>

            <ReferralBanner
                title="1+1=3"
                subtitle="3-я доставка в подарок!"
                images={referralImages}
                className="mt-4 h-28 lg:h-37"
                imageClassName="right-4 bottom-0 h-full"
            />
        </div>
    )
}

export default observer(DeliveryMethodPage)
