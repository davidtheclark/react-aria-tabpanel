var React = require('react');

module.exports = React.createClass({
  displayName: 'AriaTabPanel-TabPanel',

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.func,
    ]).isRequired,
    tabId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    tag: React.PropTypes.string,
    active: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  contextTypes: {
    atpManager: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isActive: this.context.atpManager.memberStartsActive(this.props.tabId) || false,
    };
  },

  handleKeyDown: function(event) {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.context.atpManager.focusTab(this.props.tabId);
    }
  },

  updateActiveState(nextActiveState) {
    this.setState({ isActive: nextActiveState });
  },

  registerWithManager(el) {
    this.context.atpManager.registerTabPanel({
      node: el,
      update: this.updateActiveState,
      tabId: this.props.tabId,
    });
  },

  render: function() {
    const props = this.props;
    const isActive = (props.active === undefined) ? this.state.isActive || false : props.active;

    const kids = (function() {
      if (typeof props.children === 'function') {
        return props.children({ isActive: isActive });
      }
      if (!isActive) return false;
      return props.children;
    }());

    return React.createElement(props.tag, {
      className: props.className,
      id: this.context.atpManager.getTabPanelId(props.tabId),
      onKeyDown: this.handleKeyDown,
      role: 'tabpanel',
      style: props.style,
      'aria-hidden': !isActive,
      'aria-describedby': props.tabId,
      ref: this.registerWithManager,
    }, kids);
  },
});
