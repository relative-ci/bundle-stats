import React from 'react';
import type { Meta, Story } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Alert } from '.';

export default {
  title: 'UI/Alert',
  component: Alert,
  decorators: [getWrapperDecorator()],
} as Meta<typeof Alert>;

const Template: Story = (args) => <Alert {...args}>Lorem ipsum</Alert>;

export const Default = Template.bind({});

export const WithKindSuccess = Template.bind({});

WithKindSuccess.args = {
  kind: 'success',
};

export const WithKindInfo = Template.bind({});

WithKindInfo.args = {
  kind: 'info',
};

export const WithKindWarning = Template.bind({});

WithKindWarning.args = {
  kind: 'warning',
};

export const WithKindDanger = Template.bind({});

WithKindDanger.args = {
  kind: 'danger',
};
