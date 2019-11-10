import initStoryshots from '@storybook/addon-storyshots';
import { advanceTo } from 'jest-date-mock';

initStoryshots({
  framework: 'react',
  configPath: __dirname,
});

advanceTo(new Date(2019, 0, 10));
