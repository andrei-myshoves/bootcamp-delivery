import { test, expect } from 'vitest'
import { page } from '@vitest/browser/context'

test('default screenshot', async () => {
    const button = page.getByRole('button')

    await expect.element(button).toMatchScreenshot()
})
