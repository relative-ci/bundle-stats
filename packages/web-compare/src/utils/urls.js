export const WEBPACK_HREF = '/webpack';
export const WEBPACK_PATH = `${WEBPACK_HREF}/:subpage?`;
export const WEBPACK_TOTALS_SLUG = '';
export const WEBPACK_ASSETS_SLUG = 'assets';
export const WEBPACK_MODULES_SLUG = 'modules';
export const WEBPACK_PACKAGES_SLUG = 'packages';

export const LIGHTHOUSE_HREF = '/lighthouse';
export const LIGHTHOUSE_PATH = LIGHTHOUSE_HREF;

export const BROWSERTIME_HREF = '/browsertime';
export const BROWSERTIME_PATH = BROWSERTIME_HREF;

export const getWebpackPath = (subpageSlug) => [WEBPACK_HREF, subpageSlug].filter(Boolean).join('/');
export const getWebpackUrl = (subpageSlug) => `${getWebpackPath(subpageSlug)}${window.location.search}`;
