import { definePreviewAddon } from 'storybook/internal/csf'

import addonAnnotations from './preview'
import type { CookieTypes } from './types'

export type {
  Cookie,
  CookieParameters,
  CookieTypes,
  CookieValue,
} from './types'

export default () => definePreviewAddon<CookieTypes>(addonAnnotations)
