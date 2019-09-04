/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

const getInitialValues = (key, filters) => {
  if (typeof filters.defaultValue !== 'undefined') {
    return {
      [key]: filters.defaultValue,
    };
  }

  if (typeof filters === 'object') {
    return Object.entries(filters).map(([groupKey, groupFilters]) => getInitialValues(
      [...key ? [key] : [], groupKey].join('.'),
      groupFilters,
    )).reduce((agg, current) => ({
      ...agg,
      ...current,
    }), {});
  }

  return {};
};

export const tableFiltersContainer = (BaseComponent) => class TableFiltersContainer extends React.Component {
  static defaultProps = {
    onChange: null,
  }

  static propTypes = {
    /** Filter config */
    filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    /** OnChange handler */
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { filters } = this.props;

    this.state = {
      values: getInitialValues('', filters),
      open: false,
    };
  }

  toggleFilter = (key, value) => this.setState(({ values, ...state }) => {
    const newState = {
      ...state,
      values: {
        ...values,
        [key]: value,
      },
    };

    const { onChange } = this.props;

    if (onChange) {
      onChange(newState.values);
    }

    return newState;
  })

  dropdownToggle = () => this.setState(({ open }) => ({
    open: !open,
  }))

  dropdownClose = () => this.setState({ open: false })

  render() {
    // Disable outsideClickHandler when not running in a browser
    const disableOutsideClickHandler = typeof document === 'undefined';

    return (
      <OutsideClickHandler
        onOutsideClick={this.dropdownClose}
        disabled={disableOutsideClickHandler}
      >
        <BaseComponent
          {...this.props}
          {...this.state}
          toggleFilter={this.toggleFilter}
          dropdownToggle={this.dropdownToggle}
        />
      </OutsideClickHandler>
    );
  }
};
