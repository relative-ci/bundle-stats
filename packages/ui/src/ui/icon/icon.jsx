import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ArrowIcon from './assets/arrow.svg';
import BranchIcon from './assets/branch.svg';
import CancelIcon from './assets/cancel.svg';
import ClockIcon from './assets/clock.svg';
import CommitIcon from './assets/commit.svg';
import FilterIcon from './assets/filter.svg';
import HelpIcon from './assets/help.svg';
import PackageIcon from './assets/package.svg';
import PullRequestIcon from './assets/pull-request.svg';
import SortIcon from './assets/sort.svg';

import css from './icon.module.css';

export const ICONS = {
  ARROW: 'arrow',
  BRANCH: 'branch',
  CANCEL: 'cancel',
  CLOCK: 'clock',
  COMMIT: 'commit',
  FILTER: 'filter',
  HELP: 'help',
  PACKAGE: 'package',
  PR: 'pr',
  SORT: 'sort',
};

const ICON_MAP = {
  [ICONS.ARROW]: ArrowIcon,
  [ICONS.BRANCH]: BranchIcon,
  [ICONS.CANCEL]: CancelIcon,
  [ICONS.CLOCK]: ClockIcon,
  [ICONS.COMMIT]: CommitIcon,
  [ICONS.FILTER]: FilterIcon,
  [ICONS.HELP]: HelpIcon,
  [ICONS.PACKAGE]: PackageIcon,
  [ICONS.PR]: PullRequestIcon,
  [ICONS.SORT]: SortIcon,
};

export const Icon = ({ className, glyph, as: Component, ...restProps }) => {
  const Svg = typeof glyph === 'string' ? ICON_MAP[glyph] : glyph;

  return (
    <Component className={cx(css.root, className)} {...restProps}>
      <Svg className={css.icon} />
    </Component>
  );
};

Icon.defaultProps = {
  className: '',
  as: 'span',
};

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.oneOfType([PropTypes.oneOf(Object.values(ICONS)), PropTypes.node]).isRequired,
  as: PropTypes.node,
};
