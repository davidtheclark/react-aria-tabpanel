import React from 'react';
import ReactDOM from 'react-dom';
import AriaTabPanel from '../..';

const tabDescriptions = [
  {
    title: 'one',
    id: 't1',
    content: (
      <div>
        Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    ),
  },
  {
    title: 'two',
    id: 't2',
    content: (
      <div>
        Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    ),
  },
  {
    title: 'three',
    id: 't3',
    content: (
      <div>
        Duis <a href='#'>aute</a> irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    ),
  },
];

class StatelessDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 't2' };
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
  }

  render() {
    const { activeTab } = this.state;

    const tabs = tabDescriptions.map((tabDescription, i) => {
      let innerCl = 'Tabs-tabInner';
      if (tabDescription.id === activeTab) innerCl += ' is-active';
      return (
        <li className='Tabs-tablistItem' key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className='Tabs-tab'
            active={tabDescription.id === activeTab}
          >
            <div className={innerCl}>
              {tabDescription.title}
            </div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panels = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTab}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    return (
      <AriaTabPanel.Wrapper
        onChange={this.setTab.bind(this)}
        activeTabId={this.state.activeTab}
      >
        <AriaTabPanel.TabList>
          <ul className='Tabs-tablist'>
            {tabs}
          </ul>
        </AriaTabPanel.TabList>
        <div className='Tabs-panel'>
          {panels}
        </div>
      </AriaTabPanel.Wrapper>
    );
  }
}

ReactDOM.render(
  <StatelessDemo />,
  document.getElementById('stateless-demo')
);
