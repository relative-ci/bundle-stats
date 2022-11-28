import React, {useCallback, useState} from 'react';
import { storiesOf } from '@storybook/react';
import get from 'lodash/get';

import { getWrapperDecorator } from '../../stories';
import { Filters } from '.';

const stories = storiesOf('UI/Filters', module);
stories.addDecorator(getWrapperDecorator({ paddingLeft: '200px' }));

const FiltersState = ({ children }) => {
  const [values, setValues] = useState({ changed: true, 'assetType.entrypoint': true });

  const handleSetValues = useCallback(
    (newValues) => {
      setValues({ ...values, ...newValues });
      console.info(newValues);
    },
    [values],
  );

  return children(values, handleSetValues);
};

stories.add('default', () => (
  <FiltersState>
    {(values, setValues) => (
      <Filters
        onChange={setValues}
        filters={{
          changed: {
            label: 'Changed',
            defaultValue: get(values, 'changed', true),
          },
          fileTypes: {
            label: 'File types',
            CSS: {
              label: 'CSS',
              defaultValue: get(values, 'fileTypes.CSS', true),
            },
            JS: {
              label: 'JS',
              defaultValue: get(values, 'fileTypes.JS', true),
            },
            HTML: {
              label: 'HTML',
              defaultValue: get(values, 'fileTypes.HTML', true),
            },
            OTHER: {
              label: 'Asset that is not CSS, JS or HTML',
              defaultValue: get(values, 'fileTypes.OTHER', true),
            },
          },
        }}
      />
    )}
  </FiltersState>
));

stories.add('overflow', () => (
  <FiltersState>
    {(values, setValues) => (
      <Filters
        onChange={setValues}
        filters={{
          changed: {
            label: 'Changed',
            defaultValue: get(values, 'changed', true),
          },
          chunks: {
            label: 'Chunks',
            ...Array(22)
              .fill('')
              .reduce(
                (agg, value, currentIndex) => ({
                  ...agg,
                  [`chunk-${currentIndex}`]: {
                    label: `Chunk ${currentIndex + 1}`,
                    defaultValue: get(values, `chunks.chunk-${currentIndex}`),
                  },
                }),
                {},
              ),
          },
        }}
      />
    )}
  </FiltersState>
));

stories.add('disable options', () => (
  <Filters
    onChange={(state) => {
      console.log(state); // eslint-disable-line no-console
    }}
    filters={{
      changed: {
        label: 'Changed',
        defaultValue: false,
        disabled: true,
      },
      entrypoint: {
        label: 'Entrypoint',
        defaultValue: false,
      },
      fileTypes: {
        label: 'File types',

        CSS: {
          label: 'CSS',
          defaultValue: true,
        },
        JS: {
          label: 'JS',
          defaultValue: true,
        },
        HTML: {
          label: 'HTML',
          defaultValue: true,
        },
      },
    }}
  />
));
