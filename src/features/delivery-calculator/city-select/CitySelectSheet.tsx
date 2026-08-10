import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from '@/components/ui/sheet/sheet'
import { Button } from '@/components/ui/button/Button'
import { X, ChevronRight } from 'lucide-react'
import type { DeliveryPoint } from '@/features/delivery-calculator/model/DeliveryCalculatorStore'
import { CitySelectTrigger } from './CitySelectTrigger'

interface CitySelectSheetProps {
    sheetTitle: string
    placeholder: string
    cities: DeliveryPoint[]
    open: boolean
    onOpenChange: (open: boolean) => void
    value?: DeliveryPoint
    onChange?: (city: DeliveryPoint) => void
}

export function CitySelectSheet({
    sheetTitle,
    placeholder,
    cities,
    value,
    open,
    onOpenChange,
    onChange,
}: CitySelectSheetProps) {
    const handleSelect = (city: DeliveryPoint) => {
        onChange?.(city)
        onOpenChange(false)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <CitySelectTrigger
                value={value?.name}
                placeholder={placeholder}
                selected={!!value}
                onClick={() => onOpenChange(true)}
            />

            <SheetContent side="left" showCloseButton={false}>
                <SheetHeader className="flex flex-row items-center gap-4 border-b px-6 py-5">
                    <SheetClose asChild>
                        <Button variant="wrapper" className="rounded-md p-1 hover:bg-accent">
                            <X className="h-6 w-6" />
                        </Button>
                    </SheetClose>

                    <SheetTitle className="text-2xl font-bold">{sheetTitle}</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-1 px-6">
                    {cities.map(city => {
                        const selected = city.id === value?.id

                        return (
                            <Button
                                key={city.id}
                                variant="wrapper"
                                type="button"
                                onClick={() => handleSelect(city)}
                                className={`flex w-full items-center justify-between px-4 py-3 transition ${
                                    selected ? 'bg-accent' : 'hover:bg-accent/50'
                                }`}
                            >
                                <span>{city.name}</span>

                                <ChevronRight className="size-5 text-muted-foreground" />
                            </Button>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}
