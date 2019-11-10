import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import { advanceTo } from 'jest-date-mock';

const createNodeMock = (element) => {
  if (element.type === 'div') {
    return {
      parentElement: {
        currentStyle: {
          position: 'relative',
        },
      },
    };
  }

  return null;
};

advanceTo(new Date(2019, 0, 10));

initStoryshots({
  framework: 'react',
  configPath: __dirname,
  test: snapshotWithOptions({
    createNodeMock,
  }),
});
