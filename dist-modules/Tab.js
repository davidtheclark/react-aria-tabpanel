'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    _React$Component.apply(this, arguments);
  }

  Tab.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var manager = _props.manager;
    var tabId = _props.tabId;

    this.managedIndex = manager.tabs.push({
      tabId: tabId,
      element: this
    }) - 1;
    if (!manager.activeTabId && this.managedIndex === 0) {
      manager.activeTabId = tabId;
    } else if (manager.activeTabId === tabId) {
      manager.currentTabIndex = this.managedIndex;
    }
  };

  Tab.prototype.componentDidMount = function componentDidMount() {
    var manager = this.props.manager;

    manager.tabs[this.managedIndex].node = _react2['default'].findDOMNode(this);
  };

  Tab.prototype.handleClick = function handleClick() {
    var manager = this.props.manager;

    manager.changeTab(this.managedIndex);
  };

  Tab.prototype.handleKeyDown = function handleKeyDown(e) {
    var manager = this.props.manager;

    switch (e.key) {
      case _keys2['default'].LEFT:
      case _keys2['default'].UP:
        e.preventDefault();
        manager.changePrev();
        break;
      case _keys2['default'].RIGHT:
      case _keys2['default'].DOWN:
        e.preventDefault();
        manager.changeNext();
        break;
      default:
    }
  };

  Tab.prototype.render = function render() {
    var props = this.props;
    var isActive = props.manager.activeTabId === props.tabId;

    var kids = (function () {
      if (typeof props.children === 'function') return props.children({ isActive: isActive });
      return props.children;
    })();

    return _react2['default'].createElement(props.tag, {
      className: props.className,
      id: props.id,
      tabIndex: isActive ? '0' : '-1',
      onClick: this.handleClick.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      role: 'tab',
      'aria-controls': props.tabId
    }, kids);
  };

  return Tab;
})(_react2['default'].Component);

exports['default'] = Tab;

Tab.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.func, _react.PropTypes.string]).isRequired,
  tabId: _react.PropTypes.string.isRequired,
  manager: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  tag: _react.PropTypes.string
};

Tab.defaultProps = {
  tag: 'div'
};
module.exports = exports['default'];