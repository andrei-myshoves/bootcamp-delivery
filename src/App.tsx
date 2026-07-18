import { AppRouter } from '@/app/router'
import { ErrorBoundary } from '@/src/providers/error-boundary/ErrorBoundary'

function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    )
}

export default App
