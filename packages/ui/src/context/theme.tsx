import type { ReactNode } from 'react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useCookie } from 'react-use';
import { wait } from '@bundle-stats/utils';

// classList required timeout to allow to disable motion during the switch
const CLASSLIST_UPDATE_TIMEOUT = 10;

type ThemeName = 'light' | 'dark';

const getCurrentTheme = (): ThemeName => {
  const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
  return matches ? 'dark' : 'light';
};

type ThemeContextProps = {
  name: ThemeName;
  update: (newTheme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  name: 'light',
  update: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [cookieValue, setCookieValue] = useCookie('theme');
  const [name, setName] = useState<ThemeName>((cookieValue as ThemeName) || getCurrentTheme());

  const updateClassList = useCallback(async (newTheme: ThemeName) => {
    const htmlElm = document.querySelector('html');

    htmlElm?.classList.add('no-motion');

    await wait(CLASSLIST_UPDATE_TIMEOUT);

    if (newTheme === 'dark') {
      htmlElm?.classList.remove('light-theme');
      htmlElm?.classList.add('dark-theme');
    } else {
      htmlElm?.classList.remove('dark-theme');
      htmlElm?.classList.add('light-theme');
    }

    await wait(CLASSLIST_UPDATE_TIMEOUT);

    htmlElm?.classList.remove('no-motion');
  }, []);

  const updateTheme = useCallback((nextTheme: ThemeName) => {
    setName(nextTheme);
    updateClassList(nextTheme);
    setCookieValue(nextTheme);
  }, []);

  // Sync classList
  useEffect(() => {
    updateClassList(name);
  }, [name]);

  const value = useMemo(
    () => ({
      name,
      update: updateTheme,
    }),
    [name, updateTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};
