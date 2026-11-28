import { fileURLToPath } from 'node:url'

/**
 * to load the built addon in this test Storybook
 * preview annotations are loaded from source in .storybook/preview.ts with definePreview
 */
export function previewAnnotations(entry = []) {
  return entry
}

export function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../dist/manager.js'))]
}
