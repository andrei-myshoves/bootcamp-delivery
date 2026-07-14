import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/shared/app/i18n.ts'
import App from './App.tsx'
import { ErrorBoundary } from '@/shared/app/providers/error-boundary'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
)
