(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ariaTabPanel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = (function () {
  function Manager() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Manager);

    this.options = options;

    // These component references are added when the relevant components mount
    this.tabs = [];
    this.tabPanels = [];
    this.tabList = null;

    // State trackers
    this.currentTabIndex = 0;
    this.activeTabId = options.activeTabId || false;
  }

  Manager.prototype.changeTab = function changeTab(tabIndex) {
    var newActiveTabId = this.tabs[tabIndex].tabId;

    if (this.options.onChange) {
      this.options.onChange(newActiveTabId);
    } else {
      if (newActiveTabId === this.activeTabId) return;
      this.tabPanels.forEach(function (tabPanel) {
        tabPanel.element.forceUpdate();
      });
      this.tabs.forEach(function (tab) {
        tab.element.forceUpdate();
      });
    }

    this.moveFocus(tabIndex);
    this.currentTabIndex = tabIndex;
    this.activeTabId = newActiveTabId;
  };

  Manager.prototype.changePrev = function changePrev() {
    var tabs = this.tabs;
    var currentTabIndex = this.currentTabIndex;

    var prev = currentTabIndex === -1 || currentTabIndex === 0 ? tabs.length - 1 : currentTabIndex - 1;
    this.changeTab(prev);
  };

  Manager.prototype.changeNext = function changeNext() {
    var tabs = this.tabs;
    var currentTabIndex = this.currentTabIndex;

    var next = currentTabIndex === -1 || currentTabIndex === tabs.length - 1 ? 0 : currentTabIndex + 1;
    this.changeTab(next);
  };

  Manager.prototype.moveFocus = function moveFocus(tabIndex) {
    this.tabs[tabIndex].node.focus();
  };

  Manager.prototype.moveFocusCurrent = function moveFocusCurrent() {
    this.moveFocus(this.currentTabIndex);
  };

  return Manager;
})();

exports["default"] = Manager;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _keys = require(6);

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

},{"6":6,"react":"react"}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

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

    return _react2['default'].createElement(tag, {
      className: className,
      id: id,
      role: 'tablist'
    }, children);
  };

  return TabList;
})(_react2['default'].Component);

exports['default'] = TabList;

TabList.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)]).isRequired,
  manager: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  tag: _react.PropTypes.string
};

TabList.defaultProps = {
  tag: 'div'
};
module.exports = exports['default'];

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _keys = require(6);

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

},{"6":6,"react":"react"}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Manager = require(1);

var _Manager2 = _interopRequireDefault(_Manager);

var _Tab = require(2);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require(4);

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

},{"1":1,"2":2,"3":3,"4":4,"react":"react"}],6:[function(require,module,exports){
// Look here
// https://github.com/facebook/react/blob/0.13-stable/src/browser/ui/dom/getEventKey.js

'use strict';

exports.__esModule = true;
exports['default'] = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight'
};
module.exports = exports['default'];

},{}]},{},[5])(5)
});