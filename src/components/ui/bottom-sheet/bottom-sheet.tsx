import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/shared/lib/utils'

function BottomSheet({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="bottom-sheet" {...props} />
}

function BottomSheetTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="bottom-sheet-trigger" {...props} />
}

function BottomSheetPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="bottom-sheet-portal" {...props} />
}

function BottomSheetClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="bottom-sheet-close" {...props} />
}

function BottomSheetOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="bottom-sheet-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
                className
            )}
            {...props}
        />
    )
}

function BottomSheetContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
    return (
        <BottomSheetPortal>
            <BottomSheetOverlay />

            <DialogPrimitive.Content
                data-slot="bottom-sheet-content"
                className={cn(
                    'fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-background p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </BottomSheetPortal>
    )
}

function BottomSheetHeader({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="bottom-sheet-header"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function BottomSheetFooter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="bottom-sheet-footer"
            className={cn('mt-4 flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function BottomSheetTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="bottom-sheet-title"
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    )
}

function BottomSheetDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="bottom-sheet-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
}

export {
    BottomSheet,
    BottomSheetPortal,
    BottomSheetOverlay,
    BottomSheetTrigger,
    BottomSheetContent,
    BottomSheetClose,
    BottomSheetHeader,
    BottomSheetFooter,
    BottomSheetTitle,
    BottomSheetDescription,
}