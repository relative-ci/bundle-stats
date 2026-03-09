import { useCookie } from 'react-use';
import Cookies from 'js-cookie';
import { wait } from '@bundle-stats/utils';

export type ThemeName = 'light' | 'dark';

// classList required timeout to allow to disable motion during the switch
const CLASSLIST_UPDATE_TIMEOUT = 10;

const COOKIE_NAME = 'theme';

export const getCurrentTheme = (): ThemeName => {
  const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
  return matches ? 'dark' : 'light';
};

export const getCookieTheme = (): ThemeName | null => {
  const nextTheme = Cookies.get(COOKIE_NAME);

  if (!nextTheme) {
    return null;
  }

  if (['light', 'dark'].includes(nextTheme)) {
    return nextTheme as ThemeName;
  }

  return null;
};

export const switchTheme = async (newTheme: ThemeName) => {
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
};

export const useCookieTheme = () => {
  return useCookie(COOKIE_NAME);
};
