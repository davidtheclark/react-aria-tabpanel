var createFocusGroup = require('focus-group');

function Manager(options) {
  this.options = options;

  var focusGroupOptions = {
    wrap: true,
    forwardArrows: ['down', 'right'],
    backArrows: ['up', 'left'],
    stringSearch: options.letterNavigation,
  };

  this.focusGroup = createFocusGroup(focusGroupOptions);

  // These component references are added when the relevant components mount
  this.tabs = [];
  this.tabPanels = [];

  this.activeTabId = options.activeTabId;
}

Manager.prototype.activate = function() {
  this.focusGroup.activate();
};

Manager.prototype.memberStartsActive = function(tabId) {
  if (this.activeTabId === tabId) {
    return true;
  }

  if (this.activeTabId === undefined) {
    this.activeTabId = tabId;
    return true;
  }

  return false;
};

Manager.prototype.registerTab = function(tabMember) {
  if (tabMember.index === undefined) {
    this.tabs.push(tabMember);
  } else {
    this.tabs.splice(tabMember.index, 0, tabMember);
  }

  var focusGroupMember = (tabMember.letterNavigationText) ? {
    node: tabMember.node,
    text: tabMember.letterNavigationText,
  } : tabMember.node;

  this.focusGroup.addMember(focusGroupMember, tabMember.index);

  this.activateTab(this.activeTabId || tabMember.id);
};

Manager.prototype.registerTabPanel = function(tabPanelMember) {
  this.tabPanels.push(tabPanelMember);
  this.activateTab(this.activeTabId);

  this.activateTab(this.activeTabId || tabPanelMember.tabId);
};

Manager.prototype.activateTab = function(nextActiveTabId) {
  if (nextActiveTabId === this.activeTabId) return;
  this.activeTabId = nextActiveTabId;

  if (this.options.onChange) {
    this.options.onChange(nextActiveTabId);
    return;
  }

  this.tabPanels.forEach(function(tabPanelMember) {
    tabPanelMember.update(nextActiveTabId === tabPanelMember.tabId);
  });
  this.tabs.forEach(function(tabMember) {
    tabMember.update(nextActiveTabId === tabMember.id);
  });
}

Manager.prototype.handleTabFocus = function(focusedTabId) {
  this.activateTab(focusedTabId);
};

Manager.prototype.focusTab = function(tabId) {
  var tabMemberToFocus = this.tabs.find(function(tabMember) {
    return tabMember.id === tabId;
  });
  if (!tabMemberToFocus) return;
  tabMemberToFocus.node.focus();
};

Manager.prototype.destroy = function() {
  this.focusGroup.deactivate();
};

Manager.prototype.getTabPanelId = function(tabId) {
  return tabId + '-panel';
};

module.exports = function(options) {
  return new Manager(options);
};
