import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

export const dropdownContainer = (BaseComponent) => {
  class DropdownContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
      };
    }

    dropdownToggle = () =>
      this.setState(({ open }) => ({
        open: !open,
      }));

    dropdownClose = () => this.setState({ open: false });

    render() {
      // Disable outsideClickHandler when not running in a browser
      const disableOutsideClickHandler = typeof document === 'undefined';

      return (
        <OutsideClickHandler
          onOutsideClick={this.dropdownClose}
          disabled={disableOutsideClickHandler}
        >
          <BaseComponent {...this.props} {...this.state} dropdownToggle={this.dropdownToggle} />
        </OutsideClickHandler>
      );
    }
  }

  return DropdownContainer;
};
