import { isHTTPError, isNetworkError, isTimeoutError } from 'ky'

import type { OrderDraftField } from './createOrderDto'

/** Why an order was not created. The store keeps the kind; the page turns it into a message. */
export type OrderSubmitError =
    /** The draft lacks required values; no request was sent. */
    | { kind: 'missingData'; fields: OrderDraftField[] }
    /** The backend rejected the data (4xx or `success: false`); `reason` is its own explanation, when given. */
    | { kind: 'rejected'; reason?: string }
    /** 5xx or a response without the created order. */
    | { kind: 'server' }
    /** No response: offline, DNS, CORS or timeout. */
    | { kind: 'network' }

const HTTP_SERVER_ERROR_MIN_STATUS = 500

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

/** Reads the backend's explanation: `reason` of `DeliverResponse` or `message` of a validation error. */
export function getBackendReason(body: unknown): string | undefined {
    if (!isRecord(body)) {
        return undefined
    }

    const { reason, message } = body

    if (typeof reason === 'string' && reason.trim()) {
        return reason
    }

    if (typeof message === 'string' && message.trim()) {
        return message
    }

    if (Array.isArray(message)) {
        const messages = message.filter((item): item is string => typeof item === 'string')

        return messages.length > 0 ? messages.join('. ') : undefined
    }

    return undefined
}

/** Classifies an error thrown by the order request. */
export function toOrderSubmitError(error: unknown): OrderSubmitError {
    if (isHTTPError(error)) {
        if (error.response.status >= HTTP_SERVER_ERROR_MIN_STATUS) {
            return { kind: 'server' }
        }

        return { kind: 'rejected', reason: getBackendReason(error.data) }
    }

    if (isNetworkError(error) || isTimeoutError(error) || error instanceof TypeError) {
        return { kind: 'network' }
    }

    return { kind: 'server' }
}
