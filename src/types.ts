/**
 * A value that can be set in a cookie. Strings are set as is, and other values are serialized with
 * `JSON.stringify`.
 */
export type CookieValue =
  | string
  | number
  | boolean
  | null
  | CookieValue[]
  | { [key: string]: CookieValue }

export type Cookie = Record<string, CookieValue>

export interface CookieParameters {
  /**
   * Cookies to set before the story renders, keyed by cookie name.
   *
   * @see https://github.com/storybook-community/storybook-addon-cookie#usage
   */
  cookie?: Cookie
  /**
   * Encode cookie values with `encodeURIComponent`.
   *
   * @default false
   * @see https://github.com/storybook-community/storybook-addon-cookie#cookie-encoding
   */
  cookieEncoding?: boolean
  /**
   * Keep the cookies that existed before the story loaded, and set the `cookie` parameter on top of
   * them.
   *
   * @default false
   * @see https://github.com/storybook-community/storybook-addon-cookie#preserve-existing-cookies
   */
  cookiePreserve?: boolean
}

export interface CookieTypes {
  parameters: CookieParameters
}
