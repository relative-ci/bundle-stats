import { SECTIONS } from '../constants';

export const URLS = {
  OVERVIEW: '/',
  ASSETS: '/assets',
  MODULES: '/modules',
  PACKAGES: '/packages',
};

export const SECTION_URLS = {
  [SECTIONS.TOTALS]: URLS.OVERVIEW,
  [SECTIONS.ASSETS]: URLS.ASSETS,
  [SECTIONS.MODULES]: URLS.MODULES,
  [SECTIONS.PACKAGES]: URLS.PACKAGES,
};
