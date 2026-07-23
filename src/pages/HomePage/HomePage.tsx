import { useEffect } from 'react'
import { apiClient } from '@/shared/api/ky/instance'
import { Header } from '@/components/layout/header/Header'

const HomePage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClient.get('delivery/points').json()

            console.log(data)
        }

        fetchData()
    }, [])

    return (
        <>
            <Header />
            <div>Home Page</div>
        </>
    )
}

export default HomePage
