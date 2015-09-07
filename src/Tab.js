import React, { PropTypes } from 'react';
import keys from './keys';

export default class Tab extends React.Component {
  componentWillMount() {
    const { manager, tabId } = this.props;
    this.managedIndex = manager.tabs.push({
      tabId,
      element: this,
    }) - 1;
    if (!manager.activeTabId && this.managedIndex === 0) {
      manager.activeTabId = tabId;
    } else if (manager.activeTabId === tabId) {
      manager.currentTabIndex = this.managedIndex;
    }
  }

  componentDidMount() {
    const { manager } = this.props;
    manager.tabs[this.managedIndex].node = React.findDOMNode(this);
  }

  handleClick() {
    const { manager } = this.props;
    manager.changeTab(this.managedIndex);
  }

  handleKeyDown(e) {
    const { manager } = this.props;
    switch (e.key) {
      case keys.LEFT:
      case keys.UP:
        e.preventDefault();
        manager.changePrev();
        break;
      case keys.RIGHT:
      case keys.DOWN:
        e.preventDefault();
        manager.changeNext();
        break;
      default:
    }
  }

  render() {
    const props = this.props;
    const isActive = props.manager.activeTabId === props.tabId;

    const kids = (function() {
      if (typeof props.children === 'function') return props.children({ isActive });
      return props.children;
    }());

    return React.createElement(props.tag, {
      className: props.className,
      id: props.id,
      tabIndex: (isActive) ? '0' : '-1',
      onClick: this.handleClick.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      role: 'tab',
      'aria-controls': props.tabId,
    }, kids);
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
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
