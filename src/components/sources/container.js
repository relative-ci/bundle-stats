import {
  compose,
  withState,
  withHandlers,
} from 'recompose';

const addSource = ({ sources, setSources }) => source =>
  setSources([
    ...sources,
    source,
  ]);

const removeSource = ({ sources, setSources }) => sourceIndex =>
  setSources([
    ...sources.slice(0, sourceIndex),
    ...sources.slice(sourceIndex + 1),
  ]);

export default compose(
  withState('sources', 'setSources', ({ initialSources }) => ([...initialSources || []])),
  withHandlers({
    addSource,
    removeSource,
  }),
);
