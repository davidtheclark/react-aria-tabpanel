var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  letterNavigationText: PropTypes.string,
};

module.exports = createReactClass({
  displayName: 'AriaTabPanel-Tab',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div', role: 'tab' };
  },

  contextTypes: {
    atpManager: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isActive: this.context.atpManager.memberStartsActive(this.props.id) || false,
    };
  },

  handleFocus: function() {
    this.context.atpManager.handleTabFocus(this.props.id);
  },

  handleRef: function(el) {
    if (el) {
      this.elRef = el;
      this.registerWithManager(this.elRef);
    }
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
      active: (this.props.active === undefined) ? this.state.isActive : this.props.active,
    });
  },

  unregisterWithManager: function() {
    var props = this.props;
    this.context.atpManager.unregisterTab(props.id);
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

    var elProps = {
      id: props.id,
      tabIndex: (isActive) ? 0 : -1,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      role: props.role,
      'aria-selected': isActive,
      'aria-controls': this.context.atpManager.getTabPanelId(props.id),
      ref: this.handleRef,
    };
    specialAssign(elProps, props, checkedProps);

    return React.createElement(props.tag, elProps, kids);
  },

  componentWillUnmount: function() {
    this.unregisterWithManager();
  },
});
