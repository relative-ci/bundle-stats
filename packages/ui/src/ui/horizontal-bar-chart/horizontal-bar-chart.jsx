import React from 'react';
import PropTypes from 'prop-types';
import { get, round, sum } from 'lodash';
import cx from 'classnames';

import { getColors } from '../../utils';
import { Tooltip } from '../tooltip';
import css from './horizontal-bar-chart.module.css';

class HorizontalBarChartItem extends React.Component {
  constructor(props) {
    super(props);

    this.textRef = React.createRef();
    this.ref = React.createRef();

    this.state = {
      isTextOverflowing: true,
    };
  }

  componentDidMount() {
    const wrapperWidth = get(this, 'ref.current.clientWidth', 0);
    const textWidth = get(this, 'textRef.current.scrollWidth', 0);

    if (wrapperWidth >= (textWidth + 2 * 4)) {
      this.setState({ isTextOverflowing: false });
    }
  }

  render() {
    const {
      color, label, getItemTooltip, width,
    } = this.props;
    const { isTextOverflowing } = this.state;
    const tooltipContent = getItemTooltip();

    return (
      <span
        className={cx(css.item, isTextOverflowing && css.textOverflowed)}
        style={{
          width,
          background: color,
        }}
        ref={this.ref}
      >
        <Tooltip
          className={css.itemContent}
          title={tooltipContent}
        >
          <span className={css.itemLabel} ref={this.textRef}>
            {label}
          </span>
        </Tooltip>
      </span>
    );
  }
}

HorizontalBarChartItem.propTypes = {
  width: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  getItemTooltip: PropTypes.func,
};

HorizontalBarChartItem.defaultProps = {
  getItemTooltip: () => null,
};

const getTotalValues = (values) => sum(values.map((entry) => {
  if (typeof entry === 'object') {
    return entry.value;
  }

  return entry;
}));

export const HorizontalBarChart = (props) => {
  const { className, data, maxValue } = props;
  const { labels, values } = data;

  const defaultColors = getColors(labels.length);
  const total = maxValue || getTotalValues(values);

  const entries = values.reduce((agg, entry, index) => {
    const {
      value,
      color = defaultColors[index],
      label = labels[index],
      getItemTooltip,
    } = typeof entry === 'object' ? entry : { value: entry };

    const width = `${round((value / total) * 100, 2)}%`;

    return [
      ...agg,
      {
        value,
        width,
        color,
        label,
        getItemTooltip,
      },
    ];
  }, []);

  return (
    <div className={cx(css.root, className)}>
      {entries.map(({
        color, getItemTooltip, label, width,
      }, index) => {
        const key = index;

        return (
          <HorizontalBarChartItem
            key={key}
            width={width}
            color={color}
            label={label}
            getItemTooltip={getItemTooltip}
            className={css.item}
          />
        );
      })}
    </div>
  );
};

HorizontalBarChart.defaultProps = {
  className: '',
  maxValue: null,
};

HorizontalBarChart.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Data */
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.number,
        color: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      }),
    ])),
  }).isRequired,

  /** Mac value */
  maxValue: PropTypes.number,
};
