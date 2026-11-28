import { afterEach, describe, expect, it } from 'vitest'

import {
  clearCookies,
  getExistingCookies,
  setCookie,
  setCookies,
} from './cookies'

afterEach(() => {
  clearCookies()
})

describe('getExistingCookies', () => {
  it('returns an empty object when there are no cookies', () => {
    expect(getExistingCookies()).toEqual({})
  })

  it('parses every cookie into a name/value map', () => {
    document.cookie = 'a=1'
    document.cookie = 'b=two'
    expect(getExistingCookies()).toEqual({ a: '1', b: 'two' })
  })

  it('keeps "=" characters inside the value', () => {
    document.cookie = 'token=abc=def=='
    expect(getExistingCookies()).toEqual({ token: 'abc=def==' })
  })
})

describe('setCookie', () => {
  it('sets a string value as is', () => {
    setCookie('name', 'plain value')
    expect(getExistingCookies()).toEqual({ name: 'plain value' })
  })

  it('encodes a string value when encoding is on', () => {
    setCookie('name', 'a value; with=symbols', true)
    expect(getExistingCookies()).toEqual({
      name: 'a%20value%3B%20with%3Dsymbols',
    })
  })

  it.each([
    ['number', 42, '42'],
    ['boolean', true, 'true'],
    ['null', null, 'null'],
    ['array', [1, 'two'], '[1,"two"]'],
    ['object', { a: 1, b: [true] }, '{"a":1,"b":[true]}'],
  ])('serializes a %s value with JSON.stringify', (_, value, expected) => {
    setCookie('name', value)
    expect(getExistingCookies()).toEqual({ name: expected })
  })

  it('encodes a serialized value when encoding is on', () => {
    setCookie('name', { a: 'b c' }, true)
    expect(getExistingCookies()).toEqual({
      name: encodeURIComponent('{"a":"b c"}'),
    })
  })
})

describe('setCookies', () => {
  it('sets every entry of the cookie object', () => {
    setCookies({ a: 'one', b: 2 })
    expect(getExistingCookies()).toEqual({ a: 'one', b: '2' })
  })

  it('applies encoding to every entry', () => {
    setCookies({ a: 'one two', b: 'three four' }, true)
    expect(getExistingCookies()).toEqual({
      a: 'one%20two',
      b: 'three%20four',
    })
  })
})

describe('clearCookies', () => {
  it('removes every cookie', () => {
    document.cookie = 'a=1'
    document.cookie = 'b=2'
    document.cookie = 'c=3'
    clearCookies()
    expect(document.cookie).toBe('')
  })

  it('does nothing when there are no cookies', () => {
    clearCookies()
    expect(document.cookie).toBe('')
  })
})
