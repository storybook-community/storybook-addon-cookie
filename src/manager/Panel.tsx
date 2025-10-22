import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import {
  Bar,
  AddonPanel,
  Button,
  ScrollArea,
} from 'storybook/internal/components'

import { useGlobals, useParameter } from 'storybook/manager-api'
import { DeleteIcon, SweepIcon } from '@storybook/icons'
import { ObjectControl } from '@storybook/addon-docs/blocks'

import { PARAM_ENCODING_KEY, PARAM_KEY, PARAM_PRESERVE_KEY } from '../constants'
import { clearCookies, existingCookies, setCookies } from '../cookies'
import type { Cookie } from '../types'
import { styled } from 'storybook/theming'

interface PanelProps {
  active?: boolean
}

const Wrapper = styled(ScrollArea)(() => ({
  height: '100%',
  margin: 0,
  padding: '10px 5px 20px',
}))

const StyledBar = styled(Bar)(({ theme }) => ({
  background: theme.background.app,
}))

const Actions = styled.div({
  display: 'flex',
  alignItems: 'center',
  minHeight: '40px',
  gap: '6px',
  paddingInlineStart: '6px',
  paddingInlineEnd: '15px',
})

export const PanelContent = () => {
  const parameterCookie = useParameter<Cookie | null>(PARAM_KEY, null)
  const encoding = useParameter<boolean>(PARAM_ENCODING_KEY, false)
  const preserveCookies = useParameter<boolean>(PARAM_PRESERVE_KEY, false)

  const defaultCookie = useMemo(() => {
    return preserveCookies
      ? { ...existingCookies, ...parameterCookie }
      : parameterCookie
  }, [parameterCookie, preserveCookies, existingCookies])

  const [value, setValue] = useState<Cookie>()
  const [globals, updateGlobals] = useGlobals()

  const updateCookieValue = (newValue: Cookie | null, forceClear = false) => {
    console.log(
      'clearing, forceClear:',
      forceClear,
      'preserve:',
      preserveCookies,
      'newValue:',
      newValue,
    )
    setValue(newValue ?? {})

    if (forceClear || preserveCookies !== true) {
      clearCookies()
    }
    if (newValue) {
      setCookies(newValue, encoding)
    }
    updateGlobals({ ...globals })
  }

  useEffect(() => {
    if (!defaultCookie && !value) {
      return
    }
    updateCookieValue(defaultCookie)
  }, [defaultCookie, encoding])

  const handleChange = (newValue: Cookie) => {
    updateCookieValue(newValue)
  }

  const handleClear = () => {
    updateCookieValue(null, true)
  }

  const handleReset = () => {
    updateCookieValue(defaultCookie, true)
  }

  return (
    <Fragment>
      <StyledBar border>
        <Actions>
          <Button
            variant="ghost"
            padding="small"
            size="small"
            onClick={handleClear}
          >
            <DeleteIcon />
            Clear
          </Button>
          <Button
            variant="ghost"
            padding="small"
            size="small"
            onClick={handleReset}
          >
            <SweepIcon />
            Reset
          </Button>
        </Actions>
      </StyledBar>
      <Wrapper>
        <ObjectControl
          name="cookie"
          onChange={handleChange}
          value={value ?? {}}
        />
      </Wrapper>
    </Fragment>
  )
}

export const Panel = memo(function MyPanel({ active }: PanelProps) {
  return (
    <AddonPanel active={active ?? false}>
      <PanelContent />
    </AddonPanel>
  )
})
