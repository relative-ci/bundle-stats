import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { HorizontalBarChart } from '.';

export default {
  title: 'UI/HorizontalBarChart',
  component: HorizontalBarChart,
  decorators: [getWrapperDecorator({ paddingTop: '128px' })],
};

export const Default = () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [300, 200, 300, 0, 20],
    }}
  />
);

export const EmptyValues = () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [0, 0, 0, 0, 0],
    }}
  />
);

export const WithMaxValue = () => (
  <HorizontalBarChart
    data={{
      labels: ['JS', 'CSS', 'IMG', 'Others', 'HTML'],
      values: [300, 200, 300, 0, 20],
    }}
    maxValue={1200}
  />
);

export const WithCustomColors = () => (
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
);

export const WithCustomLabel = () => (
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
);
