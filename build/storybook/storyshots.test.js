import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';

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

initStoryshots({
  framework: 'react',
  configPath: __dirname,
  test: snapshotWithOptions({
    createNodeMock,
  }),
});
