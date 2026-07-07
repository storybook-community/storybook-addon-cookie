import js from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  {
    ignores: [
      '.github/dependabot.yml',
      '!.*',
      'dist/',
      'scripts/',
      '*.tgz',
      'coverage/',
      'node_modules/',
      'storybook-static/',
      'build-storybook.log',
      '.DS_Store',
      '.env',
      '.idea',
      '.vscode',
    ],
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    settings: {
      react: {
        // eslint-plugin-react@7.37.5 does not support eslint 10: its
        // 'detect' code path calls the removed context.getFilename() API
        // (see resolveBasedir in lib/util/version.js). Pinning an explicit
        // version avoids that path. Revisit once the plugin supports eslint 10.
        version: '19',
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['preset.js', '.storybook/local-preset.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  prettierRecommended,
]
