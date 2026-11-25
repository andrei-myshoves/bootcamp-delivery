import { Fragment } from 'react'
import { ChevronRight, House } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CHECKOUT_BREADCRUMB_KEYS } from './checkoutSteps'

interface CheckoutBreadcrumbsProps {
    /** 1-based checkout step; crumbs up to and including this step are shown, the last one is current. */
    step: number
    className?: string
}

export function CheckoutBreadcrumbs({ step, className }: CheckoutBreadcrumbsProps) {
    const { t } = useTranslation()

    const crumbs = CHECKOUT_BREADCRUMB_KEYS.slice(0, step).map(key => t(key))
    const currentCrumb = crumbs.at(-1)
    const previousCrumbs = crumbs.slice(0, -1)

    return (
        <nav aria-label={t('checkout.breadcrumbAriaLabel')} className={className}>
            <ol className="flex min-h-9 flex-wrap items-center gap-2 px-3 text-sm">
                <li>
                    <House className="text-muted-foreground size-4" aria-hidden />
                </li>

                {previousCrumbs.map(crumb => (
                    <Fragment key={crumb}>
                        <li aria-hidden>
                            <ChevronRight className="text-muted-foreground size-4" />
                        </li>
                        <li className="text-muted-foreground">{crumb}</li>
                    </Fragment>
                ))}

                <li aria-hidden>
                    <ChevronRight className="text-muted-foreground size-4" />
                </li>
                <li aria-current="page" className="text-foreground font-semibold">
                    {currentCrumb}
                </li>
            </ol>
        </nav>
    )
}
