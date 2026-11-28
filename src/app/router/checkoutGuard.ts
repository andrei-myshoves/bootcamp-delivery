import { redirect } from '@tanstack/react-router'

import { isAddressComplete, isPersonComplete } from '@/shared/lib/checkout-validation'
import { type DeliveryCalculatorStore, isPayer } from '@/store/DeliveryCalculatorStore'
import { rootStore } from '@/store/RootStore'

export type CheckoutState = Pick<
    DeliveryCalculatorStore,
    | 'deliveryOptions'
    | 'selectedDeliveryOption'
    | 'recipient'
    | 'sender'
    | 'pickupAddress'
    | 'deliveryAddress'
    | 'payer'
>

/** Order Creation flow in step order, from the calculator to the review page. */
export const CHECKOUT_PATHS = [
    '/',
    '/deliverymethod',
    '/recipient',
    '/sender',
    '/pickup-address',
    '/delivery-address',
    '/delivery-payment',
    '/order-review',
] as const

export type CheckoutPath = (typeof CHECKOUT_PATHS)[number]

/** Whether the data a step collects is filled, i.e. the user may move past it. Mirrors each page's validation. */
const IS_STEP_COMPLETE: Record<CheckoutPath, (state: CheckoutState) => boolean> = {
    '/': state => state.deliveryOptions.length > 0,
    '/deliverymethod': state => state.selectedDeliveryOption !== null,
    '/recipient': state => isPersonComplete(state.recipient),
    '/sender': state => isPersonComplete(state.sender),
    '/pickup-address': state => isAddressComplete(state.pickupAddress),
    '/delivery-address': state => isAddressComplete(state.deliveryAddress),
    '/delivery-payment': state => isPayer(state.payer),
    '/order-review': () => true,
}

/**
 * Returns the first incomplete step before `targetPath`, or null when the target may be opened.
 * The returned step's own predecessors are complete by definition, so following it never loops.
 */
export function getCheckoutRedirect(state: CheckoutState, targetPath: CheckoutPath): CheckoutPath | null {
    const previousPaths = CHECKOUT_PATHS.slice(0, CHECKOUT_PATHS.indexOf(targetPath))

    return previousPaths.find(path => !IS_STEP_COMPLETE[path](state)) ?? null
}

/**
 * `beforeLoad` for a checkout route: redirects to the first incomplete step when a step is opened too early
 * (direct link, reload with partial data). Earlier steps are never blocked, so going back always works.
 * The store restores itself from localStorage on creation, so the check also holds after a reload.
 */
export const guardCheckoutStep = (targetPath: CheckoutPath) => () => {
    const redirectPath = getCheckoutRedirect(rootStore.deliveryCalculatorStore, targetPath)

    if (redirectPath) {
        throw redirect({ to: redirectPath, replace: true })
    }
}

/**
 * `beforeLoad` of «Заявка отправлена»: without a created order (direct link, cleared storage, new browser)
 * it opens the calculator, where a new order starts. The created order is restored from localStorage, so a
 * reload of the success screen keeps it.
 */
export const guardOrderCreatedSuccess = () => {
    if (!rootStore.deliveryCalculatorStore.lastOrder) {
        throw redirect({ to: '/', replace: true })
    }
}
