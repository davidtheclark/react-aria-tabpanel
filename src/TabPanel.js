import React, { PropTypes } from 'react';
import keys from './keys';

export default class TabPanel extends React.Component {
  componentWillMount() {
    const { tabId } = this.props;
    const { atpManager } = this.context;
    const managedIndex = atpManager.tabPanels.push({
      tabId,
      element: this,
    }) - 1;
    if (!atpManager.activeTabId && managedIndex === 0) {
      atpManager.activeTabId = tabId;
    }
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === keys.UP) {
      e.preventDefault();
      this.context.atpManager.moveFocusCurrent();
    }
  }

  render() {
    const props = this.props;
    const isActive = this.context.atpManager.activeTabId === props.tabId;

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
  className: PropTypes.string,
  tag: PropTypes.string,
};

TabPanel.defaultProps = {
  tag: 'div',
};

TabPanel.contextTypes = {
  atpManager: PropTypes.object.isRequired,
};
