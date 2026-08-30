import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Sheet, SheetContent } from '@/components/ui/sheet/sheet'
import { Button } from '@/components/ui/button/Button'
import { ButtonsGroup } from '@/components/ui/buttons-group/ButtonsGroup'
import { Input } from '@/components/ui/input/Input'
export interface PackageSelectItem {
    id: string
    name: string
    length: string
    width: string
    height: string
    weight: string
}

interface PackageSelectSheetProps {
    packages: PackageSelectItem[]
    value: PackageSelectItem | null
    onChange: (packageItem: PackageSelectItem) => void
    images?: Record<string, string>
}

export function PackageSelectSheet({ packages, value, onChange, images }: PackageSelectSheetProps) {
    const [open, setOpen] = useState(false)
    const [sizeMode, setSizeMode] = useState('approximate')

    const handleSelect = (packageItem: PackageSelectItem) => {
        onChange(packageItem)
        setOpen(false)
    }

    const visiblePackages = packages.filter(packageType => packageType.id !== 'bag' && packageType.id !== 'pallet')

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
                            {visiblePackages.map(packageType => (
                                <Button
                                    key={packageType.id}
                                    type="button"
                                    variant="wrapper"
                                    onClick={() => handleSelect(packageType)}
                                    className="bg-background flex h-22.5 w-full items-center justify-between rounded-xl border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        {images?.[packageType.id] && (
                                            <img src={images[packageType.id]} alt="" className="size-12 shrink-0" />
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
