import { MetricTypes } from '../constants';

export const metrics = {
  firstPaint: {
    label: 'First Paint',
    type: MetricTypes.Duration,
  },
  fullyLoaded: {
    label: 'Fully Loaded',
    type: MetricTypes.Duration,
  },
  backEndTime: {
    label: 'BackEnd Time',
    type: MetricTypes.Duration,
  },
  domContentLoadedTime: {
    label: 'DOM Content Loaded Time',
    type: MetricTypes.Duration,
  },
  domInteractiveTime: {
    label: 'DOM Interactive Time',
    type: MetricTypes.Duration,
  },
  domainLookupTime: {
    label: 'Domain Lookup Time',
    type: MetricTypes.Duration,
  },
  frontEndTime: {
    label: 'FrontEnd Time',
    type: MetricTypes.Duration,
  },
  pageDownloadTime: {
    label: 'Page Download Time',
    type: MetricTypes.Duration,
  },
  pageLoadTime: {
    label: 'Page Load Time',
    type: MetricTypes.Duration,
  },
  redirectionTime: {
    label: 'Redirection Time',
    type: MetricTypes.Duration,
  },
  serverConnectionTime: {
    label: 'Server Connection Time',
    type: MetricTypes.Duration,
  },
  serverResponseTime: {
    label: 'Server Response Time',
    type: MetricTypes.Duration,
  },
  firstContentfulPaint: {
    label: 'First Contentful Paint',
    type: MetricTypes.Duration,
  },
  rumSpeedIndex: {
    label: 'RUM Speed Index',
    type: MetricTypes.Duration,
  },
  firstVisualChange: {
    label: 'First Visual Change',
    type: MetricTypes.Duration,
  },
  lastVisualChange: {
    label: 'Last Visual Change',
    type: MetricTypes.Duration,
  },
  perceptualSpeedIndex: {
    label: 'Perceptual SpeedIndex',
    type: MetricTypes.Duration,
  },
  speedIndex: {
    label: 'Speed Index',
    type: MetricTypes.Duration,
  },
  visualComplete85: {
    label: 'Visual Complete 85',
    type: MetricTypes.Duration,
  },
  visualComplete95: {
    label: 'Visual Complete 95',
    type: MetricTypes.Duration,
  },
  visualComplete99: {
    label: 'Visual Complete 99',
    type: MetricTypes.Duration,
  },
};
