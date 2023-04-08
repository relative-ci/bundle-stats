export const NO_SPACE = 'no-space';
export const SPACE_XXXSMALL = 'xxxsmall';
export const SPACE_XXSMALL = 'xxsmall';
export const SPACE_XSMALL = 'xsmall';
export const SPACE_SMALL = 'small';
export const SPACE_MEDIUM = 'medium';
export const SPACE_LARGE = 'large';
export const SPACE_XLARGE = 'xlarge';
export const SPACE_XXLARGE = 'xxlarge';
export const SPACE_XXXLARGE = 'xxxlarge';

export const SPACES = [
  NO_SPACE,
  SPACE_XXXSMALL,
  SPACE_XXSMALL,
  SPACE_XSMALL,
  SPACE_SMALL,
  SPACE_MEDIUM,
  SPACE_LARGE,
  SPACE_XLARGE,
  SPACE_XXLARGE,
  SPACE_XXXLARGE,
] as const;

export const KIND = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;
