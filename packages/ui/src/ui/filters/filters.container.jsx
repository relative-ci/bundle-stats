import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

const getInitialValues = (key, filters) => {
  if (typeof filters?.defaultValue !== 'undefined') {
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

export const filtersDropdownContainer = (BaseComponent) => {
  class FiltersContainer extends React.Component {
    constructor(props) {
      super(props);

      const { filters } = this.props;

      this.state = {
        values: getInitialValues('', filters),
      };
    }

    static getDerivedStateFromProps({ filters }, state) {
      if (isEqual(filters, state.values)) {
        return null;
      }

      return { values: getInitialValues('', filters) };
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

    render() {
      return (
        <BaseComponent
          {...this.props}
          {...this.state}
          toggleFilter={this.toggleFilter}
        />
      );
    }
  }

  FiltersContainer.defaultProps = {
    onChange: null,
  };

  FiltersContainer.propTypes = {
    /** Filter config */
    filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    /** OnChange handler */
    onChange: PropTypes.func,
  };

  return FiltersContainer;
};
