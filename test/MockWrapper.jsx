import React from 'react';

export default class MockWrapper extends React.Component {
  getChildContext() {
    this.manager = this.props.mockManager;
    return {
      atpManager: this.props.mockManager,
    };
  }

  render() {
    return React.DOM.div(null, this.props.children);
  }
}

MockWrapper.childContextTypes = {
  atpManager: React.PropTypes.object.isRequired,
};

MockWrapper.proptypes = {
  mockManager: React.PropTypes.object.isRequired,
};
