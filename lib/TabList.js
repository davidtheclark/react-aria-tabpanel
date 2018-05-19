var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
};

module.exports = createReactClass({
  displayName: 'AriaTabPanel-TabList',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div', role: 'tablist' };
  },

  render: function() {
    var props = this.props;
    var elProps = {
      role: props.role,
    };
    specialAssign(elProps, props, checkedProps);
    return React.createElement(props.tag, elProps, props.children);
  },
});
