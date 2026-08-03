import { useEffect } from 'react'

import { Card } from '@/components/ui/card/Card'
import { ReferralBanner } from '@/components/ui/referral-banner/ReferralBanner'

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
            <Card className="hidden overflow-hidden p-0 lg:block">
                <img
                    src={DesktopBanner}
                    alt="Delivery"
                    className="h-full w-full object-cover scale-130 translate-y-35"
                />
            </Card>

            <ReferralBanner
                title={t('referralBanner.freeDelivery')}
                subtitle={t('referralBanner.inviteFriend')}
                image={ReferralBannerHands}
                className="h-22.5 lg:h-43"
                imageClassName="right-0 bottom-0 h-full lg:h-[115%]"
            />
        </div>
    )
}

export default HomePage
