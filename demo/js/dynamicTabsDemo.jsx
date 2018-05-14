import React from 'react';
import ReactDOM from 'react-dom';
import AriaTabPanel from '../..';

const uniqueId = function() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};

const tabTitles = [
  'I am a tab',
  'Tabs are Cool!',
  'New Tab Here',
  'Just Another Tab',
  'Doing Tab Things',
];

const tabsData = [
  {
    title: 'one',
    id: uniqueId(),
    content: (
      <div>
        Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    ),
  },
  {
    title: 'two',
    id: uniqueId(),
    content: (
      <div>
        Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    ),
  },
  {
    title: 'three',
    id: uniqueId(),
    content: (
      <div>
        Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    ),
  },
];

class DynamicTabsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: tabsData[1].id,
      tabDescriptions: tabsData,
    };
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
  }

  render() {
    const { activeTab, tabDescriptions } = this.state;
    const tabs = tabDescriptions.map((tabDescription) => this.renderTab(tabDescription));
    const panels = tabDescriptions.map((tabDescription) => this.renderTabContent(tabDescription));
    const hasMultipleTabs = tabDescriptions.length > 1;

    return (
      <div>
        <AriaTabPanel.Wrapper
          onChange={this.setTab.bind(this)}
          activeTabId={this.state.activeTab}
        >
          <AriaTabPanel.TabList>
            <ul className='Tabs-tablist Tabs-dynamic-tablist'>
              {tabs}
            </ul>
          </AriaTabPanel.TabList>
          <div className='Tabs-panel'>
            {panels}
          </div>
        </AriaTabPanel.Wrapper>
        <div style={ { marginTop: '15px' } }>
          <button
            className="dynamic-tabs__add-tab-btn"
            onClick={ this.handleAddNewTabClick.bind(this) }
          >
            Add a New Tab
          </button>
          {' '}
          <button
            className="dynamic-tabs__remove-tab-btn"
            disabled={ !hasMultipleTabs }
            onClick={ this.handleRemoveRandomTabClick.bind(this) }
          >
            Remove a Random Tab
          </button>
          {' '}
          <button
            className="dynamic-tabs__change-active-tab-btn"
            disabled={ !hasMultipleTabs }
            onClick={ this.handleChangeActiveTabClick.bind(this) }
          >
            Change Active Tab
          </button>
        </div>
      </div>
    );
  }

  renderTab(tabDescription) {
    const { activeTab } = this.state;
    let innerCl = 'Tabs-tabInner';

    if (tabDescription.id === activeTab) innerCl += ' is-active';

    return (
      <li className='Tabs-tablistItem' key={ tabDescription.id }>
        <AriaTabPanel.Tab
          id={tabDescription.id}
          className='Tabs-tab'
          active={tabDescription.id === activeTab}
        >
          <div className={innerCl}>
            <span className="Tabs-tabInner-text">
              {tabDescription.title}
            </span>
          </div>
        </AriaTabPanel.Tab>
      </li>
    );
  }

  renderTabContent(tabDescription) {
    const { activeTab } = this.state;

    return (
      <AriaTabPanel.TabPanel
        key={ tabDescription.id }
        tabId={tabDescription.id}
        active={tabDescription.id === activeTab}
      >
        {tabDescription.content}
      </AriaTabPanel.TabPanel>
    );
  }

  handleAddNewTabClick() {
    const { tabDescriptions } = this.state;
    const tabsData = tabDescriptions.slice();
    const tabId = uniqueId();
    const newTab = {
      title: this.generateTabTitle(),
      id: tabId,
      content: this.generateTabContent(),
    };

    tabsData.push(newTab);

    this.setState({
      activeTab: tabId,
      tabDescriptions: tabsData,
    });
  }

  handleRemoveRandomTabClick() {
    const { tabDescriptions, activeTab } = this.state;
    const newState = {};
    const tabsData = tabDescriptions.slice();
    const tabToRemoveIdx = Math.floor(Math.random() * tabDescriptions.length);
    const tabToRemove = tabDescriptions[tabToRemoveIdx];
    const isActiveTab = tabToRemove.id === activeTab;
    const nextActiveTabId = tabDescriptions[(tabToRemoveIdx === 0) ? 1 : (tabToRemoveIdx - 1)].id;

    tabsData.splice(tabToRemoveIdx, 1);
    newState.tabDescriptions = tabsData;

    if (isActiveTab) {
      newState.activeTab = nextActiveTabId;
    }

    this.setState(newState);
  }

  handleChangeActiveTabClick() {
    const { tabDescriptions, activeTab } = this.state;
    const activeTabIdx = tabDescriptions.findIndex((tabDescription) => tabDescription.id === activeTab);
    let newActiveTabIdx = Math.floor(Math.random() * tabDescriptions.length);

    do {
      if (newActiveTabIdx === activeTabIdx) {
        newActiveTabIdx = Math.floor(Math.random() * tabDescriptions.length);
      }
    } while (newActiveTabIdx === activeTabIdx);

    const newActiveTabId = tabDescriptions[newActiveTabIdx].id;

    this.setState({
      activeTab: newActiveTabId,
    });
  }

  generateTabContent() {
    return tabsData[Math.floor(Math.random() * tabsData.length)].content;
  }

  generateTabTitle() {
    return tabTitles[Math.floor(Math.random() * tabTitles.length)];
  }
}

ReactDOM.render(
  <DynamicTabsDemo />,
  document.getElementById('dynamic-tabs-demo')
);
