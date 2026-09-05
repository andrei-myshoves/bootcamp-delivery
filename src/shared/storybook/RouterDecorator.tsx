import type { Decorator } from '@storybook/react-vite'
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'

export const RouterDecorator: Decorator = Story => {
    const rootRoute = createRootRoute({
        component: Story,
    })

    const router = createRouter({
        routeTree: rootRoute,
        history: createMemoryHistory({
            initialEntries: ['/'],
        }),
    })

    return <RouterProvider router={router} />
}
