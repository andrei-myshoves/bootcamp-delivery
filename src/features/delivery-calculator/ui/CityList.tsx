import type { DeliveryPoint } from '@/features/delivery-calculator/model/types'

import { CityItem } from './CityItem'
import { cn } from '@/shared/lib/utils'

interface CityListProps {
    cities: DeliveryPoint[]
    selectedCityId?: string
    onSelect?: (city: DeliveryPoint) => void
    className?: string
}

export function CityList({ cities, selectedCityId, className, onSelect }: CityListProps) {
    return (
        <div className={cn('space-y-1', className)}>
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
