import { type MouseEvent, type PointerEvent, useEffect, useRef, useState } from 'react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { CircleHelp, X } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

const HOVER_CLOSE_DELAY_MS = 150

// Figma: the arrow tip sits 25px from the tooltip's right edge, 3px above the trigger.
const ARROW_ALIGN_OFFSET = -15
const ARROW_SIDE_OFFSET = 3

interface InfoTooltipProps {
    title: string
    description: string
    triggerLabel: string
    closeLabel: string
    className?: string
}

const isMousePointer = (event: PointerEvent) => event.pointerType === 'mouse'

/**
 * Toggletip: opens on hover for mouse users, on tap for touch users and on Enter/Space for keyboard users.
 * Built on Popover because a plain tooltip cannot be opened by touch.
 */
export function InfoTooltip({ title, description, triggerLabel, closeLabel, className }: InfoTooltipProps) {
    const [isOpen, setIsOpen] = useState(false)
    const closeTimerRef = useRef<number | undefined>(undefined)
    const lastPointerTypeRef = useRef<string>('')

    const cancelScheduledClose = () => {
        window.clearTimeout(closeTimerRef.current)
    }

    const scheduleClose = () => {
        cancelScheduledClose()
        closeTimerRef.current = window.setTimeout(() => setIsOpen(false), HOVER_CLOSE_DELAY_MS)
    }

    useEffect(() => cancelScheduledClose, [])

    const handlePointerEnter = (event: PointerEvent) => {
        if (!isMousePointer(event)) {
            return
        }

        cancelScheduledClose()
        setIsOpen(true)
    }

    const handlePointerLeave = (event: PointerEvent) => {
        if (isMousePointer(event)) {
            scheduleClose()
        }
    }

    const handleTriggerPointerDown = (event: PointerEvent) => {
        lastPointerTypeRef.current = event.pointerType
    }

    const handleTriggerClick = (event: MouseEvent) => {
        // Replace Radix's built-in toggle: a mouse click on an already hovered trigger must keep it open.
        event.preventDefault()

        const isMouseClick = lastPointerTypeRef.current === 'mouse'
        lastPointerTypeRef.current = ''

        if (isMouseClick) {
            cancelScheduledClose()
            setIsOpen(true)
            return
        }

        setIsOpen(previous => !previous)
    }

    const preventFocusMove = (event: Event) => {
        event.preventDefault()
    }

    return (
        <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <PopoverPrimitive.Trigger asChild>
                <button
                    type="button"
                    aria-label={triggerLabel}
                    className={cn(
                        'text-muted-foreground hover:text-foreground relative inline-flex size-5 shrink-0 items-center justify-center rounded-full transition-colors',
                        'focus-visible:ring-ring after:absolute after:-inset-2 focus-visible:ring-2 focus-visible:outline-none',
                        className
                    )}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    onPointerDown={handleTriggerPointerDown}
                    onClick={handleTriggerClick}
                >
                    <CircleHelp className="size-5" aria-hidden />
                </button>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    side="top"
                    align="end"
                    alignOffset={ARROW_ALIGN_OFFSET}
                    sideOffset={ARROW_SIDE_OFFSET}
                    collisionPadding={16}
                    className="bg-background motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 z-50 w-60 rounded-md px-2 py-1.5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.08)] focus-visible:outline-none"
                    onOpenAutoFocus={preventFocusMove}
                    onCloseAutoFocus={preventFocusMove}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    <div className="flex items-start gap-1">
                        <p className="text-foreground flex-1 text-xs leading-4 font-semibold">{title}</p>

                        <PopoverPrimitive.Close
                            aria-label={closeLabel}
                            className="text-foreground focus-visible:ring-ring relative shrink-0 rounded-sm after:absolute after:-inset-2 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <X className="size-4" aria-hidden />
                        </PopoverPrimitive.Close>
                    </div>

                    <p className="text-muted-foreground mt-1 text-xs leading-4">{description}</p>

                    <PopoverPrimitive.Arrow asChild width={12} height={6}>
                        <svg viewBox="1 0 12 6" className="fill-background" aria-hidden>
                            <path d="M7.707 5.293a1 1 0 0 1-1.414 0L1 0h12L7.707 5.293Z" />
                        </svg>
                    </PopoverPrimitive.Arrow>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    )
}
