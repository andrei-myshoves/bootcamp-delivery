import { CHECKOUT_TOTAL_STEPS } from './checkoutSteps'

interface StepProgressProps {
    /** Translated label, e.g. «Шаг 6 из 7». */
    label: string
    /** 1-based checkout step. */
    step: number
}

export function StepProgress({ label, step }: StepProgressProps) {
    const progressPercent = (step / CHECKOUT_TOTAL_STEPS) * 100

    return (
        <div>
            <p className="pb-1 text-sm font-medium">{label}</p>

            <div className="bg-muted h-1 overflow-hidden rounded-full">
                <div className="bg-progress-bar h-full rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
        </div>
    )
}
