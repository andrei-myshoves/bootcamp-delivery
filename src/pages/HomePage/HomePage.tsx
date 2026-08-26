import { useEffect } from 'react'

import { Card } from '@/components/ui/card/Card'
import { Input } from '@/components/ui/input/Input'
import { Button } from '@/components/ui/button/Button'
import { CitySelectSheet } from '@/components/ui/city-select/CitySelectSheet'
import { PackageSelectSheet } from '@/components/ui/package-select/PackageSelectSheet'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'
import { ArrowRight } from 'lucide-react'

import DesktopBanner from '@/shared/assets/DekstopBanner.webp'
import ReferralBannerHands from '@/shared/assets/ReferalBannerHands.webp'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'

const HomePage = () => {
    const { deliveryCalculatorStore } = useStore()
    const { t } = useTranslation()

    useEffect(() => {
        void deliveryCalculatorStore.fetchCities()
        void deliveryCalculatorStore.fetchPackageTypes()
    }, [deliveryCalculatorStore])

    return (
        <div className="space-y-4">
            {/* Desktop */}
            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
                <Card className="space-y-6">
                    <h2 className="text-4xl font-bold">{t('calculator.title')}</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.from')}</p>

                            <CitySelectSheet
                                sheetTitle={t('calculator.where')}
                                placeholder={t('calculator.selectCity')}
                                cities={deliveryCalculatorStore.cities}
                                value={deliveryCalculatorStore.fromCity}
                                popularCities={deliveryCalculatorStore.fromPopularCities}
                                onChange={deliveryCalculatorStore.selectFromCity}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.to')}</p>

                            <CitySelectSheet
                                sheetTitle={t('calculator.where')}
                                placeholder={t('calculator.selectCity')}
                                cities={deliveryCalculatorStore.cities}
                                popularCities={deliveryCalculatorStore.toPopularCities}
                                value={deliveryCalculatorStore.toCity}
                                onChange={deliveryCalculatorStore.selectToCity}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.size')}</p>

                            <PackageSelectSheet
                                packages={deliveryCalculatorStore.packageTypes}
                                value={deliveryCalculatorStore.packageType}
                                onChange={deliveryCalculatorStore.selectPackageType}
                            />
                        </div>
                    </div>

                    <Button size="form" className="w-full">
                        {t('calculator.calculate')}
                        <ArrowRight className="size-4" />
                    </Button>
                </Card>

                <Card className="overflow-hidden p-0">
                    <img
                        src={DesktopBanner}
                        alt="Delivery"
                        className="h-full w-full translate-y-20 scale-[1.4] object-cover"
                    />
                </Card>

                <ReferralBanner
                    title={t('referralBanner.freeDelivery')}
                    subtitle={t('referralBanner.inviteFriend')}
                    image={ReferralBannerHands}
                    className="h-43"
                    imageClassName="right-0 bottom-0 h-[115%]"
                />

                <Card className="space-y-6 p-6">
                    <h2 className="text-2xl font-bold">{t('trackParcel.title')}</h2>

                    <div className="flex flex-col gap-4 lg:flex-row">
                        <Input
                            className="placeholder:text-input-placeholder flex-1 px-4 py-3.5 text-2xl"
                            placeholder={t('trackParcel.placeholder')}
                        />

                        <Button size="form">{t('trackParcel.find')}</Button>
                    </div>
                </Card>
            </div>

            {/* Mobile */}
            <div className="space-y-4 lg:hidden">
                <Card className="p-6">
                    <h2 className="mb-6 text-2xl font-bold">{t('calculator.title')}</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.from')}</p>

                            <CitySelectSheet
                                sheetTitle={t('calculator.where')}
                                placeholder={t('calculator.selectCity')}
                                cities={deliveryCalculatorStore.cities}
                                popularCities={deliveryCalculatorStore.fromPopularCities}
                                value={deliveryCalculatorStore.fromCity}
                                onChange={deliveryCalculatorStore.selectFromCity}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.to')}</p>

                            <CitySelectSheet
                                sheetTitle={t('calculator.where')}
                                placeholder={t('calculator.selectCity')}
                                cities={deliveryCalculatorStore.cities}
                                popularCities={deliveryCalculatorStore.toPopularCities}
                                value={deliveryCalculatorStore.toCity}
                                onChange={deliveryCalculatorStore.selectToCity}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">{t('calculator.size')}</p>

                            <PackageSelectSheet
                                packages={deliveryCalculatorStore.packageTypes}
                                value={deliveryCalculatorStore.packageType}
                                onChange={deliveryCalculatorStore.selectPackageType}
                            />
                        </div>
                    </div>

                    <Button size="form" className="w-ful mt-6">
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

export default observer(HomePage)
