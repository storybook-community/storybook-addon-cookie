import { definePreview } from '@storybook/react-vite'
import addonDocs from '@storybook/addon-docs'

// to load the addon from source in this test Storybook
import addonCookie from '../src/index'

export default definePreview({
  addons: [addonDocs(), addonCookie()],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    cookie: {
      global: 'This is a global cookie!',
    },
  },
  initialGlobals: {
    background: { value: 'light' },
  },
})
