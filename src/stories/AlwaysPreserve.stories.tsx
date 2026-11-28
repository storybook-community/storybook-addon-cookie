import { expect } from 'storybook/test'

import preview from '../../.storybook/preview'
import Demo from './Demo'
import { readCookies, setPreexistingCookie } from './readCookies'

const meta = preview.meta({
  title: 'Example/AlwaysPreserve',
  component: Demo,
  parameters: {
    cookiePreserve: true,
  },
  beforeEach: setPreexistingCookie,
})

export const One = meta.story({
  parameters: {
    cookie: {
      example: 'Value One',
    },
  },
  play: async () => {
    await expect(readCookies()).toMatchObject({
      preexisting: 'from the page',
      example: 'Value One',
    })
  },
})

export const Two = meta.story({
  parameters: {
    cookie: {
      example: 'Value Two',
    },
  },
  play: async () => {
    // The story's value overwrites the cookie of the same name.
    await expect(readCookies()).toMatchObject({
      preexisting: 'from the page',
      example: 'Value Two',
    })
  },
})

export const Three = meta.story({
  parameters: {
    cookie: {
      example: 'Value Three',
    },
  },
  play: async () => {
    await expect(readCookies()).toMatchObject({
      preexisting: 'from the page',
      example: 'Value Three',
    })
  },
})

export const Unset = meta.story({
  play: async () => {
    await expect(readCookies()).toMatchObject({
      preexisting: 'from the page',
      global: 'This is a global cookie!',
    })
  },
})
