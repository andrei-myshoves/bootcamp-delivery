import { type ReactNode } from 'react'

import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col px-4 pt-4 pb-24">
            <Header className="mb-2" />
            <main className="lg:flex-1">{children}</main>
            <Footer className="pt-2" />
        </div>
    )
}
