import React, { PropTypes } from 'react';
import Manager from './Manager';

export default class Wrapper extends React.Component {
  componentWillMount() {
    this.manager = new Manager({
      onChange: this.props.onChange,
      activeTabId: this.props.activeTabId,
    });
  }

  getChildContext() {
    return {
      atpManager: this.manager,
    };
  }

  render() {
    const { tag, id, className, style } = this.props;
    return React.createElement(tag, {
      id,
      className,
      style,
    }, this.props.children);
  }
}

Wrapper.childContextTypes = {
  atpManager: PropTypes.object.isRequired,
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  activeTabId: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  tag: PropTypes.string,
};

Wrapper.defaultProps = {
  tag: 'div',
};
