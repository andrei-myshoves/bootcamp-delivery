import LogoDelivery from '@/shared/assets/LogoDelivery.svg'
import { Link } from 'wouter'

export function Logo() {
    return (
        <Link href='/'>
            <img src={LogoDelivery} alt="Delivery" className="h-6 w-auto" />
        </Link>
    )
}
