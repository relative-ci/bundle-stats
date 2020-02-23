import { METRIC_TYPE_DURATION } from '../config/metrics';

export const metrics = {
  firstPaint: {
    label: 'First Paint',
    type: METRIC_TYPE_DURATION,
  },
  fullyLoaded: {
    label: 'Fully Loaded',
    type: METRIC_TYPE_DURATION,
  },
  backEndTime: {
    label: 'BackEnd Time',
    type: METRIC_TYPE_DURATION,
  },
  domContentLoadedTime: {
    label: 'DOM Content Loaded Time',
    type: METRIC_TYPE_DURATION,
  },
  domInteractiveTime: {
    label: 'DOM Interactive Time',
    type: METRIC_TYPE_DURATION,
  },
  domainLookupTime: {
    label: 'Domain Lookup Time',
    type: METRIC_TYPE_DURATION,
  },
  frontEndTime: {
    label: 'FrontEnd Time',
    type: METRIC_TYPE_DURATION,
  },
  pageDownloadTime: {
    label: 'Page Download Time',
    type: METRIC_TYPE_DURATION,
  },
  pageLoadTime: {
    label: 'Page Load Time',
    type: METRIC_TYPE_DURATION,
  },
  redirectionTime: {
    label: 'Redirection Time',
    type: METRIC_TYPE_DURATION,
  },
  serverConnectionTime: {
    label: 'Server Connection Time',
    type: METRIC_TYPE_DURATION,
  },
  serverResponseTime: {
    label: 'Server Response Time',
    type: METRIC_TYPE_DURATION,
  },
  firstContentfulPaint: {
    label: 'First Contentful Paint',
    type: METRIC_TYPE_DURATION,
  },
  rumSpeedIndex: {
    label: 'RUM Speed Index',
    type: METRIC_TYPE_DURATION,
  },
  firstVisualChange: {
    label: 'First Visual Change',
    type: METRIC_TYPE_DURATION,
  },
  lastVisualChange: {
    label: 'Last Visual Change',
    type: METRIC_TYPE_DURATION,
  },
  perceptualSpeedIndex: {
    label: 'Perceptual SpeedIndex',
    type: METRIC_TYPE_DURATION,
  },
  speedIndex: {
    label: 'Speed Index',
    type: METRIC_TYPE_DURATION,
  },
  visualComplete85: {
    label: 'Visual Complete 85',
    type: METRIC_TYPE_DURATION,
  },
  visualComplete95: {
    label: 'Visual Complete 95',
    type: METRIC_TYPE_DURATION,
  },
  visualComplete99: {
    label: 'Visual Complete 99',
    type: METRIC_TYPE_DURATION,
  },
};
