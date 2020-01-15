import { get } from 'lodash';

import * as T from './text';

export * from './baseline';
export * from './create-artifacts';
export * from './constants';

export const TEXT = T;

export const getReportInfo = (report) => get(report, 'insights.webpack.assetsSizeTotal.data.text');
