import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../icon';
import { Button } from '.';

export default {
  title: 'UI/Button',
  component: Button,
} as Meta;

const Template: Story = ({ children = 'Action', ...props }) => (
  <Button {...props}>{children}</Button>
);

const Items = (props) => (
  <FlexStack alignItems="top" style={{ flexWrap: 'wrap', gap: '12px' }} {...props} />
);

export const Default = Template.bind({});

export const All = () => (
  <Stack space="large">
    <Stack space="medium">
      <h2>Size</h2>
      <Items>
        {Object.values(Button.SIZE).map((size) => (
          <Button size={size} key={size}>
            Action {size}
          </Button>
        ))}
      </Items>
    </Stack>
    <Stack space="medium">
      <h2>Kind</h2>
      <Stack space="medium">
        <Items>
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind}>
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>Active</h3>
        <Items>
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>As link</h3>
        <Items>
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind} as="a" href="#">
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>With icon</h3>
        <Items>
          {Object.values(Button.KIND).map((kind) => (
            <Button glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE} kind={kind} key={kind}>
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>Disabled</h3>
        <Items>
          {Object.values(Button.KIND).map((kind) => (
            <Button kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </Items>
      </Stack>
    </Stack>
    <Stack space="medium">
      <h2>Outline & Kind</h2>
      <Stack space="medium">
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button outline size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button outline kind={kind} key={kind} size={size}>
                Action {kind}
              </Button>
            ))}
          </Items>
        ))}
        <h3>Active</h3>
        <Items>
          <Button outline active>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button outline kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>With icon</h3>
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE} outline size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button
                glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE}
                outline
                kind={kind}
                size={size}
                key={kind}
              >
                Action {kind}
              </Button>
            ))}
          </Items>
        ))}
        <h3>Only icon</h3>
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE} outline size={size} />
            {Object.values(Button.KIND).map((kind) => (
              <Button
                glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE}
                outline
                kind={kind}
                size={size}
                key={kind}
              />
            ))}
          </Items>
        ))}
        <h3>Disabled</h3>
        <Items>
          <Button outline disabled>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button outline kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </Items>
      </Stack>
    </Stack>
    <Stack space="medium">
      <h2>Solid & Kind</h2>
      <Stack space="medium">
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button solid size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button solid kind={kind} key={kind} size={size}>
                Action {kind}
              </Button>
            ))}
          </Items>
        ))}
        <h3>Active</h3>
        <Items>
          <Button solid active>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button solid kind={kind} key={kind} active>
              Action {kind}
            </Button>
          ))}
        </Items>
        <h3>With icon</h3>
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE} solid size={size}>
              Action default
            </Button>
            {Object.values(Button.KIND).map((kind) => (
              <Button
                glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE}
                solid
                kind={kind}
                size={size}
                key={kind}
              >
                Action {kind}
              </Button>
            ))}
          </Items>
        ))}
        <h3>Only icon</h3>
        {Object.values(Button.SIZE).map((size) => (
          <Items key={size}>
            <Button glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE} solid size={size} />
            {Object.values(Button.KIND).map((kind) => (
              <Button
                glyph={Icon.ICONS.ARROW_RIGHT_CIRLCE}
                solid
                kind={kind}
                size={size}
                key={kind}
              />
            ))}
          </Items>
        ))}
        <h3>Disabled</h3>
        <Items>
          <Button solid disabled>
            Action default
          </Button>
          {Object.values(Button.KIND).map((kind) => (
            <Button solid kind={kind} key={kind} disabled>
              Action {kind}
            </Button>
          ))}
        </Items>
      </Stack>
    </Stack>
  </Stack>
);
