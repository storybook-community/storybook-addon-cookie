<div align="center">

  <h1>Storybook Addon Cookie</h1>

  <picture style="display: flex; flex-direction: column; align-items: center;">
    <img style="border-radius: 1rem;"
      src="./static/demo.gif"
      alt="Example of the addon in use, showing cookies being set for a story."
      loading="lazy"
      decoding="async"
      height="350"
    />
  </picture>

  <br />
  <p>
    This addon sets <code>document.cookie</code> for individual stories, helping you test your components' use of cookies in isolation.
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-stable-4cc71e" alt="Status: Stable" />
    <a href="https://github.com/storybook-community/storybook-addon-cookie/commits"><img src="https://img.shields.io/github/commit-activity/m/storybook-community/storybook-addon-cookie" alt="commit activity" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/commits"><img src="https://img.shields.io/github/last-commit/storybook-community/storybook-addon-cookie" alt="last commit" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/issues/"><img src="https://img.shields.io/github/issues/storybook-community/storybook-addon-cookie" alt="open issues" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/actions/workflows/continuous-integration.yml"><img src="https://github.com/storybook-community/storybook-addon-cookie/actions/workflows/continuous-integration.yml/badge.svg?branch=main" alt="CI status" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/graphs/contributors"><img src="https://img.shields.io/github/contributors/storybook-community/storybook-addon-cookie" alt="contributors" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="code of conduct: contributor covenant 2.1" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/blob/main/LICENSE"><img src="https://img.shields.io/github/license/storybook-community/storybook-addon-cookie.svg" alt="license" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/network/members"><img src="https://img.shields.io/github/forks/storybook-community/storybook-addon-cookie" alt="forks" /></a>
    <a href="https://github.com/storybook-community/storybook-addon-cookie/stargazers"><img src="https://img.shields.io/github/stars/storybook-community/storybook-addon-cookie" alt="stars" /></a>
  </p>
</div>

<p align="center">
  <img src="./assets/demo.gif" align="center" alt="demo"/>
</p>

> [!NOTE]
> This is a fork maintained by the community to provide support for Storybook 10 and beyond. This addon was originally developed by 김현우 (Kim HyunWoo).

---

## Install

This addon requires Storybook 11. Run the following command to install the addon and register it in your Storybook configuration:

```sh
npx storybook add @storybook-community/storybook-addon-cookie
```

Stories written in [CSF 4](https://storybook.js.org/docs/writing-stories/csf), the default story format since Storybook 11, get type-checked `cookie`, `cookieEncoding` and `cookiePreserve` parameters.

### Manual install

Install the addon:

```sh
npm i -D @storybook-community/storybook-addon-cookie
```

Register it in your `.storybook/main.ts` file:

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-vite, nextjs-vite)
import { defineMain } from '@storybook/your-framework/node'

export default defineMain({
  // ...rest of config
  addons: [
    // ..other addons
    '@storybook-community/storybook-addon-cookie',
  ],
})
```

Then register the addon's preview annotations in your `.storybook/preview.ts` file, so that TypeScript knows about the addon's parameters:

```ts
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react-vite, nextjs-vite)
import { definePreview } from '@storybook/your-framework'
import addonCookie from '@storybook-community/storybook-addon-cookie'

export default definePreview({
  // ...rest of preview
  addons: [addonCookie()],
})
```

## Usage

You can preset a cookie object through the `cookie` [parameter](https://storybook.js.org/docs/writing-stories/parameters). Each story has independent cookies, even if they are set via a global or component parameter.

You can manually edit or input a cookie object in the 'Cookie' addon panel. Those changes are not preserved on reload.

```tsx
import preview from '../.storybook/preview'
import { Example } from './Example'

const meta = preview.meta({
  component: Example,
})

export const WithCookie = meta.story({
  parameters: {
    cookie: {
      prop: 'value',
    },
  },
})
```

String values are set as is. Other values, such as numbers or objects, are serialized with `JSON.stringify`.

### Cookie encoding

If you want to encode the value of cookies you've set in `parameters` or in the panel, you can use the `cookieEncoding` parameter. This can be done globally, per-component or per-story.

```tsx
export const WithEncodedCookie = meta.story({
  parameters: {
    cookie: {
      prop: 'value',
    },
    cookieEncoding: true,
  },
})
```

This option defaults to `false`.

### Preserve existing cookies

If you want to use cookies that existed prior to loading the story, on top of those defined in `parameters`, you can set the `cookiePreserve` parameter.

```tsx
export const PreserveCookies = meta.story({
  parameters: {
    cookie: {
      prop: 'value',
    },
    cookiePreserve: true,
  },
})
```

This option defaults to `false`.

> [!CAUTION]
> If you modify a cookie in stories that do not have `cookiePreserve`, its value will be modified for all stories that use `cookiePreserve` that are subsequently loaded. Avoid mixing cookies between stories that do and don't preserve them.

> [!CAUTION]
> If all your stories use `cookiePreserve`, and one story does not set a cookie, that story will inherit the value of the last loaded story that did set a value for it.

> [!TIP]
> If you want some cookies to always be set for all stories, it is preferable to set them globally in `parameters` in `.storybook/preview.ts`. This guarantees absence of issues from the order in which you load stories.

```ts
// .storybook/preview.ts

export default definePreview({
  // ...rest of preview
  parameters: {
    cookie: {
      globallyShared: 'value',
    },
  },
})
```

## Previous Storybook versions

- Storybook 10: use version 5.x of this addon
- Storybook 9: unsupported
- Storybook 6-8: use `storybook-addon-cookie` from [hwookim](https://github.com/hwookim/storybook-addon-cookie) instead

## Contributing

### Code of Conduct

Please read the [Code of Conduct](https://github.com/storybook-community/storybook-addon-cookie/blob/main/CODE_OF_CONDUCT.md) first.

### Developer Certificate of Origin

To ensure that contributors are legally allowed to share the content they contribute under the license terms of this project, contributors must adhere to the [Developer Certificate of Origin](https://developercertificate.org/) (DCO). All contributions made must be signed to satisfy the DCO. This is handled by a Pull Request check.

> By signing your commits, you attest to the following:
>
> 1. The contribution was created in whole or in part by you and you have the right to submit it under the open source license indicated in the file; or
> 2. The contribution is based upon previous work that, to the best of your knowledge, is covered under an appropriate open source license and you have the right under that license to submit that work with modifications, whether created in whole or in part by you, under the same open source license (unless you are permitted to submit under a different license), as indicated in the file; or
> 3. The contribution was provided directly to you by some other person who certified 1., 2. or 3. and you have not modified it.
> 4. You understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information you submit with it, including your sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

### Getting Started

This project uses PNPM as a package manager.

- See the [installation instructions for PNPM](https://pnpm.io/installation)
- Run `pnpm i`

### Useful commands

- `pnpm start` starts the local Storybook
- `pnpm build` builds and packages the addon code
- `pnpm pack` makes a local tarball to be used as a NPM dependency elsewhere
- `pnpm test` runs the unit tests and the story tests (run `pnpm exec playwright install chromium` once first)

### Migrating to a later Storybook version

If you want to migrate the addon to support the latest version of Storyboook, you can check out the [addon migration guide](https://storybook.js.org/docs/addons/addon-migration-guide).

### Release System

This package auto-releases on pushes to `main` with [semantic-release](https://github.com/semantic-release/semantic-release). No changelog is maintained and the version number in `package.json` is not synchronised.

## Support

Please [open an issue](https://github.com/storybook-community/storybook-addon-cookie/issues/new) for bug reports or code suggestions. Make sure to include a working Minimal Working Example for bug reports. You may use [storybook.new](https://new-storybook.netlify.app/) to bootstrap a reproduction environment.

## Contact

Steve Dodier-Lazaro · `@Frog` on the [Storybook Discord](https://discord.gg/storybook)

Project Link: [https://github.com/storybook-community/storybook-addon-cookie](https://github.com/storybook-community/storybook-addon-cookie)

## Acknowledgments

### Thanks

- [김현우 (Kim HyunWoo)](https://github.com/hwookim) for developing the original addon
- All the contributors to the [Storybook addon kit](https://github.com/storybookjs/addon-kit)
