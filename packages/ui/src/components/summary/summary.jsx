import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { SECTIONS } from '../../constants';
import * as COMPONENT_LINKS from '../../component-links';
import { ComponentLink } from '../component-link';
import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const PRIMARY_METRICS = new Map([
  ['webpack.totalSizeByTypeALL', { link: COMPONENT_LINKS.TOTALS }],
  ['webpack.totalInitialSizeJS', { link: COMPONENT_LINKS.BUNDLE_ASSETS_INITIAL_JS }],
  ['webpack.totalInitialSizeCSS', { link: COMPONENT_LINKS.BUNDLE_ASSETS_INITIAL_CSS }],
  ['webpack.cacheInvalidation', {
    link: COMPONENT_LINKS.BUNDLE_ASSETS_CACHE_INVALIDATION,
    showDelta: false,
  }],
]);

const SECONDARY_METRICS = new Map([
  ['webpack.assetCount', { link: COMPONENT_LINKS.BUNDLE_ASSETS_COUNT }],
  ['webpack.chunkCount', { link: COMPONENT_LINKS.BUNDLE_ASSETS_CHUNK_COUNT }],
  ['webpack.moduleCount', { link: COMPONENT_LINKS.BUNDLE_MODULES }],
  ['webpack.packageCount', { link: COMPONENT_LINKS.BUNLDE_PACKAGES_COUNT }],
  ['webpack.duplicatePackagesCount', { link: COMPONENT_LINKS.BUNDLE_PACKAGES_DUPLICATE }],
]);

const SummaryItemWrapper = ({ as: CustomLink, keyProps, className, ...props }) => {
  const { link } = keyProps;

  if (!link) {
    return null;
  }

  const { section, title, params } = link;

  return (
    <CustomLink
      className={cx(className, css.summaryItemLink)}
      section={section}
      title={title}
      params={params}
      {...props}
    />
  );
};

SummaryItemWrapper.propTypes = {
  as: PropTypes.elementType,
  keyProps: PropTypes.shape({
    link: PropTypes.shape({
      section: PropTypes.oneOf(Object.values(SECTIONS)),
      title: PropTypes.string,
      params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  }).isRequired,
  className: PropTypes.string,
};

SummaryItemWrapper.defaultProps = {
  className: '',
  as: ComponentLink,
};

export const Summary = ({
  className,
  data,
  loading,
  showSummaryItemDelta,
  summaryItemLink: SummaryItemCustomLink,
}) => {
  const getRenderSummaryItem = (sectionProps) => ([key, keyProps]) => (
    <SummaryItem
      as={(wrapperProps) => (
        <SummaryItemWrapper as={SummaryItemCustomLink} {...wrapperProps} keyProps={keyProps} />
      )}
      key={key}
      id={key}
      data={get(data, key)}
      loading={loading}
      showMetricDescription
      showDelta={showSummaryItemDelta}
      className={css.item}
      {...keyProps}
      {...sectionProps}
    />
  );

  return (
    <div className={cx(css.root, className)}>
      <div className={css.primary}>{Array.from(PRIMARY_METRICS).map(getRenderSummaryItem())}</div>
      <div className={css.secondary}>
        {Array.from(SECONDARY_METRICS).map(getRenderSummaryItem({ inline: true }))}
      </div>
    </div>
  );
};

Summary.defaultProps = {
  className: '',
  data: null,
  loading: false,
  showSummaryItemDelta: true,
  summaryItemLink: undefined,
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
