var React = require('react');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: React.PropTypes.node.isRequired,
  tag: React.PropTypes.string,
};

module.exports = React.createClass({
  displayName: 'AriaTabPanel-TabList',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  render: function() {
    var props = this.props;
    var elProps = {
      role: 'tablist',
    };
    specialAssign(elProps, props, checkedProps);
    return React.createElement(props.tag, elProps, props.children);
  },
});
