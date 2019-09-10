import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { HorizontalBarChart } from '.';

const stories = storiesOf('UI/HorizontalBarChart', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [300, 200, 300, 0, 20],
    }}
  />
));

stories.add('with maxValue', () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [300, 200, 300, 0, 20],
    }}
    maxValue={1200}
  />
));

stories.add('with custom colors', () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [
        {
          value: 300,
          color: 'red',
        },
        {
          value: 200,
          color: 'green',
        },
        {
          value: 300,
          color: 'orange',
        },
        {
          value: 0,
          color: 'blue',
        },
        {
          value: 20,
          color: 'pink',
        },
      ],
    }}
  />
));

stories.add('with custom label', () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [
        {
          value: 300,
          color: 'red',
          label: (
            <h3>JS</h3>
          ),
        },
        {
          value: 200,
          color: 'green',
          label: (
            <h3>JS</h3>
          ),
        },
        {
          value: 300,
          color: 'orange',
          label: (
            <h3>JS</h3>
          ),
        },
        {
          value: 0,
          color: 'blue',
          label: (
            <h3>JS</h3>
          ),
        },
        {
          value: 20,
          color: 'pink',
          label: (
            <h3>JS</h3>
          ),
        },
      ],
    }}
  />
));
