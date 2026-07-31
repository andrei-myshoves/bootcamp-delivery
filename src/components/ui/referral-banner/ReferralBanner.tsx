import { cn } from '@/shared/lib/utils'

interface ReferralBannerProps {
    title: string
    subtitle: string
    image: string
    imageClassName?: string
    className?: string
}

export function ReferralBanner({ title, subtitle, image, imageClassName, className }: ReferralBannerProps) {
    return (
        <div className={cn('relative overflow-hidden rounded-3xl bg-green-500 p-4', className)}>
            <div className="relative z-10 max-w-[65%]">
                <h2 className="text-3xl font-bold leading-none text-white">{title}</h2>

                <p className="mt-2 text-lg leading-tight text-white">{subtitle}</p>
            </div>

            <img
                src={image}
                alt=""
                aria-hidden
                className={cn('pointer-events-none absolute right-0 bottom-0', imageClassName)}
            />
        </div>
    )
}

export type { ReferralBannerProps }
