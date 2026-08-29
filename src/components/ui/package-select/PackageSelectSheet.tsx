import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Sheet, SheetContent } from '@/components/ui/sheet/sheet'
import { Button } from '@/components/ui/button/Button'
import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'
import { Input } from '@/components/ui/input/Input'
import type { PackageType } from '@/store/DeliveryCalculatorStore'

import Envelope from '@/shared/assets/Envelope.svg'
import BoxXS from '@/shared/assets/Box XS.svg'
import BoxS from '@/shared/assets/Box S.svg'
import BoxM from '@/shared/assets/Box M.svg'
import BoxL from '@/shared/assets/Box L.svg'
import BoxXL from '@/shared/assets/Box XL.svg'

interface PackageSelectSheetProps {
    packages: PackageType[]
    value: PackageType | null
    onChange: (packageType: PackageType) => void
}

const packageImages: Partial<Record<string, string>> = {
    envelope: Envelope,
    'box-xs': BoxXS,
    'box-s': BoxS,
    'box-m': BoxM,
    'box-l': BoxL,
    'box-xl': BoxXL,
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
                className="border-input bg-background flex h-13 w-full items-center justify-between rounded-full border px-3 py-3.5"
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

                    {sizeMode === 'approximate' ? (
                        <div className="space-y-2">
                            {packages
                                .filter(packageType => packageType.id !== 'bag' && packageType.id !== 'pallet')
                                .map(packageType => (
                                    <Button
                                        key={packageType.id}
                                        type="button"
                                        variant="wrapper"
                                        onClick={() => handleSelect(packageType)}
                                        className="bg-background flex h-22.5 w-full items-center justify-between rounded-xl border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            {packageImages[packageType.id] && (
                                                <img
                                                    src={packageImages[packageType.id]}
                                                    alt=""
                                                    className="size-12 shrink-0"
                                                />
                                            )}

                                            <div className="flex flex-col items-start">
                                                <span className="mb-1 text-2xl font-bold">{packageType.name}</span>

                                                <span className="text-muted-foreground text-sm">
                                                    {packageType.length}x{packageType.width}x{packageType.height} см
                                                </span>
                                            </div>
                                        </div>

                                        <span
                                            className={`size-3 shrink-0 rounded-full border ${
                                                packageType.id === value?.id ? 'bg-black' : ''
                                            }`}
                                        />
                                    </Button>
                                ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Input inputSize="large" label="Длина" placeholder="см" />
                            <Input inputSize="large" label="Ширина" placeholder="см" />
                            <Input inputSize="large" label="Высота" placeholder="см" />
                            <Input inputSize="large" label="Вес" placeholder="кг" />
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
