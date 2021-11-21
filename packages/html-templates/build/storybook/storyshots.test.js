import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { advanceTo } from 'jest-date-mock';

configure({ adapter: new Adapter() });
const converter = new Stories2SnapsConverter();

jest.mock('global', () => ({ ...global, window: { STORYBOOK_HOOKS_CONTEXT: '' } }));

initStoryshots({
  framework: 'react',
  configPath: __dirname,
  test: ({ story, context }) => {
    const snapshotFileName = converter.getSnapshotFileName(context);
    const storyElement = story.render();
    const shallowTree = shallow(storyElement);

    if (snapshotFileName) {
      expect(toJson(shallowTree)).toMatchSpecificSnapshot(snapshotFileName);
    }
  },
});

advanceTo(new Date(2019, 0, 10));
