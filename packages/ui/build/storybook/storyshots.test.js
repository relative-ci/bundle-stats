import path from 'path';
import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { advanceTo } from 'jest-date-mock';

advanceTo(new Date(2019, 0, 10));

configure({ adapter: new Adapter() });
const converter = new Stories2SnapsConverter();

const UI_PATTERN = new RegExp(path.join(__dirname, '../../src/ui'));

initStoryshots({
  framework: 'react',
  configPath: __dirname,
  test: ({ story, context }) => {
    const snapshotFileName = converter.getSnapshotFileName(context);
    const storyElement = story.render();
    const renderMethod = UI_PATTERN.test(snapshotFileName) ? mount : shallow;
    const tree = renderMethod(storyElement);

    if (snapshotFileName) {
      expect(toJson(tree)).toMatchSpecificSnapshot(snapshotFileName);
    }
  },
});
