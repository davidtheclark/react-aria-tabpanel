'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var TabPanel = (function (_React$Component) {
  _inherits(TabPanel, _React$Component);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    _React$Component.apply(this, arguments);
  }

  TabPanel.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var manager = _props.manager;
    var tabId = _props.tabId;

    var managedIndex = manager.tabPanels.push({
      tabId: tabId,
      element: this
    }) - 1;
    if (!manager.activeTabId && managedIndex === 0) {
      manager.activeTabId = tabId;
    }
  };

  TabPanel.prototype.handleKeyDown = function handleKeyDown(e) {
    if (e.ctrlKey && e.key === _keys2['default'].UP) {
      e.preventDefault();
      this.props.manager.moveFocusCurrent();
    }
  };

  TabPanel.prototype.render = function render() {
    var props = this.props;
    var isActive = props.manager.activeTabId === props.tabId;

    var kids = (function () {
      if (typeof props.children === 'function') return props.children({ isActive: isActive });
      if (!isActive) return false;
      return props.children;
    })();

    return _react2['default'].createElement(props.tag, {
      className: props.className,
      id: props.tabId,
      onKeyDown: this.handleKeyDown.bind(this),
      role: 'tabpanel',
      'aria-hidden': !isActive
    }, kids);
  };

  return TabPanel;
})(_react2['default'].Component);

exports['default'] = TabPanel;

TabPanel.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes['function'], _react.PropTypes.string]).isRequired,
  tabId: _react.PropTypes.string.isRequired,
  manager: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string,
  tag: _react.PropTypes.string
};

TabPanel.defaultProps = {
  tag: 'div'
};
module.exports = exports['default'];