import { AppRouter } from '@/shared/app/router'
import { ErrorBoundary } from '@/shared/app/providers/error-boundary'

function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    )
}

export default App
