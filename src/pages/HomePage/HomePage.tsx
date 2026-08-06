import { useEffect } from 'react'

import { Card } from '@/components/ui/card/Card'
import { Input } from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { UiSelect } from '@/components/ui/select/Select'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'
import { ArrowRight } from 'lucide-react'

import { apiClientV1 } from '@/shared/api/ky/instance'

import DesktopBanner from '@/shared/assets/DekstopBanner.webp'
import ReferralBannerHands from '@/shared/assets/ReferalBannerHands.webp'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClientV1.get('delivery/points').json()

            console.log(data)
        }

        fetchData()
    }, [])

    const { t } = useTranslation()

    return (
        <div className="space-y-4">
            {/* Desktop */}
            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
                <Card className="space-y-6">
                    <h2 className="text-4xl font-bold">{t('calculator.title')}</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.from')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectCity')} options={[]} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.to')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectCity')} options={[]} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.size')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectSize')} options={[]} />
                        </div>
                    </div>

                    <Button size="form" className="w-full">
                        {t('calculator.calculate')}
                        <ArrowRight className="size-4" />
                    </Button>
                </Card>

                <Card className="overflow-hidden p-0">
                    <img src={DesktopBanner} alt="Delivery" className="h-full w-full object-cover" />
                </Card>

                <ReferralBanner
                    title={t('referralBanner.freeDelivery')}
                    subtitle={t('referralBanner.inviteFriend')}
                    image={ReferralBannerHands}
                    className="h-43"
                    imageClassName="right-0 bottom-0 h-[115%]"
                />

                <Card className="space-y-6">
                    <h2 className="text-2xl font-bold">{t('trackParcel.title')}</h2>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <Input
                            className="py-3.5 px-4  flex-1 text-2xl placeholder:text-input-placeholder"
                            placeholder={t('trackParcel.placeholder')}
                        />

                        <Button size="form">{t('trackParcel.find')}</Button>
                    </div>
                </Card>
            </div>

            {/* Mobile */}
            <div className="space-y-4 lg:hidden">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold">{t('calculator.title')}</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.from')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectCity')} options={[]} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.to')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectCity')} options={[]} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.size')}</p>

                            <UiSelect size="form" placeholder={t('calculator.selectSize')} options={[]} />
                        </div>
                    </div>

                    <Button size="form" className="w-full">
                        {t('calculator.calculate')}
                        <ArrowRight className="size-4" />
                    </Button>
                </Card>

                <Card className="space-y-6 p-6">
                    <h2 className="text-2xl font-bold">{t('trackParcel.title')}</h2>

                    <Input placeholder={t('trackParcel.placeholder')} />

                    <Button size="form">{t('trackParcel.find')}</Button>
                </Card>

                <ReferralBanner
                    title={t('referralBanner.freeDelivery')}
                    subtitle={t('referralBanner.inviteFriend')}
                    image={ReferralBannerHands}
                    className="h-22.5"
                    imageClassName="right-0 bottom-0 h-full"
                />
            </div>
        </div>
    )
}

export default HomePage
