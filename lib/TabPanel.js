var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  tabId: PropTypes.string.isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
  active: PropTypes.bool,
};

module.exports = createReactClass({
  displayName: 'AriaTabPanel-TabPanel',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div', role: 'tabpanel' };
  },

  contextTypes: {
    atpManager: PropTypes.object.isRequired,
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

  updateActiveState: function(nextActiveState) {
    this.setState({ isActive: nextActiveState });
  },

  registerWithManager: function(el) {
    if (this.isRegistered) return;
    this.isRegistered = true;
    this.context.atpManager.registerTabPanel({
      node: el,
      update: this.updateActiveState,
      tabId: this.props.tabId,
    });
  },

  render: function() {
    var props = this.props;
    var isActive = (props.active === undefined) ? this.state.isActive || false : props.active;

    var kids = (typeof props.children === 'function')
      ? props.children({ isActive: isActive })
      : props.children;

    var style = props.style || {};
    if (!isActive) {
      style.display = 'none';
    }

    var elProps = {
      className: props.className,
      id: this.context.atpManager.getTabPanelId(props.tabId),
      onKeyDown: this.handleKeyDown,
      role: props.role,
      style: style,
      'aria-hidden': !isActive,
      'aria-describedby': props.tabId,
      ref: this.registerWithManager,
    };
    specialAssign(elProps, props, checkedProps);

    return React.createElement(props.tag, elProps, kids);
  },
});
