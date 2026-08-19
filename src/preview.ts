import type { ProjectAnnotations, Renderer } from 'storybook/internal/types'

import { cookieBeforeEach } from './preview/cookieBeforeEach'

const preview: ProjectAnnotations<Renderer> = {
  beforeEach: cookieBeforeEach,
}

export default preview
