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
        <div className={cn('relative overflow-hidden rounded-3xl bg-green-500 p-4 lg:p-8', className)}>
            <div className="relative z-10 max-w-[80%] lg:max-w-[60%]">
                <h2 className="text-2xl font-bold leading-8 text-white lg:text-3xl lg:leading-tight">{title}</h2>

                <p className="mt-2 text-lg leading-6 text-white lg:text-1xl lg:leading-tight">{subtitle}</p>
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
