import { useContext } from 'react'

import { StoreContext } from '@/app/providers/StoreProvider'

export function useStore() {
    return useContext(StoreContext)
}
