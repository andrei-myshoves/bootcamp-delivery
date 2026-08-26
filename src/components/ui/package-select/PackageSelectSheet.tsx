import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Sheet, SheetContent } from '@/components/ui/sheet/sheet'
import { Button } from '@/components/ui/button/Button'
import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'
import type { PackageType } from '@/store/DeliveryCalculatorStore'

interface PackageSelectSheetProps {
    packages: PackageType[]
    value: PackageType | null
    onChange: (packageType: PackageType) => void
}

export function PackageSelectSheet({ packages, value, onChange }: PackageSelectSheetProps) {
    const [open, setOpen] = useState(false)
    const [sizeMode, setSizeMode] = useState('approximate')

    const handleSelect = (packageType: PackageType) => {
        onChange(packageType)
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                variant="wrapper"
                onClick={() => setOpen(true)}
                className="border-input bg-background flex h-13.5 w-full items-center justify-between rounded-full border px-3 py-3.5"
            >
                <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
                    {value?.name ?? 'Выберите размер'}
                </span>

                <ChevronDown className="text-muted-foreground size-5" />
            </Button>

            <SheetContent side="bottom" showCloseButton={false}>
                <div className="p-4">
                    <ButtonsGroup
                        value={sizeMode}
                        onValueChange={setSizeMode}
                        options={[
                            {
                                value: 'approximate',
                                label: 'Примерные',
                            },
                            {
                                value: 'exact',
                                label: 'Точные',
                            },
                        ]}
                        className="mb-4"
                    />

                    <div className="space-y-2">
                        {packages.map(packageType => (
                            <Button
                                key={packageType.id}
                                type="button"
                                variant="wrapper"
                                onClick={() => handleSelect(packageType)}
                                className="flex w-full items-center justify-between rounded-xl border px-4 py-3"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-base font-bold">{packageType.name}</span>

                                    <span className="text-muted-foreground text-sm">
                                        {packageType.length}x{packageType.width}x{packageType.height} см
                                    </span>
                                </div>

                                <span
                                    className={`h-3 w-3 rounded-full border ${
                                        packageType.id === value?.id ? 'bg-black' : ''
                                    }`}
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
