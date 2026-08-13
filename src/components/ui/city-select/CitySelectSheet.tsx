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
    value: DeliveryPoint
    onChange?: (city: DeliveryPoint) => void
}

export function CitySelectSheet({ sheetTitle, placeholder, cities, value, onChange }: CitySelectSheetProps) {
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

            <SheetContent side="left" showCloseButton={false}>
                <SheetHeader className="flex flex-row items-center gap-4 border-b px-6 py-5">
                    <SheetClose asChild>
                        <Button variant="wrapper" className="rounded-md p-1 bg-transparent hover:bg-accent">
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

                            <ChevronRight className="size-5 text-muted-foreground" />
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
