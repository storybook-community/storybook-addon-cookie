import type { Cookie } from './types'

export function getExistingCookies(): Cookie {
  return document.cookie.split(';').reduce((acc: Cookie, cookieStr) => {
    const [name, ...rest] = cookieStr.split('=')
    const value = rest.join('=')
    if (name) {
      acc[name.trim()] = value
    }
    return acc
  }, {})
}

export let existingCookies: Cookie = {}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        existingCookies = getExistingCookies()
      },
      { once: true },
    )
  } else {
    existingCookies = getExistingCookies()
  }
}

export function setCookie(name: string, value: string, encoding?: boolean) {
  let cookieValue
  if (typeof value === 'string') {
    cookieValue = encoding ? encodeURIComponent(value) : value
  } else {
    cookieValue = JSON.stringify(value)
    if (encoding) {
      cookieValue = encodeURIComponent(cookieValue)
    }
  }
  document.cookie = `${name}=${cookieValue};`
}

export function setCookies(cookie: Cookie, encoding?: boolean) {
  const entries: [string, string][] = Object.entries(cookie)
  entries.forEach(([name, value]) => setCookie(name, value, encoding))
}

export function clearCookies() {
  const cookie = document.cookie.split(';')

  cookie.forEach((cookie) => {
    const equalPos = cookie.indexOf('=')
    const name = equalPos > -1 ? cookie.substring(0, equalPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })
}
