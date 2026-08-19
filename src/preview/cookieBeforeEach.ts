import type { Renderer, StoryContext } from 'storybook/internal/types'

import type { CookieParameter } from '../types'
import { clearCookies, setCookies } from '../cookies'
import { PARAM_KEY, PARAM_PRESERVE_KEY } from '../constants'

export interface CookieContext extends StoryContext<Renderer> {
  parameters: StoryContext['parameters'] & CookieParameter
}

export const cookieBeforeEach = ({ parameters }: CookieContext) => {
  if (!parameters) {
    return
  }

  if (parameters[PARAM_PRESERVE_KEY] !== true) {
    clearCookies()
  }

  if (parameters[PARAM_KEY]) {
    setCookies(parameters.cookie, parameters.cookieEncoding)
  }
}
