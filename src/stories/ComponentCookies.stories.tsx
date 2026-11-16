import preview from '../../.storybook/preview'
import Demo from './Demo'

const meta = preview.meta({
  title: 'Example/ComponentCookies',
  component: Demo,
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
})

export const WithCookie = meta.story()

export const WithEncodedCookie = meta.story({
  parameters: {
    cookieEncoding: true,
  },
})

export const PreserveCookie = meta.story({
  parameters: {
    cookiePreserve: true,
  },
})
