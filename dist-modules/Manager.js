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