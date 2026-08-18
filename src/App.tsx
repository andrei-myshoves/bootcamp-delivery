import { Router, RouterProvider } from '@tanstack/react-router'
import { ErrorBoundary } from '@/app/providers/error-boundary/ErrorBoundary'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { routeTree } from '@/routeTree.gen'

const router = new Router({
    routeTree,
})

function App() {
    return (
        <ErrorBoundary>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </ErrorBoundary>
    )
}

export default App
