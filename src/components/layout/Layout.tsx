import { type ReactNode } from 'react'

import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="px-4 pt-4">
                <Header />
            </div>

            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
