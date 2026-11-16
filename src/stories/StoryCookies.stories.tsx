import preview from '../../.storybook/preview'
import Demo from './Demo'

const meta = preview.meta({
  title: 'Example/StoryCookies',
  component: Demo,
})

export const WithCookie = meta.story({
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
})

export const WithEncodedCookie = meta.story({
  parameters: {
    cookie: {
      test: 'This is encoded!',
    },
    cookieEncoding: true,
  },
})

export const PreserveCookie = meta.story({
  parameters: {
    cookiePreserve: true,
  },
})

export const WithoutCookie = meta.story()
