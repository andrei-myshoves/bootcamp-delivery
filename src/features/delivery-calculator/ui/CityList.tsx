import type { DeliveryPoint } from '@/features/delivery-calculator/model/types'

import { CityItem } from './CityItem'

interface CityListProps {
    cities: DeliveryPoint[]
    selectedCityId?: string
    onSelect?: (city: DeliveryPoint) => void
}

export function CityList({ cities, selectedCityId, onSelect }: CityListProps) {
    return (
        <div className="space-y-1">
            {cities.map(city => (
                <CityItem
                    key={city.id}
                    city={city}
                    selected={city.id === selectedCityId}
                    onClick={() => onSelect?.(city)}
                />
            ))}
        </div>
    )
}
