import { definePreview } from '@storybook/react-vite'
import addonDocs from '@storybook/addon-docs'

// to load the built addon in this test Storybook
import addonCookie from '../dist/index.js'

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
