import { createContext } from 'react'
import type { ReactNode } from 'react'

import { rootStore, RootStore } from '@/store/RootStore'

export const StoreContext = createContext<RootStore>(rootStore)

interface StoreProviderProps {
    children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
