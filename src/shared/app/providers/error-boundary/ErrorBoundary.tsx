import { Component, type ErrorInfo, type ReactNode } from 'react'
import i18n from '@/shared/app/i18n'

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
                        <h1 className="text-2xl font-semibold">{i18n.t('errorBoundary.title')}</h1>

                        <p className="mt-2 text-sm text-muted-foreground"> {i18n.t('errorBoundary.description')}</p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
