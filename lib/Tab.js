var React = require('react');

module.exports = React.createClass({
  displayName: 'AriaTabPanel-Tab',

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.func,
    ]).isRequired,
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    tag: React.PropTypes.string,
    index: React.PropTypes.number,
    active: React.PropTypes.bool,
    letterNavigationText: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  contextTypes: {
    atpManager: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isActive: this.context.atpManager.memberStartsActive(this.props.id) || false,
    };
  },

  handleFocus: function() {
    this.context.atpManager.handleTabFocus(this.props.id);
  },

  updateActiveState: function(nextActiveState) {
    this.setState({ isActive: nextActiveState });
  },

  registerWithManager: function(el) {
    if (this.isRegistered) return;
    this.isRegistered = true;
    this.context.atpManager.registerTab({
      id: this.props.id,
      node: el,
      update: this.updateActiveState,
      index: this.props.index,
      letterNavigationText: this.props.letterNavigationText,
    });
  },

  render: function() {
    var props = this.props;
    var isActive = (props.active === undefined) ? this.state.isActive : props.active;

    var kids = (function() {
      if (typeof props.children === 'function') {
        return props.children({ isActive: isActive });
      }
      return props.children;
    }());

    return React.createElement(props.tag, {
      className: props.className,
      id: props.id,
      style: props.style,
      tabIndex: (isActive) ? 0 : -1,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      role: 'tab',
      'aria-selected': isActive,
      'aria-controls': this.context.atpManager.getTabPanelId(props.id),
      ref: this.registerWithManager,
    }, kids);
  },
});
