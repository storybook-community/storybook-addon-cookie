import Demo from './Demo'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Demo> = {
  title: 'Example/StoryCookies',
  component: Demo,
}
export default meta

export const WithCookie = {
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
}

export const WithEncodedCookie = {
  parameters: {
    cookie: {
      test: 'This is encoded!',
    },
    cookieEncoding: true,
  },
}

export const PreserveCookie = {
  parameters: {
    cookiePreserve: true,
  },
}

export const WithoutCookie = {}
