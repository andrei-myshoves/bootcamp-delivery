import { useEffect } from 'react'
import { apiClientV1 } from '@/shared/api/ky/instance'

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
            <div>Home Page</div>
        </>
    )
}

export default HomePage
