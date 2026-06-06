import { useEffect } from 'react'
import { apiClient } from '@/shared/api/base'

const HomePage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClient.get('delivery/points').json()

            console.log(data)
        }

        fetchData()
    }, [])

    return <div>Home Page</div>
}

export default HomePage
