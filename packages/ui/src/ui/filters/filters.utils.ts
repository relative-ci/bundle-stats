import type { FilterFieldData, FilterFieldsData, FilterGroupFieldData } from '../../types';

const FILTER_SUFFIX_MAX_LENGTH = 18;
const ELLIPSES = '...';
const JOIN = ', ';

export const LABELS = {
  NONE: 'none',
  ALL: 'all',
};

export const getGroupFiltersLabelSuffix = (filters: FilterGroupFieldData['children']): string => {
  const filterCount = filters.length;
  const checkedFilters = filters.filter(({ defaultValue }) => defaultValue);
  const filterCheckedCount = checkedFilters.length;

  if (filterCheckedCount === 0) {
    return LABELS.NONE;
  }

  if (filterCheckedCount === filterCount) {
    return LABELS.ALL;
  }

  // eslint-disable-next-line no-unused-vars
  const checkedFilterLabels = checkedFilters.map(({ label }) => label);

  let suffix = '';
  let inlinedLabelCount = 0;
  let done = false;

  for (
    let i = 0;
    !done && i < checkedFilterLabels.length && FILTER_SUFFIX_MAX_LENGTH - suffix.length >= 0;
    i++ // eslint-disable-line no-plusplus
  ) {
    const availableSpace = FILTER_SUFFIX_MAX_LENGTH - suffix.length;
    const label = checkedFilterLabels[i];

    let normalizedLabel = '';

    if (availableSpace - label.length >= 0) {
      // Label is fitting in the available space
      normalizedLabel = label;
    } else if (availableSpace >= 6) {
      // Available space is allowing crop
      normalizedLabel = `${label.substr(0, availableSpace - 3)}${ELLIPSES}`;
    } else {
      // noop - the label will not fit
    }

    if (normalizedLabel) {
      suffix = `${suffix}${suffix ? JOIN : ''}${normalizedLabel}`;
      inlinedLabelCount = i + 1;
    } else {
      done = true;
    }
  }

  const skippedLabels = filterCheckedCount - inlinedLabelCount;

  return `${suffix}${skippedLabels > 0 ? ` +${skippedLabels}` : ''}`;
};

export const getInitialValues = (
  key: string,
  filtersData: FilterFieldsData | FilterFieldData | FilterGroupFieldData | string,
): Record<string, boolean> => {
  if (typeof filtersData !== 'object') {
    return {};
  }

  if ('defaultValue' in filtersData) {
    return {
      [key]: (filtersData as FilterFieldData).defaultValue,
    };
  }

  if ('children' in filtersData) {
    const result = {} as Record<string, boolean>;

    (filtersData as FilterGroupFieldData).children.forEach(({ key: childKey, defaultValue }) => {
      const fullKey = [...(key ? [key] : []), childKey].join('.');
      result[fullKey] = defaultValue;
    });

    return result;
  }

  let result = {};

  Object.entries(filtersData).forEach(([groupKey, groupFilters]) => {
    if (typeof groupFilters === 'object') {
      const fullKey = [...(key ? [key] : []), groupKey].join('.');
      const groupInitialValues = getInitialValues(fullKey, groupFilters as any);
      result = {
        ...result,
        ...groupInitialValues,
      };
    }
  });

  return result;
};
