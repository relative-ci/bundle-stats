const FILTER_SUFFIX_MAX_LENGTH = 18;
const ELLIPSES = '...';
const JOIN = ', ';

export const LABELS = {
  NONE: 'none',
  ALL: 'all',
};

/**
 * @param {Array<Array>} filters
 * @return {String}
 */
export const getGroupFiltersLabelSuffix = (filters) => {
  const filterCount = filters.length;
  // eslint-disable-next-line no-unused-vars
  const checkedFilters = filters.filter(([_, { defaultValue }]) => defaultValue);
  const filterCheckedCount = checkedFilters.length;

  if (filterCheckedCount === 0) {
    return LABELS.NONE;
  }

  if (filterCheckedCount === filterCount) {
    return LABELS.ALL;
  }

  // eslint-disable-next-line no-unused-vars
  const checkedFilterLabels = checkedFilters.map(([_, { label }]) => label);

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
