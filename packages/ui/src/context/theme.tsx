import type { ReactNode } from 'react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { getCurrentTheme, switchTheme, useCookieTheme, type ThemeName } from '../utils/theme';

type ThemeContextProps = {
  name: ThemeName;
  update: (newTheme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  name: 'light',
  update: () => {},
});

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  const [cookieValue, setCookieValue] = useCookieTheme();
  const [theme, setTheme] = useState<ThemeName>((cookieValue as ThemeName) || getCurrentTheme());

  const updateTheme = useCallback(
    (nextTheme: ThemeName) => {
      setCookieValue(nextTheme);
      switchTheme(nextTheme);
    },
    [setTheme, setCookieValue],
  );

  // Sync classNames on load
  useEffect(() => {
    switchTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      name: theme,
      update: updateTheme,
    }),
    [theme, updateTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};
