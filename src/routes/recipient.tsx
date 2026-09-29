import { createFileRoute } from '@tanstack/react-router'
import RecipientPage from '@/pages/RecipientPage/RecipientPage'

export const Route = createFileRoute('/recipient')({
    component: RecipientPage,
})
