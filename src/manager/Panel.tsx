import React, { memo, useEffect, useState } from "react";
import { AddonPanel } from "storybook/internal/components";
import { Button } from "storybook/internal/components";
import { styled } from "storybook/theming";

import { useGlobals, useParameter } from 'storybook/manager-api';
import { TrashIcon } from '@storybook/icons';
import { ObjectControl } from '@storybook/addon-docs/blocks';

import { PARAM_ENCODING_KEY, PARAM_KEY } from '../constants';
import { clearCookies, setCookies } from "../cookies";
import type { Cookie } from '../types';

interface PanelProps {
  active?: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const PanelContent: React.FC = () => {
  const defaultCookie = useParameter<Cookie>(PARAM_KEY, {});
  const encoding = useParameter<boolean>(PARAM_ENCODING_KEY, false);

  const [value, setValue] = useState<Cookie>();
  const [globals, updateGlobals] = useGlobals();

  const updateCookieValue = (newValue: Cookie | null) => {
    setValue(newValue ?? {});
    clearCookies();
    if (newValue) {
      setCookies(newValue, encoding);
    }
    updateGlobals({ ...globals });
  };

  useEffect(() => {
    if (!defaultCookie && !value) {
      return;
    }
    updateCookieValue(defaultCookie);
  }, [defaultCookie, encoding]);

  const handleChange = (newValue: Cookie) => {
    updateCookieValue(newValue);
  };

  const handleClear = () => {
    updateCookieValue(null);
  };

  return (
    <div style={{ padding: '10px 20px' }}>
      <button style={{ marginBottom: '5px' }} onClick={handleClear}>
        <TrashIcon style={{ marginRight: '5px' }} />
        Clear All Cookies
      </button>
      <ObjectControl
        name="cookie"
        onChange={handleChange}
        value={value ?? {}}
      />
    </div>
  );
};

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {

  return (
    <AddonPanel active={props.active ?? false}>
      <PanelContent />
    </AddonPanel>
  );
});
