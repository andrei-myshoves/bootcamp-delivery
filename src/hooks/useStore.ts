import { use } from 'react'

import { StoreContext } from '@/app/providers/StoreProvider'

export function useStore() {
    return use(StoreContext)
}
