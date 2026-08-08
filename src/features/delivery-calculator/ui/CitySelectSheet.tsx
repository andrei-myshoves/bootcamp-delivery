import { useState } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from '@/components/ui/sheet/sheet'
import { X } from 'lucide-react'

import type { DeliveryPoint } from '@/features/delivery-calculator/model/types'

import { CityList } from './CityList'
import { CitySelectTrigger } from './CitySelectTrigger'

interface CitySelectSheetProps {
    sheetTitle: string
    placeholder: string

    cities: DeliveryPoint[]

    value?: DeliveryPoint

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
            <CitySelectTrigger value={value?.name} placeholder={placeholder} onClick={() => setOpen(true)} />

            <SheetContent side="left" showCloseButton={false}>
                <SheetHeader className="flex flex-row items-center gap-4 border-b px-6 py-5">
                    <SheetClose asChild>
                        <button className="rounded-md p-1 hover:bg-accent">
                            <X className="h-6 w-6" />
                        </button>
                    </SheetClose>

                    <SheetTitle className="text-2xl font-bold">{sheetTitle}</SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                    <CityList className="px-6" cities={cities} selectedCityId={value?.id} onSelect={handleSelect} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
