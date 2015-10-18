'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var TabList = (function (_React$Component) {
  _inherits(TabList, _React$Component);

  function TabList() {
    _classCallCheck(this, TabList);

    _React$Component.apply(this, arguments);
  }

  TabList.prototype.render = function render() {
    var _props = this.props;
    var tag = _props.tag;
    var children = _props.children;
    var className = _props.className;
    var id = _props.id;
    var style = _props.style;

    return _react2['default'].createElement(tag, {
      className: className,
      id: id,
      style: style,
      role: 'tablist'
    }, children);
  };

  return TabList;
})(_react2['default'].Component);

exports['default'] = TabList;

TabList.propTypes = {
  children: _react.PropTypes.node.isRequired,
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  style: _react.PropTypes.object,
  tag: _react.PropTypes.string
};

TabList.defaultProps = {
  tag: 'div'
};
module.exports = exports['default'];