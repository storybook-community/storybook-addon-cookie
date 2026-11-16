import preview from '../../.storybook/preview'
import Demo from './Demo'

const meta = preview.meta({
  title: 'Example/AlwaysPreserve',
  component: Demo,
  parameters: {
    cookiePreserve: true,
  },
})

export const One = meta.story({
  parameters: {
    cookie: {
      example: 'Value One',
    },
  },
})

export const Two = meta.story({
  parameters: {
    cookie: {
      example: 'Value Two',
    },
  },
})

export const Three = meta.story({
  parameters: {
    cookie: {
      example: 'Value Three',
    },
  },
})

export const Unset = meta.story()
