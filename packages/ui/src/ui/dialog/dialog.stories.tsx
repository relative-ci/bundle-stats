import React, { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown, DropdownItem } from '../dropdown';
import { Button } from '../button';
import { Dialog, useDialogState } from '.';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  argTypes: {
    width: {
      control: {
        type: 'select',
      },
      options: ['narrow', 'medium', 'wide', 'extra-wide'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const DialogComponent = (storyArgs: Story['args']) => {
  const { width } = storyArgs;
  const dialog = useDialogState();

  return (
    <>
      <Button type="button" onClick={dialog.toggle}>
        Open
      </Button>
      <Dialog title="Title" state={dialog} width={width}>
        <div>
          <Dropdown label="Select option">
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </Dropdown>
          <br />
          <br />
          {[1, 2, 3].map((item) => (
            <Fragment key={item}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate, lectus
                vitae tristique facilisis, quam ex vulputate risus, vitae mattis eros diam quis
                velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Sed et velit tortor. Suspendisse risus ipsum, convallis ultricies
                justo vel, auctor semper est. Sed viverra pulvinar odio eget pharetra. In eleifend
                felis nec odio convallis, eleifend rhoncus diam maximus. Cras diam libero, egestas
                blandit vestibulum nec, volutpat a mi. Etiam blandit turpis ac nulla molestie
                vehicula. Duis bibendum a nisl sollicitudin lobortis. Vestibulum lobortis eget justo
                ac elementum. Vestibulum vel lorem arcu. Etiam sagittis luctus justo eu interdum. Ut
                lobortis tempus turpis, vitae auctor elit congue id.
              </p>
              <br />
              <p>
                Nulla eu ullamcorper quam. Mauris rhoncus tristique dui in rutrum. Ut eget justo a
                lorem efficitur consequat. Nunc sed erat at ipsum convallis iaculis at ac lacus.
                Etiam pellentesque felis quis maximus ultrices. Vivamus non pretium quam. Aenean vel
                nunc fringilla, lacinia felis a, vehicula purus. Vestibulum in varius purus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Quisque laoreet ultrices ligula eget iaculis. Vivamus lacinia ante mattis
                lorem ultricies consequat. Integer dui odio, semper ac neque vitae, elementum
                hendrerit ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Fragment>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: (storyArgs) => <DialogComponent {...storyArgs} />,
};
