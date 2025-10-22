import { defineConfig, type Options } from 'tsup'

const NODE_TARGET = 'node20.19' // Minimum Node version supported by Storybook 10

export default defineConfig(async () => {
  const packageJson = (
    await import('./package.json', { with: { type: 'json' } })
  ).default

  const {
    bundler: { managerEntries = [], previewEntries = [] },
  } = packageJson

  const commonConfig: Options = {
    clean: false,
    format: ['esm'],
    treeshake: true,
    splitting: true,
    /*
     The following packages are provided by Storybook and should always be externalized
     Meaning they shouldn't be bundled with the addon, and they shouldn't be regular dependencies either
    */
    external: ['react', 'react-dom', '@storybook/icons'],
  }

  const configs: Options[] = []

  /*
   manager entries are entries meant to be loaded into the manager UI
   they'll have manager-specific packages externalized and they won't be usable in node
   they won't have types generated for them as they're usually loaded automatically by Storybook
  */
  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      platform: 'browser',
      target: 'esnext', // we can use esnext for manager entries since Storybook will bundle the addon's manager entries again anyway
    })
  }

  /*
   preview entries are entries meant to be loaded into the preview iframe
   they'll have preview-specific packages externalized and they won't be usable in node
   they'll have types generated for them so they can be imported by users when setting up Portable Stories or using CSF factories
  */
  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      platform: 'browser',
      target: 'esnext', // we can use esnext for preview entries since the builders will bundle the addon's preview entries again anyway
      dts: true,
    })
  }

  return configs
})
