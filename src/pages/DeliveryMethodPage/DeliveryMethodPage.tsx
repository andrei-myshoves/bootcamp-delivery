import { observer } from 'mobx-react-lite'
import { BusFront, ChevronLeft, ChevronRight, House, Plane } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'
import { useStore } from '@/hooks/useStore'
import { useNavigate } from '@tanstack/react-router'

import ReferalBox1 from '@/shared/assets/ReferalBox1.webp'
import ReferalBox2 from '@/shared/assets/ReferalBox2.webp'
import ReferalBox3 from '@/shared/assets/ReferalBox3.webp'

const DeliveryMethodPage = () => {
    const { deliveryCalculatorStore } = useStore()
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-5xl">
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
                {[...deliveryCalculatorStore.deliveryOptions]
                    .sort((a, b) => {
                        if (a.type === 'express') return -1
                        if (b.type === 'express') return 1
                        return 0
                    })
                    .map(option => {
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
                                    onClick={() => {
                                        // TODO: navigate to recipient page
                                    }}
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
                images={[
                    {
                        src: ReferalBox3,
                        className:
                            'z-0 right-[40px] bottom-[40px] w-[63.95px] h-[50.25px] rotate-[2deg] lg:left-[240px] lg:bottom-[55px] lg:w-[107.48px] lg:h-[84.24px]',
                    },
                    {
                        src: ReferalBox1,
                        className:
                            'z-10 right-[0px] bottom-[0px] w-[90.7px] h-[71.27px] rotate-[2deg] lg:left-[260px] lg:bottom-[0px] lg:w-[151.09px] lg:h-[118.71px]',
                    },
                    {
                        src: ReferalBox2,
                        className:
                            'z-20 right-[10px] bottom-[40px] w-[47.6px] h-[37.4px] rotate-[2deg] lg:left-[310px] lg:bottom-[65px] lg:w-[80.33px] lg:h-[63.33px]',
                    },
                ]}
                className="mt-4 h-28 lg:h-37"
                imageClassName="right-4 bottom-0 h-full"
            />
        </div>
    )
}

export default observer(DeliveryMethodPage)
