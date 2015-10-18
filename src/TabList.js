import React, { PropTypes } from 'react';

export default class TabList extends React.Component {
  render() {
    const { tag, children, className, id, style } = this.props;

    return React.createElement(tag, {
      className,
      id,
      style,
      role: 'tablist',
    }, children);
  }
}

TabList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  tag: PropTypes.string,
};

TabList.defaultProps = {
  tag: 'div',
};
