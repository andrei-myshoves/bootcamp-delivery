import { afterEach, expect } from 'vitest'
import { page } from 'vitest/browser'

declare const __PROJECT_ROOT__: string

const viewports = {
    desktop: { width: 1366, height: 768 },
    mobile: { width: 375, height: 667 },
}

afterEach(async ctx => {
    const storyRoot = document.querySelector('#storybook-root') ?? document.body
    const locator = page.elementLocator(storyRoot)

    const storyName = ctx.task.name
    const errors: unknown[] = []

    for (const [viewport, { width, height }] of Object.entries(viewports)) {
        await page.viewport(width, height)

        const name = `${storyName}-${viewport}`

        await locator.screenshot({ path: `${__PROJECT_ROOT__}/.storybook/screenshots/.actual/${name}.png`, save: true })

        try {
            await expect.element(locator).toMatchScreenshot(name)
        } catch (error) {
            errors.push(error)
        }
    }

    if (errors.length > 0) {
        throw new AggregateError(errors, `${errors.length} screenshot(s) did not match`)
    }
})
