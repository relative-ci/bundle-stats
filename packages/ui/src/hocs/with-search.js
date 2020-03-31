import { compose, withState, withProps } from 'recompose';

// TODO debounce
const runSearch = (items, query) => {
  // TODO: safe reg exp search
  let searchRegExp = null;

  try {
    searchRegExp = new RegExp(query);
  } catch {
    // TODO: show show the error
    return null;
  }

  return items.filter(({ key }) => key && searchRegExp.test(key));
};

export const withSearch = () =>
  compose(
    withState('search', 'updateSearch', ''),
    withProps(({ items, search }) => {
      if (!search.trim()) {
        return null;
      }

      return {
        items: runSearch(items, search),
      };
    }),
  );
