var React = require('react');
var createManager = require('./createManager');

module.exports = React.createClass({
  displayName: 'AriaTabPanel-Wrapper',

  propTypes: {
    children: React.PropTypes.node.isRequired,
    activeTabId: React.PropTypes.string,
    letterNavigation: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    tag: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  childContextTypes: {
    atpManager: React.PropTypes.object.isRequired,
  },

  getChildContext: function() {
    return { atpManager: this.manager };
  },

  componentWillMount: function() {
    this.manager = createManager({
      onChange: this.props.onChange,
      activeTabId: this.props.activeTabId,
      letterNavigation: this.props.letterNavigation,
    });
  },

  componentWillUnmount: function() {
    this.manager.destroy();
  },

  render: function() {
    var props = this.props;
    return React.createElement(props.tag, {
      id: props.id,
      className: props.className,
      style: props.style,
    }, props.children);
  },
});
