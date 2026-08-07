import type { DeliveryPoint } from '@/features/delivery-calculator/model/types'

interface CityItemProps {
    city: DeliveryPoint
    selected?: boolean
    onClick?: () => void
}

export function CityItem({ city, selected, onClick }: CityItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between px-4 py-3 transition ${
                selected ? 'bg-accent' : 'hover:bg-accent/50'
            }`}
        >
            <span>{city.name}</span>

            {selected && <div className="size-2 rounded-full bg-primary" />}
        </button>
    )
}
