(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AriaTabPanel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _keys = require(6);

var _keys2 = _interopRequireDefault(_keys);

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    _React$Component.apply(this, arguments);
  }

  Tab.prototype.componentWillMount = function componentWillMount() {
    var tabId = this.props.tabId;
    var atpManager = this.context.atpManager;

    this.managedIndex = atpManager.tabs.push({
      tabId: tabId,
      element: this
    }) - 1;
    if (!atpManager.activeTabId && this.managedIndex === 0) {
      atpManager.activeTabId = tabId;
    } else if (atpManager.activeTabId === tabId) {
      atpManager.currentTabIndex = this.managedIndex;
    }
  };

  Tab.prototype.componentDidMount = function componentDidMount() {
    var atpManager = this.context.atpManager;

    atpManager.tabs[this.managedIndex].node = _reactDom2['default'].findDOMNode(this);
  };

  Tab.prototype.handleClick = function handleClick() {
    var atpManager = this.context.atpManager;

    atpManager.changeTab(this.managedIndex);
  };

  Tab.prototype.handleKeyDown = function handleKeyDown(e) {
    var atpManager = this.context.atpManager;

    switch (e.key) {
      case _keys2['default'].LEFT:
      case _keys2['default'].UP:
        e.preventDefault();
        atpManager.changePrev();
        break;
      case _keys2['default'].RIGHT:
      case _keys2['default'].DOWN:
        e.preventDefault();
        atpManager.changeNext();
        break;
      default:
    }
  };

  Tab.prototype.render = function render() {
    var props = this.props;
    var isActive = this.context.atpManager.activeTabId === props.tabId;

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
  children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
  tabId: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  tag: _react.PropTypes.string
};

Tab.defaultProps = {
  tag: 'div'
};

Tab.contextTypes = {
  atpManager: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];

},{"6":6,"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  children: _react.PropTypes.node.isRequired,
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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var tabId = this.props.tabId;
    var atpManager = this.context.atpManager;

    var managedIndex = atpManager.tabPanels.push({
      tabId: tabId,
      element: this
    }) - 1;
    if (!atpManager.activeTabId && managedIndex === 0) {
      atpManager.activeTabId = tabId;
    }
  };

  TabPanel.prototype.handleKeyDown = function handleKeyDown(e) {
    if (e.ctrlKey && e.key === _keys2['default'].UP) {
      e.preventDefault();
      this.context.atpManager.moveFocusCurrent();
    }
  };

  TabPanel.prototype.render = function render() {
    var props = this.props;
    var isActive = this.context.atpManager.activeTabId === props.tabId;

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
  children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
  tabId: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  tag: _react.PropTypes.string
};

TabPanel.defaultProps = {
  tag: 'div'
};

TabPanel.contextTypes = {
  atpManager: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];

},{"6":6,"react":"react"}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Manager = require(1);

var _Manager2 = _interopRequireDefault(_Manager);

var Wrapper = (function (_React$Component) {
  _inherits(Wrapper, _React$Component);

  function Wrapper() {
    _classCallCheck(this, Wrapper);

    _React$Component.apply(this, arguments);
  }

  Wrapper.prototype.componentWillMount = function componentWillMount() {
    this.manager = new _Manager2['default']({
      onChange: this.props.onChange,
      activeTabId: this.props.activeTabId
    });
  };

  Wrapper.prototype.getChildContext = function getChildContext() {
    return {
      atpManager: this.manager
    };
  };

  Wrapper.prototype.render = function render() {
    var _props = this.props;
    var tag = _props.tag;
    var id = _props.id;
    var className = _props.className;
    var style = _props.style;

    return _react2['default'].createElement(tag, {
      id: id,
      className: className,
      style: style
    }, this.props.children);
  };

  return Wrapper;
})(_react2['default'].Component);

exports['default'] = Wrapper;

Wrapper.childContextTypes = {
  atpManager: _react.PropTypes.object.isRequired
};

Wrapper.propTypes = {
  children: _react.PropTypes.node.isRequired,
  activeTabId: _react.PropTypes.string,
  id: _react.PropTypes.string,
  className: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  style: _react.PropTypes.object,
  tag: _react.PropTypes.string
};

Wrapper.defaultProps = {
  tag: 'div'
};
module.exports = exports['default'];

},{"1":1,"react":"react"}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Tab = require(2);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require(4);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _Wrapper = require(5);

var _Wrapper2 = _interopRequireDefault(_Wrapper);

exports['default'] = {
  Tab: _Tab2['default'],
  TabList: _TabList2['default'],
  TabPanel: _TabPanel2['default'],
  Wrapper: _Wrapper2['default']
};
module.exports = exports['default'];

},{"2":2,"3":3,"4":4,"5":5}]},{},[7])(7)
});