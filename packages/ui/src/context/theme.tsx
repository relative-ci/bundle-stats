import type { ReactNode } from 'react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useCookie } from 'react-use';

type ThemeName = 'light' | 'dark';

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
  const [name, setName] = useState<ThemeName>(cookieValue === 'dark' ? 'dark' : 'light');

  const updateClassList = useCallback((newTheme: ThemeName) => {
    const htmlElm = document.querySelector('html');

    if (newTheme === 'dark') {
      htmlElm?.classList.replace('light-theme', 'dark-theme');
    } else {
      htmlElm?.classList.replace('dark-theme', 'light-theme');
    }
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
