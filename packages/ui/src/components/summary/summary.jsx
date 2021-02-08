import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import * as COMPONENT_LINKS from '../../component-links';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { ComponentLink } from '../component-link';
import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const METRICS = new Map([
  ['webpack.totalSizeByTypeALL', { link: COMPONENT_LINKS.TOTALS }],
  ['webpack.totalInitialSizeJS', { link: COMPONENT_LINKS.BUNDLE_ASSETS_INITIAL_JS }],
  ['webpack.totalInitialSizeCSS', { link: COMPONENT_LINKS.BUNDLE_ASSETS_INITIAL_CSS }],
  [
    'webpack.cacheInvalidation',
    {
      link: COMPONENT_LINKS.BUNDLE_ASSETS_CACHE_INVALIDATION,
      showDelta: false,
    },
  ],
]);

export const Summary = ({
  className,
  data,
  loading,
  showSummaryItemDelta,
  summaryItemLink: SummaryItemCustomLink,
}) => (
  <Box outline className={cx(css.root, className)}>
    <FlexStack className={css.items}>
      {Array.from(METRICS).map(([metricId, metricOptions]) =>(
        <SummaryItem
          as={({ className: itemClassName, ...itemProps }) => (
            <Box
              padding={['xsmall', 'small']}
              className={cx(itemClassName, css.summaryItemLink)}
              {...itemProps}
              as={SummaryItemCustomLink}
              {...metricOptions.link}
            />
          )}
          key={metricId}
          id={metricId}
          data={get(data, metricId)}
          loading={loading}
          showMetricDescription
          showDelta={showSummaryItemDelta && metricOptions.showDelta !== false}
          className={css.item}
        />
      ))}
    </FlexStack>
  </Box>
);

Summary.defaultProps = {
  className: '',
  data: null,
  loading: false,
  showSummaryItemDelta: true,
  summaryItemLink: ComponentLink,
};

Summary.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      baseline: PropTypes.number,
      current: PropTypes.number,
    }),
  }),
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  summaryItemLink: PropTypes.elementType,
};
