export default class Manager {
  constructor(options={}) {
    this.options = options;

    this.handleSelection = options.handleSelection || internalStateSelection.bind(this);

    // These component references are added when the relevant components mount
    this.tabs = [];
    this.tabPanels = [];
    this.tabList = null;
    this.tabbedInterfaceComponent = null;

    // State trackers
    this.currentFocus = -1;
    this.openTab = options.openTab || false;
  }

  changeTab(tabId) {
    if (tabId === this.openTab) return;
    this.openTab = tabId;
    this.tabPanels.forEach(tabPanel => tabPanel.element.forceUpdate());
  }
}

function internalStateSelection(tabId) {
  console.log(tabId);
}
