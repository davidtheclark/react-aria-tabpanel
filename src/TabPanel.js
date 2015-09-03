import React, { PropTypes } from 'react';
import keys from './keys';

export default class TabPanel extends React.Component {
  componentWillMount() {
    const { manager, tabId } = this.props;
    const managedIndex = manager.tabPanels.push({
      tabId,
      element: this,
    }) - 1;
    if (!manager.activeTabId && managedIndex === 0) {
      manager.activeTabId = tabId;
    }
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === keys.UP) {
      e.preventDefault();
      this.props.manager.moveFocusCurrent();
    }
  }

  render() {
    const props = this.props;
    const isActive = props.manager.activeTabId === props.tabId;

    const kids = (function() {
      if (typeof props.children === 'function') return props.children({ isActive });
      if (!isActive) return false;
      return props.children;
    }());

    return React.createElement(props.tag, {
      className: props.className,
      id: props.tabId,
      onKeyDown: this.handleKeyDown.bind(this),
      role: 'tabpanel',
      'aria-hidden': !isActive,
    }, kids);
  }
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  tabId: PropTypes.string.isRequired,
  manager: PropTypes.object.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

TabPanel.defaultProps = {
  tag: 'div',
};
