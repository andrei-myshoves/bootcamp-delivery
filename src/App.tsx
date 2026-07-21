import { AppRouter } from '@/app/router'
import { ErrorBoundary } from '@/app/providers/error-boundary/ErrorBoundary'

function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    )
}

export default App
