import { expect } from 'storybook/test'

import preview from '../../.storybook/preview'
import Demo from './Demo'
import { readCookies, setPreexistingCookie } from './readCookies'

const meta = preview.meta({
  title: 'Example/StoryCookies',
  component: Demo,
  beforeEach: setPreexistingCookie,
})

export const WithCookie = meta.story({
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
  play: async ({ canvas }) => {
    await expect(readCookies()).toEqual({
      global: 'This is a global cookie!',
      test: 'Provided from a cookie!',
    })
    await expect(
      canvas.getByText(/test=Provided from a cookie!/),
    ).toBeInTheDocument()
  },
})

export const WithEncodedCookie = meta.story({
  parameters: {
    cookie: {
      test: 'This is encoded!',
    },
    cookieEncoding: true,
  },
  play: async ({ canvas }) => {
    await expect(readCookies()).toEqual({
      global: 'This%20is%20a%20global%20cookie!',
      test: 'This%20is%20encoded!',
    })
    await expect(
      canvas.getByText(/test=This%20is%20encoded!/),
    ).toBeInTheDocument()
  },
})

export const WithJsonCookie = meta.story({
  parameters: {
    cookie: {
      test: { theme: 'dark', count: 2 },
    },
  },
  play: async () => {
    await expect(JSON.parse(readCookies().test ?? '')).toEqual({
      theme: 'dark',
      count: 2,
    })
  },
})

export const PreserveCookie = meta.story({
  parameters: {
    cookiePreserve: true,
  },
  play: async () => {
    await expect(readCookies()).toMatchObject({
      preexisting: 'from the page',
      global: 'This is a global cookie!',
    })
  },
})

export const WithoutCookie = meta.story({
  play: async () => {
    await expect(readCookies()).toEqual({
      global: 'This is a global cookie!',
    })
  },
})
