import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ArrowIcon from './assets/arrow.svg';
import BranchIcon from './assets/branch.svg';
import ClockIcon from './assets/clock.svg';
import CommitIcon from './assets/commit.svg';
import FilterIcon from './assets/filter.svg';
import HelpIcon from './assets/help.svg';
import PackageIcon from './assets/package.svg';
import PullRequestIcon from './assets/pull-request.svg';
import SortIcon from './assets/sort.svg';

import css from './icon.module.css';

const ICONS = {
  arrow: ArrowIcon,
  branch: BranchIcon,
  clock: ClockIcon,
  commit: CommitIcon,
  filter: FilterIcon,
  help: HelpIcon,
  package: PackageIcon,
  pr: PullRequestIcon,
  sort: SortIcon,
};

export const Icon = ({
  className,
  glyph,
  as: Component,
  ...restProps
}) => {
  const Svg = ICONS[glyph];

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
  glyph: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
};
