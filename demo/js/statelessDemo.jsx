import React from 'react';
import ariaTabPanel from '../../src/ariaTabPanel';

const tabData = [
  {
    title: 'one',
    id: '1',
    content: (
      <div>
        tab panel one
        <button>inner focusable</button>
      </div>
    ),
  },
  {
    title: 'two',
    id: '2',
    content: (
      <div>
        tab panel two
        <button>inner focusable</button>
      </div>
    ),
  },
  {
    title: 'three',
    id: '3',
    content: (
      <div>
        tab panel three
        <button>inner focusable</button>
      </div>
    ),
  },
];

class StatefulDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: '2' };
  }

  componentWillMount() {
    this.ariaTabPanel = ariaTabPanel({
      handleChange: this.setTab.bind(this),
      activeTabId: '2',
    });
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
  }

  render() {
    const { Tab, TabList, TabPanel } = this.ariaTabPanel;
    const { activeTab } = this.state;

    const tabs = tabData.map((t, i) => {
      let innerCl = 'Tabs-tabInner';
      if (i === 0) innerCl += ' Tabs-tabInner--first';
      if (t.id === activeTab) innerCl += ' is-active';
      return (
        <li className='Tabs-tablistItem' key={i}>
          <Tab tabId={t.id} className='Tabs-tab'>
            <div className={innerCl}>
              {t.title}
            </div>
          </Tab>
        </li>
      );
    });

    const panels = tabData.map((p, i) => {
      return (
        <TabPanel tabId={p.id} key={i}>
          {p.content}
        </TabPanel>
      );
    });

    return (
      <div>
        <TabList>
          <ul>
            {tabs}
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          {panels}
        </div>
      </div>
    );
  }
}

React.render(
  <StatefulDemo />,
  document.getElementById('stateless-demo')
);
