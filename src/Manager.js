export default class Manager {
  constructor(options={}) {
    this.options = options;

    // These component references are added when the relevant components mount
    this.tabs = [];
    this.tabPanels = [];
    this.tabList = null;

    // State trackers
    this.currentTabIndex = 0;
    this.activeTabId = options.activeTabId || false;
  }

  changeTab(tabIndex) {
    const newActiveTabId = this.tabs[tabIndex].tabId;

    if (this.options.handleChange) {
      this.options.handleChange(newActiveTabId);
    } else {
      if (newActiveTabId === this.activeTabId) return;
      this.tabPanels.forEach(tabPanel => { tabPanel.element.forceUpdate(); });
      this.tabs.forEach(tab => { tab.element.forceUpdate(); });
    }

    this.moveFocus(tabIndex);
    this.currentTabIndex = tabIndex;
    this.activeTabId = newActiveTabId;
  }

  changePrev() {
    const { tabs, currentTabIndex } = this;
    const prev = (currentTabIndex === -1 || currentTabIndex === 0)
      ? tabs.length - 1
      : currentTabIndex - 1;
    this.changeTab(prev);
  }

  changeNext() {
    const { tabs, currentTabIndex } = this;
    const next = (currentTabIndex === -1 || currentTabIndex === tabs.length - 1)
      ? 0
      : currentTabIndex + 1;
    this.changeTab(next);
  }

  moveFocus(tabIndex) {
    this.tabs[tabIndex].node.focus();
  }

  moveFocusCurrent() {
    this.moveFocus(this.currentTabIndex);
  }
}
