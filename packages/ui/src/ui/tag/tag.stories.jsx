import { Tag } from '.';

export default {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    kind: {
      control: 'select',
      options: Object.values(Tag.KINDS),
    },
    size: {
      control: 'select',
      options: Object.values(Tag.SIZES),
    },
  },
  args: {
    children: 'tag',
  },
};

export const Default = Tag.bind();

export const OneLetter = Tag.bind();

OneLetter.args = {
  children: 'd',
};
