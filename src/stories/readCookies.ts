/** Read `document.cookie` into a name/value map, independent of the addon's own parser. */
export function readCookies(): Record<string, string> {
  return Object.fromEntries(
    document.cookie
      .split('; ')
      .filter(Boolean)
      .map((pair) => {
        const index = pair.indexOf('=')
        return [pair.slice(0, index), pair.slice(index + 1)]
      }),
  )
}

/** Set a cookie as if the page had it before the story loaded. */
export function setPreexistingCookie() {
  document.cookie = 'preexisting=from the page'
  return () => {
    document.cookie = 'preexisting=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}
