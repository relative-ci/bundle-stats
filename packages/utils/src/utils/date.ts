import isDate from 'lodash/isDate';

// @ts-ignore
const getNavigatorLanguages = () => (typeof window !== 'undefined' && typeof window.navigator !== 'undefined' && window.navigator.languages) || 'en';

const getResultAsString = (value?: Date | string | number): string => {
  if (isDate(value)) {
    return value.toString();
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return value || '';
};

export const formatDateTime = (
  formatterOptions: Intl.DateTimeFormatOptions,
  value?: Date | string | number,
): string => {
  let date;
  let result = '';

  if (!value) {
    return result;
  }

  if (isDate(value)) {
    date = value;
  } else {
    try {
      date = new Date(value as string | number);
    } catch (err) {
      // noop
      return getResultAsString(value);
    }
  }

  const formatter = new Intl.DateTimeFormat(getNavigatorLanguages(), formatterOptions);

  try {
    result = formatter.format(date);
  } catch (err) {
    // noop
    return getResultAsString(value);
  }

  return result;
};

export const formatDate = (value?: Date | string | number): string =>
  formatDateTime(
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
    value,
  );

export const formatTime = (value?: Date | string | number): string =>
  formatDateTime(
    {
      // Workaround CI node issue
      ...(process.env.NODE_ENV !== 'test' && {
        hour: '2-digit',
      }),
      minute: '2-digit',
      second: '2-digit',
    },
    value,
  );
