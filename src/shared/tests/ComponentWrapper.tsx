import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'

import i18n from '@/app/i18n'
import { routeTree } from '@/routeTree.gen'

export function ComponentWrapper({ children }: PropsWithChildren) {
    const router = createRouter({
        routeTree,
        history: createMemoryHistory({
            initialEntries: ['/'],
        }),
    })

    return (
        <I18nextProvider i18n={i18n}>
            <RouterProvider router={router} />
            {children}
        </I18nextProvider>
    )
}
