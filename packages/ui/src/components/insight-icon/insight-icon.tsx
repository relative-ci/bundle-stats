import React from 'react';
import cx from 'classnames';
import { InsightType } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
// @ts-ignore
import css from './insight-icon.module.css';

const InsightTypeIconMap = new Map([
  [InsightType.ERROR, Icon.ICONS.ERROR],
  [InsightType.WARNING, Icon.ICONS.WARNING],
  [InsightType.INFO, Icon.ICONS.INFO],
]);

interface InsightIconProps extends React.HTMLAttributes<'span'> {
  type: InsightType;
}

export const InsightIcon = (props: InsightIconProps) => {
  const { className, type } = props;
  const resolvedType = Object.values(InsightType).includes(type) ? type : InsightType.WARNING;
  const rootClassName = cx(css.root, css[resolvedType], className);
  const glyph = InsightTypeIconMap.get(resolvedType) as string;

  return <Icon glyph={glyph} className={rootClassName} />;
};

