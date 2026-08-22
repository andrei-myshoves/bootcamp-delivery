import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from '@/components/ui/sheet/sheet'
import { Button } from '@/components/ui/button/Button'
import { X, ChevronRight } from 'lucide-react'
import type { DeliveryPoint } from '@/store/DeliveryCalculatorStore'
import { CitySelectTrigger } from './CitySelectTrigger'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

interface CitySelectSheetProps {
    sheetTitle: string
    placeholder: string
    cities: DeliveryPoint[]
    popularCities: DeliveryPoint[]
    value: DeliveryPoint
    onChange?: (city: DeliveryPoint) => void
}

export function CitySelectSheet({
    sheetTitle,
    placeholder,
    cities,
    popularCities,
    value,
    onChange,
}: CitySelectSheetProps) {
    const [open, setOpen] = useState(false)
    const handleSelect = (city: DeliveryPoint) => {
        onChange?.(city)
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <CitySelectTrigger
                value={value.name}
                placeholder={placeholder}
                selected={!!value}
                onClick={() => setOpen(true)}
            />

            {popularCities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                    {popularCities.map(city => (
                        <Button
                            key={city.id}
                            variant="wrapper"
                            type="button"
                            onClick={() => handleSelect(city)}
                            className="text-muted-foreground bg-transparent px-0 text-base underline"
                        >
                            {city.name}
                        </Button>
                    ))}
                </div>
            )}

            <SheetContent side="left" showCloseButton={false}>
                <SheetHeader className="flex flex-row items-center gap-4 border-b px-6 py-5">
                    <SheetClose asChild>
                        <Button
                            variant="wrapper"
                            aria-label="Close"
                            className="hover:bg-accent rounded-md bg-transparent p-1"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </SheetClose>

                    <SheetTitle className="text-2xl font-bold">{sheetTitle}</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-1 px-6">
                    {cities.map(city => (
                        <Button
                            key={city.id}
                            variant="wrapper"
                            type="button"
                            onClick={() => handleSelect(city)}
                            className={cn(
                                'flex w-full items-center justify-between bg-transparent px-4 py-4 transition',
                                city.id === value?.id ? 'bg-accent' : 'hover:bg-accent/50'
                            )}
                        >
                            <span className="text-base">{city.name}</span>

                            <ChevronRight className="text-muted-foreground size-5" />
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
