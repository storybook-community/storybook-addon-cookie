import Demo from './Demo'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Demo> = {
  title: 'Example/ComponentCookies',
  component: Demo,
  parameters: {
    cookie: {
      test: 'Provided from a cookie!',
    },
  },
}
export default meta

export const WithCookie = {}

export const WithEncodedCookie = {
  parameters: {
    cookieEncoding: true,
  },
}

export const PreserveCookie = {
  parameters: {
    cookiePreserve: true,
  },
}
