var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var createManager = require('./createManager');
var specialAssign = require('./specialAssign');

var checkedProps = {
  children: PropTypes.node.isRequired,
  activeTabId: PropTypes.string,
  letterNavigation: PropTypes.bool,
  onChange: PropTypes.func,
  tag: PropTypes.string,
};

module.exports = createReactClass({
  displayName: 'AriaTabPanel-Wrapper',

  propTypes: checkedProps,

  getDefaultProps: function() {
    return { tag: 'div' };
  },

  childContextTypes: {
    atpManager: PropTypes.object.isRequired,
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

  componentDidMount: function() {
    this.manager.activate();
  },

  componentDidUpdate: function(prevProps) {
    var updateActiveTab = (prevProps.activeTabId === this.manager.activeTabId) && (prevProps.activeTabId !== this.props.activeTabId);
    
    if (updateActiveTab) {
      this.manager.activateTab(this.props.activeTabId);
    }
  },

  render: function() {
    var props = this.props;
    var elProps = {};
    specialAssign(elProps, props, checkedProps);
    return React.createElement(props.tag, elProps, props.children);
  },
});
