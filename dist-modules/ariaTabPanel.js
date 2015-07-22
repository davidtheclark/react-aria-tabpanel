'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Manager = require('./Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('./TabList');

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require('./TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

exports['default'] = function (options) {
  var manager = new _Manager2['default'](options);
  return {
    Tab: (function (_React$Component) {
      _inherits(TabWrapper, _React$Component);

      function TabWrapper() {
        _classCallCheck(this, TabWrapper);

        _React$Component.apply(this, arguments);
      }

      TabWrapper.prototype.render = function render() {
        return _react2['default'].createElement(_Tab2['default'], _extends({ manager: manager }, this.props));
      };

      return TabWrapper;
    })(_react2['default'].Component),
    TabList: (function (_React$Component2) {
      _inherits(TabListWrapper, _React$Component2);

      function TabListWrapper() {
        _classCallCheck(this, TabListWrapper);

        _React$Component2.apply(this, arguments);
      }

      TabListWrapper.prototype.render = function render() {
        return _react2['default'].createElement(_TabList2['default'], _extends({ manager: manager }, this.props));
      };

      return TabListWrapper;
    })(_react2['default'].Component),
    TabPanel: (function (_React$Component3) {
      _inherits(TabPanelWrapper, _React$Component3);

      function TabPanelWrapper() {
        _classCallCheck(this, TabPanelWrapper);

        _React$Component3.apply(this, arguments);
      }

      TabPanelWrapper.prototype.render = function render() {
        return _react2['default'].createElement(_TabPanel2['default'], _extends({ manager: manager }, this.props));
      };

      return TabPanelWrapper;
    })(_react2['default'].Component)
  };
};

module.exports = exports['default'];