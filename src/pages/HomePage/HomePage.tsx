import { useEffect } from 'react'
import { apiClientV1 } from '@/shared/api/ky/instance'
import { Card } from '@/components/ui/card/Card'
import DekstopBanner from '@/shared/assets/DekstopBanner.webp'

const HomePage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClientV1.get('delivery/points').json()

            console.log(data)
        }

        fetchData()
    }, [])

    return (
        <>
            <Card className="hidden overflow-hidden p-0 lg:block">
                <img src={DekstopBanner} className="h-full w-full object-cover  scale-130 translate-y-35" />
            </Card>
        </>
    )
}

export default HomePage
