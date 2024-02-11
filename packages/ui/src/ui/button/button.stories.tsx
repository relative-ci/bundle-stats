import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Button } from '.';

export default {
  title: 'UI/Button',
  component: Button,
} as Meta;

const Template: Story = ({ children = 'Action', ...props }) => (
  <Button {...props}>{children}</Button>
);

export const Default = Template.bind({});

export const All = () => (
  <Stack space="large">
    <Stack space="medium">
      <h2>Size</h2>
      <FlexStack space="small" alignItems="top">
        {Object.values(Button.SIZE).map((size) => (
          <Button size={size} key={size}>
            Action {size}
          </Button>
        ))}
      </FlexStack>
    </Stack>
    <Stack space="medium">
      <h2>Kind</h2>
      <Stack space="small">
        <FlexStack space="small" alignItems="top">
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind}>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
        <h3>Active</h3>
        <FlexStack space="small" alignItems="top">
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
        <h3>Disabled</h3>
        <FlexStack space="small" alignItems="top">
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
      </Stack>
    </Stack>
    <Stack space="medium">
      <h2>Outline & Kind</h2>
      <Stack space="small">
        {Object.values(Button.SIZE).map((size) => (
          <FlexStack space="small" alignItems="top" key={size}>
            <Button outline size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button outline kind={kind} key={kind} size={size}>
                Action {kind}
              </Button>
            ))}
          </FlexStack>
        ))}
        <h3>Active</h3>
        <FlexStack space="small" alignItems="top">
          <Button outline active>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button outline kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
        <h3>Disabled</h3>
        <FlexStack space="small" alignItems="top">
          <Button outline disabled>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button outline kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
      </Stack>
    </Stack>
    <Stack space="medium">
      <h2>Solid & Kind</h2>
      <Stack space="small">
        {Object.values(Button.SIZE).map((size) => (
          <FlexStack space="small" alignItems="top" key={size}>
            <Button solid size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button solid kind={kind} key={kind} size={size}>
                Action {kind}
              </Button>
            ))}
          </FlexStack>
        ))}
        <h3>Active</h3>
        <FlexStack space="small" alignItems="top">
          <Button solid active>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button solid kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
        <h3>Disabled</h3>
        <FlexStack space="small" alignItems="top">
          <Button solid disabled>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button solid kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </FlexStack>
      </Stack>
    </Stack>
  </Stack>
);
