import LogoDelivery from '@/shared/assets/LogoDelivery.svg'
import { Link } from '@tanstack/react-router'

export function Logo() {
    return (
        <Link to="/">
            <img src={LogoDelivery} alt="Delivery" className="h-6 w-auto" />
        </Link>
    )
}
