import { compose, withState, withProps } from 'recompose';

export const withFilters = () => compose(
  withState('filters', 'updateFilters', ({ initialFilters }) => initialFilters),
  withProps(({ defaultFilters, updateFilters }) => ({
    resetFilters: () => updateFilters(defaultFilters),
  })),
);
