import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '.';

export default {
  title: 'Layout/Box',
  component: Box,
  decorators: [getWrapperDecorator()],
};

const Template = (props: any) => <Box style={{ outline: '1px dotted magenta' }} {...props}>Lorem ipsum</Box>;


export const Default = Template.bind({});

export const WithPadding = Template.bind({});
WithPadding.args = {
  padding: 'medium',
};

export const WithHorizontalPadding = Template.bind({});
WithHorizontalPadding.args = {
  horizontalPadding: 'medium',
};

export const WithVerticalPadding = Template.bind({});
WithVerticalPadding.args = {
  verticalPadding: 'medium',
};

export const WithHorizontalAndVerticalPadding = Template.bind({});
WithHorizontalAndVerticalPadding.args = {
  padding: ['xxsmall', 'medium'],
};

export const WithOutline = Template.bind({});
WithOutline.args = {
  outline: true,
};
