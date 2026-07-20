import LogoIcon from '@/shared/assets/LogoIcon.svg'
import LogoText from '@/shared/assets/LogoText.svg'

export function Logo() {
    return (
        <div className="flex items-center gap-1">
            <img src={LogoIcon} alt="" className="h-6 w-6" aria-hidden />

            <img src={LogoText} alt="Delivery" className="h-3 w-auto" />
        </div>
    )
}
