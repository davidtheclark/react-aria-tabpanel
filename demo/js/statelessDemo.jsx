import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper, Tab, TabList, TabPanel} from '../../src';

const tabData = [
  {
    title: 'one',
    id: '1',
    content: (
      <div>
        Lorem <a href='#'>ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    ),
  },
  {
    title: 'two',
    id: '2',
    content: (
      <div>
        Ut <a href='#'>enim</a> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    ),
  },
  {
    title: 'three',
    id: '3',
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
    this.state = { activeTab: '2' };
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
  }

  render() {
    const { activeTab } = this.state;

    const tabs = tabData.map((t, i) => {
      let innerCl = 'Tabs-tabInner';
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
      <Wrapper
        onChange={this.setTab.bind(this)}
        activeTabId='2'
      >
        <TabList>
          <ul className='Tabs-tablist'>
            {tabs}
          </ul>
        </TabList>
        <div className='Tabs-panel'>
          {panels}
        </div>
      </Wrapper>
    );
  }
}

ReactDOM.render(
  <StatelessDemo />,
  document.getElementById('stateless-demo')
);
