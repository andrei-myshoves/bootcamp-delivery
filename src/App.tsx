import { AppRouter } from '@/app/router'
import { ErrorBoundary } from '@/app/providers/error-boundary/ErrorBoundary'
import { StoreProvider } from '@/app/providers/StoreProvider'

function App() {
    return (
        <ErrorBoundary>
            <StoreProvider>
                <AppRouter />
            </StoreProvider>
        </ErrorBoundary>
    )
}

export default App
