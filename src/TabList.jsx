import React, { PropTypes } from 'react';

export default class TabList extends React.Component {
  render() {
    const { tag, children, className, id } = this.props;

    return React.createElement(tag, {
      className,
      id,
    }, children);
  }
}

TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
  manager: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.string,
};

TabList.defaultProps = {
  tag: 'div',
};
