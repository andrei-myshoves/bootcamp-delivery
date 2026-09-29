import { createFileRoute } from '@tanstack/react-router'
import SenderPage from '@/pages/SenderPage/SenderPage'

export const Route = createFileRoute('/sender')({
    component: SenderPage,
})
