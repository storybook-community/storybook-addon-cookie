import Demo from './Demo'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Demo> = {
  title: 'Example/AlwaysPreserve',
  component: Demo,
  parameters: {
    cookiePreserve: true,
  },
}
export default meta

export const One = {
  parameters: {
    cookie: {
      example: 'Value One',
    },
  },
}

export const Two = {
  parameters: {
    cookie: {
      example: 'Value Two',
    },
  },
}

export const Three = {
  parameters: {
    cookie: {
      example: 'Value Three',
    },
  },
}

export const Unset = {}
