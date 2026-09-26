import { cn } from '@/shared/lib/utils'
interface ReferralBannerImage {
    src: string
    className?: string
}

interface ReferralBannerProps {
    title: string
    subtitle: string
    image?: string
    images?: ReferralBannerImage[]
    imageAlt?: string
    imageClassName?: string
    className?: string
}

export function ReferralBanner({
    title,
    subtitle,
    image,
    images,
    imageClassName,
    className,
    imageAlt = '',
}: ReferralBannerProps) {
    return (
        <div className={cn('bg-referal-banner relative overflow-hidden rounded-3xl p-4 lg:p-8', className)}>
            <div className="relative z-(--z-referral-banner-content) max-w-[80%] lg:max-w-[60%]">
                <h2 className="text-2xl leading-8 font-bold text-white lg:text-3xl lg:leading-tight">{title}</h2>

                <p className="mt-2 text-sm leading-6 text-white lg:text-xl lg:leading-tight">{subtitle}</p>
            </div>

            {images?.map(({ src, className: imageClass }) => (
                <img
                    key={src}
                    src={src}
                    alt=""
                    aria-hidden
                    className={cn('pointer-events-none absolute', imageClass)}
                />
            ))}

            {image && (
                <img
                    src={image}
                    alt={imageAlt}
                    aria-hidden={!imageAlt}
                    className={cn('pointer-events-none absolute right-0 bottom-0', imageClassName)}
                />
            )}
        </div>
    )
}

export type { ReferralBannerProps }
