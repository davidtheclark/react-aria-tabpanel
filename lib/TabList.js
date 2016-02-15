var React = require('react');

module.exports = React.createClass({
  displayName: 'AriaTabPanel-TabList',

  propTypes: {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    style: React.PropTypes.object,
    tag: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  render: function() {
    var props = this.props;

    return React.createElement(props.tag, {
      className: props.className,
      id: props.id,
      style: props.style,
      role: 'tablist',
    }, props.children);
  },
});
