import React, { PropTypes } from 'react';

export default class Tab extends React.Component {
  componentDidMount() {
    const props = this.props;
    this.managedIndex = props.manager.tabs.push({
      node: React.findDOMNode(this),
      tabId: props.tabId,
    }) - 1;
  }

  handleClick() {
    this.props.manager.changeTab(this.props.tabId);
  }

  render() {
    const { tag, children, className, id } = this.props;

    return React.createElement(tag, {
      className,
      id,
      tabIndex: '-1',
      onClick: this.handleClick.bind(this),
    }, children);
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.function,
    PropTypes.string,
  ]).isRequired,
  tabId: PropTypes.string.isRequired,
  manager: PropTypes.object.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.string,
};

Tab.defaultProps = {
  tag: 'div',
};
