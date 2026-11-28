import { ChevronRight, House } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CHECKOUT_BREADCRUMB_KEYS } from './checkoutSteps'

interface CheckoutBreadcrumbsProps {
    /** 1-based checkout step; crumbs up to and including this step are shown, the last one is current. */
    step: number
    className?: string
}

const Separator = () => <ChevronRight className="text-muted-foreground size-4" aria-hidden />

export function CheckoutBreadcrumbs({ step, className }: CheckoutBreadcrumbsProps) {
    const { t } = useTranslation()

    const crumbs = CHECKOUT_BREADCRUMB_KEYS.slice(0, step).map(key => t(key))
    const currentCrumb = crumbs.at(-1)
    const previousCrumbs = crumbs.slice(0, -1)

    return (
        <nav aria-label={t('checkout.breadcrumbAriaLabel')} className={className}>
            {/* Each separator stays with the crumb before it, so a wrap never leaves a «›» at the start of a line (Figma). */}
            <ol className="flex min-h-9 flex-wrap items-center gap-2 px-3 text-sm">
                <li className="flex items-center gap-2">
                    <House className="text-muted-foreground size-4" aria-hidden />
                    <Separator />
                </li>

                {previousCrumbs.map(crumb => (
                    <li key={crumb} className="text-muted-foreground flex items-center gap-2">
                        {crumb}
                        <Separator />
                    </li>
                ))}

                <li aria-current="page" className="text-foreground font-semibold">
                    {currentCrumb}
                </li>
            </ol>
        </nav>
    )
}
