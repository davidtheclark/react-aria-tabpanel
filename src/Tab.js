import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import keys from './keys';

export default class Tab extends React.Component {
  componentWillMount() {
    const { tabId } = this.props;
    const { atpManager } = this.context;
    this.managedIndex = atpManager.tabs.push({
      tabId,
      element: this,
    }) - 1;
    if (!atpManager.activeTabId && this.managedIndex === 0) {
      atpManager.activeTabId = tabId;
    } else if (atpManager.activeTabId === tabId) {
      atpManager.currentTabIndex = this.managedIndex;
    }
  }

  componentDidMount() {
    const { atpManager } = this.context;
    atpManager.tabs[this.managedIndex].node = ReactDOM.findDOMNode(this);
  }

  handleClick() {
    const { atpManager } = this.context;
    atpManager.changeTab(this.managedIndex);
  }

  handleKeyDown(e) {
    const { atpManager } = this.context;
    switch (e.key) {
      case keys.LEFT:
      case keys.UP:
        e.preventDefault();
        atpManager.changePrev();
        break;
      case keys.RIGHT:
      case keys.DOWN:
        e.preventDefault();
        atpManager.changeNext();
        break;
      default:
    }
  }

  render() {
    const props = this.props;
    const isActive = this.context.atpManager.activeTabId === props.tabId;

    const kids = (function() {
      if (typeof props.children === 'function') return props.children({ isActive });
      return props.children;
    }());

    return React.createElement(props.tag, {
      className: props.className,
      id: props.id,
      style: props.style,
      tabIndex: (isActive) ? '0' : '-1',
      onClick: this.handleClick.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      role: 'tab',
      'aria-selected': isActive,
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
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  tag: PropTypes.string,
};

Tab.defaultProps = {
  tag: 'div',
};

Tab.contextTypes = {
  atpManager: PropTypes.object.isRequired,
};
