import { expect } from 'storybook/test'

import preview from '../../.storybook/preview'
import Demo from './Demo'
import { readCookies, setPreexistingCookie } from './readCookies'

const meta = preview.meta({
  title: 'Example/ComponentCookies',
  component: Demo,
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
  beforeEach: setPreexistingCookie,
})

export const WithCookie = meta.story({
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
    cookieEncoding: true,
  },
  play: async () => {
    await expect(readCookies()).toEqual({
      global: 'This%20is%20a%20global%20cookie!',
      test: 'Provided%20from%20a%20cookie!',
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
      test: 'Provided from a cookie!',
    })
  },
})
