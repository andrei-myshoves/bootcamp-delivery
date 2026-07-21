import { rm } from 'node:fs/promises'

export default async function () {
    await rm('.vitest-attachments', { recursive: true, force: true })
    await rm('.storybook/screenshots/.actual', { recursive: true, force: true })
}
