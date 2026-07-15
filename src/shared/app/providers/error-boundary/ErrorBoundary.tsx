import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    }

    static getDerivedStateFromError(): State {
        return {
            hasError: true,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Something went wrong</h1>

                        <p className="mt-2 text-sm text-muted-foreground">Please refresh the page and try again.</p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
