import type { Decorator } from '@storybook/react-vite'
import { Router } from 'wouter'
import { memoryLocation } from 'wouter/memory-location'

const { hook } = memoryLocation({ path: '/' })

export const RouterDecorator: Decorator = Story => (
    <Router hook={hook}>
        <Story />
    </Router>
)
